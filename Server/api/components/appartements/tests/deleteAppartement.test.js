const { faker } = require("@faker-js/faker");

const request = require("supertest");
const Appartement = require("../models");
const jwt = require("jsonwebtoken");
const express = require("express");
const cookieParser = require("cookie-parser");
const app = express();

app.use(cookieParser());
app.use(express.json());
app.use("/", require("../routes"));

jest.mock("../models");
const mockedAppartement = Appartement;
jest.mock("bcryptjs");
jest.mock("jsonwebtoken");

let email = faker.internet.email();
const cookies = {
  accessToken: "the-access-token-value",
  refreshToken: "the-refresh-token-value",
};

describe("delete an appartement", () => {
  it("should verify that the user is not allowed", async () => {
    const response = await request(app).delete("/fake_id");

    expect(response.status).toBe(401);
    expect(response.body).toEqual({ message: "Action denied" });
  });

  it("should verify the tokens", async () => {
    jwt.verify.mockReturnValue(null);
    const response = await request(app)
      .delete("/fake_id")
      .set(
        "Cookie",
        `accessToken=${cookies.accessToken}; refreshToken=${cookies.refreshToken}`
      );

    expect(response.status).toBe(401);
    expect(response.body).toEqual({
      message: "Invalid access or refresh tokens",
    });
  });

  it("should return the appartement not found", async () => {
    jwt.verify.mockReturnValue({ user: { email } });
    mockedAppartement.findByIdAndDelete.mockResolvedValue(null);
    const response = await request(app)
      .delete("/fake_id")
      .set(
        "Cookie",
        `accessToken=${cookies.accessToken}; refreshToken=${cookies.refreshToken}`
      );

    expect(response.status).toBe(404);
    expect(response.body).toEqual({ message: "Appartement not found" });
  });

  it("should delete the appartement", async () => {
    jwt.verify.mockReturnValue({ user: { email } });
    mockedAppartement.findByIdAndDelete.mockResolvedValue({});
    const response = await request(app)
      .delete("/fake_id")
      .set(
        "Cookie",
        `accessToken=${cookies.accessToken}; refreshToken=${cookies.refreshToken}`
      );

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      message: "Appartement deleted successfully!",
    });
  });
});
