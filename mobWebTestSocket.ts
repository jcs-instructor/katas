import { MobWebSocket, WebSocketInterface } from "./mobClient";
import { waitForSocketState } from "./testUtils";
import { joinRequest, MobTimerRequest } from "./mobTimerRequests";
import { MobTimerResponse } from "./mobTimerResponse";
import { MobTimer } from "./mobTimer";

class MobWebTestSocket extends MobWebSocket implements WebSocketInterface {
  joinMob(mobName: string) {
    const request = joinRequest(mobName);
    this.send(request);
  }

  getLastJson(): MobTimerResponse {
    return JSON.parse(this.receivedResponses.at(-1) || "");
  }

  receivedResponses: string[] = [];

  constructor(url: string) {
    super(url);
    this.on("message", (data) => {
      this.receivedResponses.push(data.toString());
    });
  }

  async closeSocket() {
    this.close();
    await waitForSocketState(this, this.CLOSED);
  }
}

export { MobWebTestSocket as MobWebTestSocket };
