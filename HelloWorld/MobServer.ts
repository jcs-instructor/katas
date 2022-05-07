import WS from 'jest-websocket-mock';

export class MobServer {



    public _mobs = new Map();
    private _sockets = new Map();

    mob(mobName: string) {
        const retValue = this._mobs.get("arrested-egg");
        console.log('debug 5', this._mobs, "xxx", retValue);
        return retValue;
    }

    static configure = (server: WS): MobServer => {
        const mobServer = new MobServer();
        // server.on("connection", (conn) => mobServer.mobs.set(conn, { mobName: "arrested-egg" }));
        server.on("connection", (conn) => mobServer.mobs.set("arrested-egg", [conn]));
        server.on("connection", (conn) => mobServer.sockets.set(conn, { mobName: "arrested-egg" }));
        return mobServer;
    };

    public get mobs() { return this._mobs; };
    public get sockets() { return this._sockets; };
}
