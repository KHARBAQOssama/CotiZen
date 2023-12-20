const { faker } = require("@faker-js/faker");

const request = require("supertest");
const Apartment = require("../models");
const jwt = require("jsonwebtoken");
const helper = require("../helper");
const express = require("express");
const cookieParser = require("cookie-parser");
const app = express();

app.use(cookieParser());
app.use(express.json());
app.use("/", require("../routes"));

jest.mock("../models");
const mockedApartment = Apartment;
const mockedApartmentInstance = new Apartment();
jest.mock("bcryptjs");
jest.mock("../helper");
jest.mock("jsonwebtoken");

let email = faker.internet.email();
const cookies = {
  accessToken: "the-access-token-value",
  refreshToken: "the-refresh-token-value",
};

describe("update an apartment", () => {
  it("should verify that the user is not allowed", async () => {
    const response = await request(app).patch("/fake_id");

    expect(response.status).toBe(401);
    expect(response.body).toEqual({ message: "Action denied" });
  });

  it("should verify the tokens", async () => {
    jwt.verify.mockReturnValue(null);
    const response = await request(app)
      .patch("/fake_id")
      .set(
        "Cookie",
        `accessToken=${cookies.accessToken}; refreshToken=${cookies.refreshToken}`
      );

    expect(response.status).toBe(401);
    expect(response.body).toEqual({
      message: "Invalid access or refresh tokens",
    });
  });

  it("should return a validation error", async () => {
    jwt.verify.mockReturnValue({ user: { email } });
    helper.updateApartmentSchema.validateAsync.mockReturnValue({
      error: {},
    });
    const response = await request(app)
      .patch("/fake_id")
      .set(
        "Cookie",
        `accessToken=${cookies.accessToken}; refreshToken=${cookies.refreshToken}`
      );

    expect(response.status).toBe(400);
    expect(response.body).toMatchObject(expect.any(Object));
  });

  it("should return the apartment not found", async () => {
    jwt.verify.mockReturnValue({ user: { email } });
    helper.updateApartmentSchema.validateAsync.mockReturnValue({});
    mockedApartment.findById.mockResolvedValue(null);
    const response = await request(app)
      .delete("/fake_id")
      .set(
        "Cookie",
        `accessToken=${cookies.accessToken}; refreshToken=${cookies.refreshToken}`
      );

    expect(response.status).toBe(404);
    expect(response.body).toEqual({ message: "Apartment not found" });
  });


});
