const request = require("supertest");
const app = require("../server");

let token = "";

beforeAll(async () => {
  const login = await request(app).post("/auth/login").send({
    email: "test@example.com",
    password: "123456"
  });
  token = login.body.token;

  // Tambah note untuk search
  await request(app)
    .post("/note")
    .set("Authorization", `Bearer ${token}`)
    .send({
      title: "Searchable Note",
      content: "This note is searchable",
      tags: ["find"]
    });
});

describe("SEARCH API", () => {
  test("Search notes", async () => {
    const res = await request(app)
      .get("/search?q=Searchable")
      .set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.count).toBeGreaterThan(0);
  });
});
