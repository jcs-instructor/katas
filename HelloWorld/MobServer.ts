import WS from 'jest-websocket-mock';
import { MobTimer } from './mobTimer';

export class MobServer {
    static getMobTimer(mobName: string) {
        return MobServer._mobs.get(mobName).mobTimer;
    }


    private static _mobs = new Map<string, { mobTimer: MobTimer, sockets: WebSocket[] }>();
    private static _sockets = new Map<WebSocket, { mobName: string }>();
    processMessage(server, socket: WebSocket, msg: string) {
        const parsedMessage: { mobName: string, action: string } = JSON.parse(msg);
        const mobName = parsedMessage.mobName;
        const mobs = server.mobs;
        if (parsedMessage["action"] === "join") {
            const mob = mobs.get(mobName);
            console.log("debug process b mobs", server.mobs);
            if (mobs.get(mobName) === undefined) {
                mobs.set(parsedMessage["mobName"], { mobTimer: new MobTimer() });
            }
            console.log("debug process c mobs", server.mobs);
        }
    }



    constructor() {
        console.log("Debug constructing");
    };
    static createMobServer = (server): MobServer => {
        const mobServer = new MobServer();
        // server.on("connection", (conn) => mobSerr.mobs.set(conn, { mobName: "arrested-egg" }));
        server.on("connection", (socket) => {
            console.log("debugging connection");
            if (!server.mobs) {
                server.mobs = new Map();
            }
            socket.on("message", (msg: string) => {
                mobServer.processMessage(server, socket, msg);
            });

        });
        return mobServer;
    };

    public get mobs() { return this._mobs; };
    public get sockets() { return this._sockets; };
}
