import WS from "jest-websocket-mock";

export class MockServer {
    private _server: WS;
    constructor(wssUrl) {
        this._server = new WS(wssUrl);
    }
    public get server() {
        return this._server;
    };
}
