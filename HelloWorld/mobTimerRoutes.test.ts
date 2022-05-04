import request from "supertest";
import { makeApp } from './app'

test("testing post duration works", async () => {
    const agent = request(makeApp());
    const resp = await agent.post('/').send({ duration: 32 });
    expect(resp.body.duration).toEqual(32);
});

test("testing each agent independent", async () => {
    const agent = request(makeApp());
    const resp = await agent.get('/start');
    expect(resp.body.status).toEqual("RUNNING");
});

test("testing each agent independent", async () => {
    const agent = request(makeApp());
    const resp = await agent.get('/');
    expect(resp.body.status).toEqual("READY");
});
