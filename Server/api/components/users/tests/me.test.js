const { faker } = require("@faker-js/faker");

const request = require("supertest");
const User = require("../models");
const jwt = require("jsonwebtoken");
const express = require("express");
const cookieParser = require("cookie-parser");
const app = express();

app.use(cookieParser());
app.use(express.json());
app.use("/", require("../routes"));

jest.mock("../models");
const mockedUser = User;
jest.mock("bcryptjs");
jest.mock("jsonwebtoken");

let email = faker.internet.email();
const cookies = {
  accessToken: "the-access-token-value",
  refreshToken: "the-refresh-token-value",
};

describe("get User info", () => {
  it("should verify that the user is not allowed", async () => {
    const response = await request(app).get("/auth/me");

    expect(response.status).toBe(401);
    expect(response.body).toEqual({ message: "Action denied" });
  });

  it("should verify the tokens", async () => {
    jwt.verify.mockReturnValue(null);
    const response = await request(app)
      .get("/auth/me")
      .set(
        "Cookie",
        `accessToken=${cookies.accessToken}; refreshToken=${cookies.refreshToken}`
      );

    expect(response.status).toBe(401);
    expect(response.body).toEqual({
      message: "Invalid access or refresh tokens",
    });
  });

  it("should return the user info", async () => {
    mockedUser.findOne.mockResolvedValue(null);
    jwt.verify.mockReturnValue({ user: { email } });
    const response = await request(app)
      .get("/auth/me")
      .set(
        "Cookie",
        `accessToken=${cookies.accessToken}; refreshToken=${cookies.refreshToken}`
      );

    expect(response.status).toBe(200);
    expect(response.body).toMatchObject(expect.any(Object));
  });
});
