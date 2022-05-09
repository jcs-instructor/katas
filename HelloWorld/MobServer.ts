import WS from 'jest-websocket-mock';
import { MobTimer } from './mobTimer';

export class MobServer {

    getSockets(mobName: string) {
        return this._mobs.get(mobName).sockets;
    }

    getSocketMobName(socket: WebSocket): any {
        return this._sockets.get(socket).mobName;
    }

    private _mobs = new Map<string, { mobTimer: MobTimer, sockets: WebSocket[] }>();
    private _sockets = new Map<WebSocket, { mobName: string }>();
    processMessage(socket: WebSocket, msg: string) {
        console.log('debug processing', msg);
        const parsedMessage: { mobName: string, action: string } = JSON.parse(msg);
        const mobName = parsedMessage.mobName;
        const mobs = this._mobs;
        if (parsedMessage["action"] === "join") {
            console.log("debug 1");
            const mob = mobs.get(mobName);
            if (mobs.get(mobName) === undefined) {
                mobs.set(parsedMessage["mobName"], { mobTimer: new MobTimer(), sockets: [socket] });
                console.log("debug 2", mobs, this._mobs, this._mobs.get(parsedMessage["mobName"]));
            } else {
                mob.sockets.push(socket);
            }
        }
    }


    getMobTimer(mobName: string) {
        console.log("debug 3", this._mobs);
        return this._mobs.get(mobName).mobTimer;
    }



    static createMobServer = (server): MobServer => {
        const mobServer = new MobServer();
        // server.on("connection", (conn) => mobSerr.mobs.set(conn, { mobName: "arrested-egg" }));
        server.on("connection", (socket) => {
            console.log("debugging connection");
            socket.on("message", (msg: string) => {
                console.log('debug processing message');
                mobServer.processMessage(socket, msg)
            });

        });
        return mobServer;
    };

    public get mobs() { return this._mobs; };
    public get sockets() { return this._sockets; };
}
