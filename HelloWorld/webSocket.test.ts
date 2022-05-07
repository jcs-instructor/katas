import WS from 'jest-websocket-mock';
import { MockServer } from './MockServer';
import { MobServer } from './MobServer';
const wssUrl = "wss://localhost:1234";



test("New mob server has zero websockets connected", async () => {
    // const mockServer = new MockServer(wssUrl);
    const mockSocketServer = new WS(wssUrl);
    const configuredServer = MobServer.configure(mockSocketServer);
    expect(configuredServer.sockets.size).toEqual(0);
    mockSocketServer.server.close();
});


test("New mob server has one websocket connected", async () => {
    const mockServer = new MockServer(wssUrl);
    const configuredServer = MobServer.configure(mockServer.server);
    new WebSocket(wssUrl);
    await mockServer.server.connected;
    mockServer.server.close();
    expect(configuredServer.sockets.size).toEqual(1);
});

test("Joining a mob", async () => {
    const mockServer = new MockServer(wssUrl);
    const configuredServer = MobServer.configure(mockServer.server);
    const client1 = new WebSocket(wssUrl);
    await mockServer.server.connected;
    client1.send(JSON.stringify({ action: "join", mob: "arrested-egg" }));
    mockServer.server.close();
    expect(configuredServer.mob("arrested-egg").length).toEqual(1);
});


// test("New mob server has one websocket when websocket opened", async () => {
//     const server = new MockServer(wssUrl);
//     const serverInspector = MobServer.configure(server);
//     const client1 = new WebSocket(wssUrl);
//     await server.connected;
//     expect(serverInspector.sockets.length).toEqual(1);
// });


// TODO: Wrong test?  No server initialized so will not be able to send message?
// test("Can send mob state to a client", async () => {

//     const mobTimer = new MobTimer();
//     const client1Socket = new WebSocket("ws://localhost:1234");
//     const messages = new Map();
//     client1Socket.onmessage = (e) => {
//         messages.set(client1Socket, e.data);
//     }
//     mobTimer.join(client1Socket);
//     mobTimer.sendState();
// });

// test("Can send mob state to multiple clients", async () => {
//     const server = new WS("ws://localhost:1234");
//     const mobTimer = new MobTimer();
//     const sockets = [];
//     const messages = new Map();
//     for (let x = 1; x <= 3; x++) {
//         const socket = new WebSocket("ws://localhost:1234");
//         sockets.push(socket);
//         socket.onmessage = (e) => {
//             messages.set(socket, e.data);
//         }
//         mobTimer.join(socket);
//         await server.connected();
//     }

//     mobTimer.sendState();

//     sockets.forEach(socket => {
//         const message = messages.get(socket);
//         const messageParsed = JSON.parse(message);
//         expect(JSON.parse(messageParsed)).toEqual(mobTimer.state);
//     });
// });

// TODO: test("With multiple mobs, send mob state only to clients that joined that mob");

// copied from https://www.npmjs.com/package/jest-websocket-mock
test("example test that mock server sends messages to connected clients", async () => {
    const server = new WS("ws://localhost:1234");
    const client1 = new WebSocket("ws://localhost:1234");
    await server.connected;
    const client2 = new WebSocket("ws://localhost:1234");
    await server.connected;

    const messages = { client1: [], client2: [] };
    client1.onmessage = (e) => {
        messages.client1.push(e.data);
    };
    client2.onmessage = (e) => {
        messages.client2.push(e.data);
    };

    server.send("hello everyone");
    expect(messages).toEqual({
        client1: ["hello everyone"],
        client2: ["hello everyone"],
    });
});

// based on previous test case
test("example test that mock server sends JSON messages to connected clients", async () => {
    WS.clean();
    const server = new WS("ws://localhost:1234", { jsonProtocol: true });
    const client1 = new WebSocket("ws://localhost:1234");
    await server.connected;
    const client2 = new WebSocket("ws://localhost:1234");
    await server.connected;

    const messages = { client1: [], client2: [] };
    client1.onmessage = (e) => {
        messages.client1.push(e.data);
    };
    client2.onmessage = (e) => {
        messages.client2.push(e.data);
    };

    server.send({ message: "hello everyone" });
    expect(JSON.parse(messages.client1[0])).toEqual({ "message": "hello everyone" });
});