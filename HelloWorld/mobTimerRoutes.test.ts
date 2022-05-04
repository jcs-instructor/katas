import request from "supertest";
import { makeApp } from './app'

test("Testing post duration works", async () => {
    const agent = request(makeApp());
    const resp = await agent.post('/').send({ durationMinutes: 32 });
    expect(resp.body.durationMinutes).toEqual(32);
});

test("Test start", async () => {
    const agent = request(makeApp());
    const resp = await agent.get('/start');
    expect(resp.body.status).toEqual("RUNNING");
});

test("Test READY duration is zero", async () => {
    const agent = request(makeApp());
    const resp = await agent.get('/');
    expect(resp.body.secondsRemaining).toEqual(0);
    expect(resp.body.durationMinutes).toEqual(5);
});

test("Testing post duration works", async () => {
    const agent = request(makeApp());
    const resp = await agent.post('/').send({ durationMinutes: 32 });
    expect(resp.body.durationMinutes).toEqual(32);
});

test("Test start", async () => {
    const agent = request(makeApp());
    const resp = await agent.get('/start');
    expect(resp.body.status).toEqual("RUNNING");
});

test("Test started duration", async () => {
    const agent = request(makeApp());
    await agent.get('/start');
    await agent.post('/').send({ durationMinutes: 2.5 });
    const resp = await agent.get('/');
    expect(resp.body.secondsRemaining).toEqual(2.5 * 60);
});

test("testing READY status at beginning", async () => {
    const agent = request(makeApp());
    const resp = await agent.get('/');
    expect(resp.body.status).toEqual("READY");
});
