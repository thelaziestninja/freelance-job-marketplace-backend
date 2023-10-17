// import dotenv from "dotenv";
// dotenv.config();

import request from "supertest";
import mongoose from "mongoose";
import { app, server } from "../../src/app";
import connectDB from "../../src/config/dbConfig";

let jwtToken: string;
let db;

beforeAll(async () => {
  db = await connectDB();
  // Register and Login to get a JWT token
  let uniqueUsername = `test_${Date.now()}`;
  const registerResponse = await request(app)
    .post("/user/register")
    .send({
      username: uniqueUsername,
      password: "test123",
      email: `test_${Date.now()}@example.com`,
      user_type: "freelancer",
    });

  // console.log("registerResponse.status", registerResponse.status);
  // console.log("registerResponse.body", registerResponse.body);

  const response = await request(app)
    .post("/user/login")
    .send({ username: uniqueUsername, password: "test123" });

  // console.log("response.body", response.body);
  jwtToken = response.body.token;
  // console.log("jwtToken", jwtToken);
  // console.log("response.status", response.status);
});

describe("JWT Expiration Test", () => {
  test("should succeed before expiration", async () => {
    const profileData = {
      skills: ["JavaScript", "Node.js", "Express.js"],
      description: "Experienced full stack developer",
      hourly_rate: 50,
      language: ["English", "Spanish"],
    };
    const response = await request(app)
      .post("/profiles")
      .set("Authorization", `Bearer ${jwtToken}`)
      .send(profileData);
    // console.log("response.body:", response.body);
    expect(response.statusCode).toBe(201);
  });

  test("should fail after expiration", async () => {
    const profileData = {
      skills: ["JavaScript", "Node.js", "Express.js"],
      description: "Experienced full stack developer",
      hourly_rate: 50,
      language: ["English", "Spanish"],
    };
    // Wait for the token to expire
    await new Promise((resolve) => setTimeout(resolve, 1000)); // Assume a 1 second expiration also change in loginHandler expiration to 1s
    const response = await request(app)
      .post("/profiles")
      .set("Authorization", `Bearer ${jwtToken}`)
      .send(profileData);
    // console.log("response.body:", response.body);
    expect(response.statusCode).toBe(401); // Unauthorized due to token expiration
  }, 5000); // Set a timeout of 10 seconds for this test

  afterAll(async () => {
    await new Promise((resolve) => server.close(resolve));
    await mongoose.connection.close();
  });
});
