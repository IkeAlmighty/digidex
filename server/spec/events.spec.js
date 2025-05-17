import app from "../src/server.js";
import request from "supertest";
import { exec } from "child_process";
import util from "util";

const execAsync = util.promisify(exec);
const agent = request.agent(app);

describe("Test event API routes", () => {
  beforeAll(async () => {
    // seed the database with dummy data:
    const { stdout } = await execAsync("npm run seed");
    console.log(stdout);

    // set the httpOnly authToken
    const res = await agent
      .post("/api/accounts/login")
      .send({ email: "ike", password: "12345" });

    console.log("Set-Cookie header: ", res.headers["set-cookie"]);
    console.log("Raw headers: ", res.rawHeaders);
  });

  it("should respond with relevant seed data", async () => {
    let res = await agent.get("/api/events/0/86400000");
    expect(res.status).toBe(200);
  });
});
