import app from "../app";
const request = require("supertest");

describe("Test auth api", () => {
  test("Signup user", async () => {
    await request(app)
      .put("/signup")
      .send({
        firstName: "TestJohn",
        lastName: "TestHolmes",
        email: "testabc@gmail.com",
        password: "Test_password1",
      })
      .expect(200);
  });

  test("Signin user", async () => {
    await request(app)
      .post("/signin")
      .send({
        email: "testabc@gmail.com",
        password: "Test_password1",
      })
      .expect(200);
  });
});
