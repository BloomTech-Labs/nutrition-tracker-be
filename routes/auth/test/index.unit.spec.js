const app = require("../../../server");
const db = require("../../../data/knex.js");
const { getAge } = require("../helper");
const supertest = require("supertest");
const request = supertest(app);

describe("authRouter.js", () => {
  it("should set the environment to testing", () => {
    expect(process.env.DB_ENV).toBe("testing");
  });

  describe("POST /auth/register", () => {
    beforeEach(async () => {
      await db.truncate("user_budget_data");
      await db.raw("TRUNCATE TABLE users RESTART IDENTITY CASCADE");
    });

    // Valid Request Body
    const requestBody_1 = {
      firebase_id: "sDs3omvkWje9Lgv8wEteFkhZpVa2",
      sex: "Male",
      activity_level: 1.2,
      dob: "1987-09-29T00:00:00.000Z",
      actual_weight_kg: 81.65,
      goal_weight_kg: 55,
      height_cm: 160,
      goal_weekly_weight_change_rate: -1,
      email: "user1@email.com"
    };

    // Request Body with duplicate firebase_id
    const requestBody_2 = {
      firebase_id: "sDs3omvkWje9Lgv8wEteFkhZpVa2", // duplicate id
      sex: "Female",
      activity_level: 1.9,
      dob: "1995-08-04T00:00:00.000Z",
      actual_weight_kg: 61,
      goal_weight_kg: 55,
      height_cm: 140,
      goal_weekly_weight_change_rate: 1,
      email: "user1@email.com"
    };

    // Malformed Request Body with missing fields
    const requestBody_1_malformed = {
      firebase_id: "sDs3omvkWje9Lgv8wEteFkhZpVa2",
      sex: "Male",
      activity_level: 1.2,
      dob: "1987-09-29T00:00:00.000Z",
      actual_weight_kg: 81.65,
      goal_weight_kg: 55,
      //height_cm: 160,
      goal_weekly_weight_change_rate: -1,
      email: "user1@email.com"
    };

    it("should return a json object", async () => {
      const res = await request.post("/auth/register").send(requestBody_1);
      expect(res.type).toBe("application/json");
    });

    it("should return a 201 status code in response to a valid request", async () => {
      const res = await request.post("/auth/register").send(requestBody_1);
      expect(res.status).toBe(201);
    });

    it("should return a 400 status code in response to request with missing fields on the request body", async () => {
      const res = await request
        .post("/auth/register")
        .send(requestBody_1_malformed); // with missing fields
      expect(res.status).toBe(400);
    });

    it("should return a 500 status code in response to a request with a duplicate firebase_id field", async () => {
      await request.post("/auth/register").send(requestBody_1);
      const res = await request.post("/auth/register").send(requestBody_2); // with duplicate firebase_id
      expect(res.status).toBe(500);
    });

    it("should return the correct age for a given date of birth", async () => {
      const dateOfBirth = "1987-09-29";

      const age = getAge(dateOfBirth);

      expect(age).toBe(32);
    });
  });
});
