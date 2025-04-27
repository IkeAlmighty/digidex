import request from 'supertest';
import app from '../server.js';
import 'jasmine-expect';

describe("Test GET /api/events/:id", () => {
    it("test for failure to grab non-existant event", async () => {
        const badId = '678ab571a6b0af4b12c98d1b';
        await request(app).get(`/api/events/${badId}`).expect(404);
    })
});

describe("Test POST /api/events and GET /api/events/:id", () => {
    it("Should return event id of newly created event", async () => {
        const eventData = {
            time: 'test time',
            location: 'BlackHart',
            backBlazeImgKey: 'test',
            description: 'a test event',
            rootTag: '/testing'
        }
        let res = await request(app).post('/api/events').send(eventData);
        expect(res.status).toBe(201);
        expect(res.body.id).toBeInstanceOf(String);

        const _id = res.body.id;

        // test get route for inserted id
        res = await request(app).get(`/api/events/${_id}`);
        expect(res.status).toBe(200);
        expect(res.body.time).toBeInstanceOf(String)
        expect(res.body.location).toBeInstanceOf(String)
        expect(res.body.backBlazeImgKey).toBeInstanceOf(String)
        expect(res.body.description).toBeInstanceOf(String)
        expect(res.body.rootTag).toBeInstanceOf(String)

        // test update:
        const updatedDocument = { _id, description: 'Updated Decription', }

        res = await request(app).put("/api/events").send(updatedDocument);
        expect(res.status).toBe(200);

        res = await request(app).delete("/api/events").send({ _id });
        expect(res.status).toBe(204);
    })
})