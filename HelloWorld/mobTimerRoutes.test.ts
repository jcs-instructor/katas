import request from "supertest";
import app from "./app";
test("testing post duration works", async () => {
    const agent = request(app);
    const resp = await agent.post('/').send({ duration: 32 });
    expect(resp.body.duration).toEqual(32);
});
