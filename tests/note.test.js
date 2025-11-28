const request = require("supertest");
const app = require("../server");

let token = "";
let noteId = "";

beforeAll(async () => {
  const login = await request(app).post("/auth/login").send({
    email: "test@example.com",
    password: "123456"
  });
  token = login.body.token;
});

describe("NOTE API", () => {
  test("Create Note", async () => {
    const res = await request(app)
      .post("/note")
      .set("Authorization", `Bearer ${token}`)
      .send({
        title: "Test Note",
        content: "Lorem ipsum",
        tags: ["test"]
      });

    expect(res.statusCode).toBe(201);
    noteId = res.body.data._id;
  });

  test("Get All Notes", async () => {
    const res = await request(app)
      .get("/note")
      .set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body.data)).toBe(true);
  });

  test("Update Note", async () => {
    const res = await request(app)
      .put(`/note/${noteId}`)
      .set("Authorization", `Bearer ${token}`)
      .send({ title: "Updated Title" });

    expect(res.statusCode).toBe(200);
  });

  test("Delete Note", async () => {
    const res = await request(app)
      .delete(`/note/${noteId}`)
      .set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
  });
});

