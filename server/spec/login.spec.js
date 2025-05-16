import app from "../src/server.js";
import request from "supertest";

const agent = request.agent(app);

describe("Test Login Token", () => {
  beforeAll(async () => {
    await agent
      .post("/api/accounts/login")
      .send({ email: "ike", password: "12345" });
  });

  it("should respond with a token", async () => {
    const res = await agent
      .post("/api/accounts/login")
      .send({ email: "ike@ike.coffee", password: "12345" });

    expect(res.status).toBe(200);
    expect(res.body).toEqual({ message: "Login successful" });
  });
});
