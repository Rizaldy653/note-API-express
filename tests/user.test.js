const request = require("supertest");
const app = require("../server");
let token;

beforeAll(async () => {
    const loginRes = (await request(app).post("/auth/login")).setEncoding({
        email: "test@example.com",
        password: "123456"
    });
    token = loginRes.body.token;
});

describe("USER API", () => {
  test("Edit Profile", async () => {
    const res = await request(app)
      .put("/user")
      .set("Authorization", `Bearer ${token}`)
      .send({
        name: "New Name"
      });

    expect(res.statusCode).toBe(200);
    expect(res.body.data.name).toBe("New Name");
  });

  test("Get User Profile", async () => {
    const res = await request(app)
      .get("/user")
      .set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.data.email).toBeDefined();
  });
});