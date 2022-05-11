import WS from 'jest-websocket-mock';
import { isExportDeclaration } from 'typescript';
import { MobServer } from './mobServer';
import { MobTimer } from './mobTimer';
const wssUrl = "wss://localhost:1234";

afterEach(() => {
    WS.clean();
});
// Exposing MobServer.mobs to make testing easier
// Messages received by clients is what is critical
// MobServer.mobs will be a HashTable { "mobName": { mobTimer, connections}}
// test("New mob server can be initiated", async () => {
//     const mockSocketServer = new WS(wssUrl);

//     const mobServer = MobServer.createMobServer(mockSocketServer);
//     mockSocketServer.close();
//     expect(mobServer).not.toBeNull();
//     expect(mobServer).toBeInstanceOf(MobServer);
// });

// test("Can send messages", async () => {
//     const mockWSS = new WS(wssUrl);
//     const mobServer = MobServer.createMobServer(mockWSS);
//     const messages2 = [];

//     const { client, messages } = await setupClient(mockWSS);
//     client.onmessage = (e) => {
//         messages2.push(e.data);
//         console.log("debug pushed messages directly", messages2);
//     };
//     client.send(JSON.stringify({ action: "join", mobName: "arrested-egg" }));
//     console.log("debug MobServer mobs", MobServer._mobs);
//     client.send(JSON.stringify({ action: "join", mobName: "hippo" }));
//     console.log('debug mock mobs', mockWSS.mobs);
//     console.log("debug pushed messages final", messages, "xx", messages2);
//     const parsedMessage = JSON.parse(messages[0]);
//     const arrestedTimer = MobServer.getMobTimer("arrested-egg");
//     expect(parsedMessage).toEqual(new MobTimer().state);
//     mockWSS.close();
// });



// test("First user joins a mob is added to the mob", async () => {
//     const mockWSS = new WS(wssUrl);
//     const mobServer = MobServer.createMobServer(mockWSS);
//     const messages2 = [];

//     const { client, messages } = await setupClient(mockWSS);
//     client.onmessage = (e) => {
//         messages2.push(e.data);
//         console.log("debug pushed messages directly", messages2);
//     };
//     client.send(JSON.stringify({ action: "join", mobName: "arrested-egg" }));
//     console.log("debug MobServer mobs", MobServer._mobs);
//     client.send(JSON.stringify({ action: "join", mobName: "hippo" }));
//     console.log('debug mock mobs', mockWSS.mobs);
//     console.log("debug pushed messages final", messages, "xx", messages2);
//     const parsedMessage = JSON.parse(messages[0]);
//     const arrestedTimer = MobServer.getMobTimer("arrested-egg");
//     expect(parsedMessage).toEqual(new MobTimer().state);
//     mockWSS.close();
// });

// test("First user joining a mob, expect user is associated with the mob", async () => {
//     const mockWSS = new WS(wssUrl);
//     const mobServer = MobServer.createMobServer(mockWSS);

//     const { client, messages } = await setupClient(mockWSS);
//     client.send(JSON.stringify({ action: "join", mobName: "arrested-egg" }));
//     mockWSS.close();
//     const arrestedTimer = mobServer.getMobTimer("arrested-egg");
//     expect(arrestedTimer.state).toEqual(new MobTimer().state);

//     const arrestedConnections = mobServer.getSockets("arrested-egg");
//     expect(arrestedConnections.length).toEqual(1);
//     expect(arrestedConnections.includes(client)).toEqual(true);

//     const clientMessage = JSON.parse(messages[0]);
//     expect(message).toEqual(arrestedTimer.state);
// });

// test("Second person joins a mob, both sockets associated with mob", async () => {
//     const mockWSS = new WS(wssUrl);
//     const mobServer = MobServer.createMobServer(mockWSS);

//     const { client: client1 } = await setupClient(mockWSS);
//     const { client: client2 } = await setupClient(mockWSS);
//     client1.send(JSON.stringify({ action: "join", mobName: "arrested-egg" }));
//     client2.send(JSON.stringify({ action: "join", mobName: "arrested-egg" }));
//     mockWSS.close();
//     const sockets = mobServer.getSockets("arrested-egg");
//     expect(sockets.includes(client1)).toEqual(true);
//     expect(sockets.includes(client2)).toEqual(true);
//     expect(mobServer.getSocketMobName(client1)).toEqual("arrested-egg");
//     expect(mobServer.getSocketMobName(client2)).toEqual("arrested-egg");
// });

// test("Changing state", async () => {
//     const mockWSS = new WS(wssUrl);
//     const mobServer = MobServer.createMockServer(mockWSS);
//     const { client, messages } = await setupClient(mockWSS);
//     client.send(JSON.stringify({ action: "join", mobName: "arrested-egg" }));
//     client.send(JSON.stringify({ action: "data", data: { durationMinutes: 32 } }))
//     mockWSS.close();

