import request from "supertest";
import { makeApp } from './app'

test("testing post duration works", async () => {
    const agent = request(makeApp());
    const resp = await agent.post('/').send({ duration: 32 });
    expect(resp.body.duration).toEqual(32);
});

test("Test start", async () => {
    const agent = request(makeApp());
    const resp = await agent.get('/start');
    expect(resp.body.status).toEqual("RUNNING");
});

test("Test start duration", async () => {
    const agent = request(makeApp());
    await agent.get('/start');
    await agent.post('/').send({ duration: 2.5 });
    const resp = await agent.get('/');
    expect(resp.body.secondsRemaining).toEqual(2.5 * 60);
});

test("testing each agent independent", async () => {
    const agent = request(makeApp());
    const resp = await agent.get('/');
    expect(resp.body.status).toEqual("READY");
});
