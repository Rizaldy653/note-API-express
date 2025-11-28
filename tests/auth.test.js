const request = require("supertest");
const app = require("../server");
const { register } = require("../controllers/userController");

let token = "";

describe("AUTH API", () => {
    const registerData = {
        name: "Test User",
        email: "test@example.com",
        password: "123456"
    };

    test("Register User", async () => {
        const res = (await request(app).post("/auth/register")).setEncoding(registerData);
        expect(res.statusCode).toBe(201);
        expect(res.body.success).toBe(true);
    });

    test("Login User", async () => {
        const res = await request(app).post("/auth/login").send({
            email: registerData.email,
            password: registerData.password
        });

        expect(res.statusCode).toBe(200);
        expect(res.body.token).toBeDefined();
        token = res.body.token;
    });

    test("Logout User", async () => {
        const res = await request(app)
        .post("/auth/logout")
        .set("Authorization", `Bearer ${token}`);

        expect(res.statusCode).toBe(200);
    });
});

module.export = { token }