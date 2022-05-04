import request from "supertest";
import app from "./app";
test("testing route works", done => {
    request(app)
        .post("/")
        .type("form")
        .send({ duration: "32" })
        .expect({
            status: 'READY',
            remainingString: '00:00',
            secondsRemainingI: 0,
            duration: 32
        }, done);
    // .then(resp => console.log("xyz", resp));
    // .then(() => {
    //     request(app)
    //         .get("/test")
    //         .expect({ array: ["hey"] }, done);
    // });
});