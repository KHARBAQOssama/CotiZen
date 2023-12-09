const { faker } = require("@faker-js/faker");

const request = require("supertest");
const User = require("../models");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const express = require("express");
const app = express();

app.use(express.json());
app.use("/", require("../routes"));

jest.mock("../models");
const mockedUser = User;

jest.mock("bcryptjs");

jest.mock("jsonwebtoken");

let email = faker.internet.email();

describe("Authentication", () => {
  it("should verify that required fields are full", async () => {
    const body = {};
    const response = await request(app).post("/auth/login").send(body);
    expect(response.status).toBe(400);
    expect(response.body).toEqual({ message: "All fields are required" });
  });

  it("should return the user not found", async () => {
    const body = {
      email,
      password: "password123",
    };
    mockedUser.findOne.mockResolvedValue(null);
    const response = await request(app).post("/auth/login").send(body);
    expect(response.status).toBe(404);
    expect(response.body).toEqual({
      message: "user not found, email is incorrect",
    });
  });

  it("should verify that the password is incorrect", async () => {
    const body = {
      email,
      password: "password123",
    };
    mockedUser.findOne.mockResolvedValue({
      _id: faker.string.alphanumeric(),
      email,
      full_name: faker.person.fullName(),
    });
    bcrypt.compare.mockResolvedValue(false);
    const response = await request(app).post("/auth/login").send(body);

    expect(response.status).toBe(401);
    expect(response.body).toEqual({ message: "Password is not correct" });
  });

  it("should log in the user successfully", async () => {
    const body = {
      email,
      password: "password123",
    };
    mockedUser.findOne.mockResolvedValue({
      _id: faker.string.alphanumeric(),
      email,
      full_name: faker.person.fullName(),
    });
    bcrypt.compare.mockResolvedValue(true);
    jwt.sign.mockReturnValue("mockedToken");
    const response = await request(app).post("/auth/login").send(body);

    expect(response.status).toBe(200);
    expect(response.body).toMatchObject(expect.any(Object));
  });
});