//     const arrested2Mob = mobServer.getMobTimer("arrested-egg2");
//     const expectedMob = { ...new MobTimer, durationMinutes: 32 };

//     expect(arrested2Mob.mobTimer).toEqual(expectedMob);

//     const message = JSON.parse(messages[messages.length - 1]);
//     expect(message).toEqual(expectedMob);
// });

// test("Change state of two mobs", async () => {
//     const mockWSS = new WS(wssUrl);
//     const mobServer = MobServer.createMobServer(mockWSS);

//     const { client: arrestedClient, messages: arrestedMessages } = await setupClient(mockWSS);
//     arrestedClient.send(JSON.stringify({ action: "data", data: { durationMinutes: 1 } }))

//     const { client: boringClient, messages: boringMessages } = await setupClient(mockWSS);

//     arrestedClient.send(JSON.stringify({ action: "join", mobName: "arrested-egg3" }));
//     arrestedClient.send(JSON.stringify({ action: "data", data: { durationMinutes: 1 } }))

//     boringClient.send(JSON.stringify({ action: "join", mobName: "boring" }));
//     boringClient.send(JSON.stringify({ action: "data", data: { durationMinutes: 2 } }))

//     mockWSS.close();

//     const arrestedMob = mobServer.getMobTimer("arrested-egg");
//     const expectedArrestedMob = { ...new MobTimer(), durationMinutes: 1 };
//     const boringMob = mobServer.getMobTimer("boring");
//     const expectedBoringMob = { ...new MobTimer(), durationMinutes: 2 };
//     expect(arrestedMob).toEqual(expectedArrestedMob);
//     expect(boringMob).toEqual(expectedBoringMob);

//     const arrestedMessage = JSON.parse(arrestedMessages[arrestedMessages.length - 1]);
//     const boringMessage = JSON.parse(boringMessages[boringMessages.length - 1]);
//     expect(arrestedMessage).toEqual(expectedArrestedMob);
//     expect(boringMessage).toEqual(expectedBoringMob);
// });


// test("New mob server has one websocket when websocket opened", async () => {
//     const server = new mockWSS(wssUrl);
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
    console.log("debug a");
    WS.clean();
    console.log("debug b");
    const server = new WS("ws://localhost:1234");
    server.on("connection", (socket) => {
        socket.on("message", async msg => {
            console.log("sending message to socket");
            await socket.send("Received " + msg);
        }
        );
    });
    // expect(messages).toEqual({
    //     client1: ["hello everyone"],
    //     client2: ["hello everyone"],
    // });
    console.log("debug c");
    const client1 = new WebSocket("ws://localhost:1234");
    console.log("debug d");
    await server.connected;
    const client2 = new WebSocket("ws://localhost:1234");
    await server.connected;
    const messages = { client1: [], client2: [] };
    client1.onmessage = (e) => {
        console.log("sending client 1", e.data)
        messages.client1.push(e.data);
    };
    client2.onmessage = (e) => {
        messages.client2.push(e.data);
    };
    console.log("debug e");
    await client1.send(JSON.stringify({ action: "verify", message: "hello 1" }));
    console.log("debug f");
    server.send("hello everyone");
    console.log("debug g");
    console.log('debug received 2', messages.client1);



});





function waitForSocketState(socket) {
    return new Promise<void>(function (resolve) {
        setTimeout(function () {
            console.log('here');
            if (socket.readyState === socket.CLOSED) {
                resolve();
            } else {
                waitForSocketState(socket).then(resolve);
            }
        }, 5);
    });
};

test.only("example test that mock server sends messages to connected clients", async () => {
    const server = new WS("ws://localhost:1234");
    server.on("connection", (socket) => {
        socket.on("message", async msg => {
            socket.send("Received " + msg);
        }
        );
    });
    const client1 = new WebSocket("ws://localhost:1234");
    await server.connected;
    const client2 = new WebSocket("ws://localhost:1234");
    await server.connected;

    const messages = { client1: [], client2: [] };
    client1.onmessage = async (e) => {
        if (e.data === "close") {
            client1.close();
        }
        messages.client1.push(e.data);
        client1.close();
    };
    client2.onmessage = (e) => {
        messages.client2.push(e.data);
    };
    client1.send("abc");
    console.log("client1 id");
    await client1.close();
    await waitForSocketState(client1);
    expect(messages.client1.includes("Received abc")).toEqual(true);
    // expect(client1).toReceiveMessage("Received abc");

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

async function setupClient(mockWSS: WS) {
    const messages = [];
    const client = new WebSocket(wssUrl);
    await mockWSS.connected;
    client.onmessage = (e) => {
        messages.push(e.data);
        console.log("debug pushed messages", messages);
    };
    return { client, messages };
};
