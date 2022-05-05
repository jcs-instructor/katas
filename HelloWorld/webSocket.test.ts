import WS from 'jest-websocket-mock';
import { MobTimer } from './mobTimer';

// TODO: After all, do WS.clean()
test("Test can create subscriber", async () => {
    const mobTimer = new MobTimer();
    const subscriberId = "123.09.12.14"
    const mobName = "arrested-egg";
    // called whenever client does an http call
    const subscriber = mobTimer.createOrGetSubscriber(subscriberId, mobName);
    const subscriberForSecondRequest = mobTimer.createOrGetSubscriber(subscriberId, mobName);
    expect(subscriberForSecondRequest).toBeInstanceOf(WS);
    expect(subscriberForSecondRequest).toEqual(subscriber);
    expect(subscriber.messages).toEqual([]);
});

test("Create two subscribers", () => {
    const mobTimer = new MobTimer();
    const mobName = "arrested-egg";
    const subscriberId1 = "123.09.12.14";
    const subscriber1 = mobTimer.createOrGetSubscriber(subscriberId1, mobName);
    const subscriberId2 = "999.99.99.99";
    const subscriber2 = mobTimer.createOrGetSubscriber(subscriberId2, mobName);
    expect(subscriber1).not.toStrictEqual(subscriber2)
});

test("Test can create two subscribers same id different mob", () => {
    const mobTimer = new MobTimer();
    const subscriberId = "123.09.12.14"
    const mobName = "arrested-egg";
    const mobNameOther = "boring";
    const subscriber = mobTimer.createOrGetSubscriber(subscriberId, mobName);
    expect(subscriber).toBeInstanceOf(WS);
    expect(mobTimer.createOrGetSubscriber(subscriberId, mobName)).toStrictEqual(subscriber);
    expect(mobTimer.createOrGetSubscriber(subscriberId, mobNameOther)).not.toStrictEqual(subscriber);
});

test("Test sending mobTimer.state", async () => {
    const mobTimer = new MobTimer();
    const subscriberId = "123.09.12.14"
    const mobName = "arrested-egg";
    const subscriber = mobTimer.createOrGetSubscriber(subscriberId, mobName);
    // Code to be put on to client, here to verify sending
    const messagesReceivedBySubscriber = { subscriber: [] };
    subscriber.onmessage = (e) => {
        messagesReceivedBySubscriber.subscriber.push(e.data);
    };
    // End
    mobTimer.sendMessage(mobName, mobTimer.state);
    expect(messagesReceivedBySubscriber.subscriber).toEqual(JSON.stringify(mobTimer.state));
});

test("Test sending messages with subscribers in different mobs", async () => {
    const mobTimer = new MobTimer();
    const mobName = 'arrested-egg';
    const arrestedSubscriberId1 = "arrested.1";
    const arrestedSubscriber1 = mobTimer.createOrGetSubscriber(arrestedSubscriberId1, mobName);
    const arrestedSubscriberId2 = "arrested.2";
    const arrestedSubscriber2 = mobTimer.createOrGetSubscriber(arrestedSubscriberId2, mobName);
    const arrestedSubscriberId3 = "other.1";
    const otherMobName = "other";
    const otherSubscriber3 = mobTimer.createOrGetSubscriber(arrestedSubscriberId3, otherMobName);
    // Code to be put on to client, here to verify sending
    const messagesReceivedBySubscriber = { subscriber1: [], subscriber2: [], subscriber3: [] };
    arrestedSubscriber1.onmessage = (e) => {
        messagesReceivedBySubscriber.subscriber1.push(e.data);
    };
    arrestedSubscriber2.onmessage = (e) => {
        messagesReceivedBySubscriber.subscriber2.push(e.data);
    };
    otherSubscriber3.onmessage = (e) => {
        messagesReceivedBySubscriber.subscriber3.push(e.data);
    };
    // End
    mobTimer.sendMessage(mobName, mobTimer.state);
    expect(messagesReceivedBySubscriber.subscriber1[0]).toEqual([JSON.stringify(mobTimer.state)]);
    expect(messagesReceivedBySubscriber.subscriber2).toEqual([JSON.stringify(mobTimer.state)]);
    expect(messagesReceivedBySubscriber.subscriber3.length).toEqual(0);
});

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
    console.log("debug", messages.client1, "xxx", messages.client1[0])
    expect(JSON.parse(messages.client1[0])).toEqual({ "message": "hello everyone" });
});