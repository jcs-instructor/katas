import WebSocket from "ws";
import { startMobServer } from "./mobWebSocketUtils";
import * as MobMessages from "./mobWebMessages";
import { MobTimer, Status } from "./mobTimer";
import { sendMessage } from "./testUtils";

export const port = 3000 + Number(process.env.JEST_WORKER_ID);

describe("WebSocket Server", () => {
  let server;

  beforeAll(async () => {
    server = await startMobServer(port);
  });

  afterAll(() => server.close());

  test("Create mob", async () => {
    const testMessage = MobMessages.joinMessage("awesome-team");
    const socket = await sendMessage(testMessage);
    expect(socket.getLastJson()).toEqual(new MobTimer("awesome-team").state);
  });

  test("Create 2 mobs", async () => {
    const testMessage = MobMessages.joinMessage("awesome-team");
    const socket = await sendMessage(testMessage);

    const testMessage2 = MobMessages.joinMessage("good-team");
    const socket2 = await sendMessage(testMessage2);

    // Assertions
    expect(socket.getLastJson()).toEqual(new MobTimer("awesome-team").state);
    expect(socket2.getLastJson()).toEqual(new MobTimer("good-team").state);
  });

  // test("Pause timer", async () => {
  //   const testMessage = MobMessages.joinMessage("awesome-team");
  //   sendMessage(testMessage);
  //   const pauseJson = MobMessages.pauseMessage();
  //   const parsedMessage = await sendMessage(pauseJson);
  // });
  //   test("Pause timer", async () => {
  //     const joinMessage = MobMessages.joinMessage("awesome-team");
  //     await sendMessage(joinMessage);
  //     const pauseMessage2 = MobMessages.pauseMessage();
  //     const parsedMessage = await sendMessage(pauseMessage2);
  //     expect(parsedMessage.status).toEqual(Status.Paused);
  //   });

  // todo: add tests for update and start messages
});


