const app = require("../../../server");
const express = require("express");
const sinon = require("sinon");

const router = express.Router();

const { getFoodHandler } = require("../fatsecret");
const { expected_results } = require("../fatsecret_expected_results");

const delete_later = () => {
  return `
//TEST suite

//SETUP
//knex seed run;

// the four tests:
// (3433) food in db, and 1h old
// (4881) food in db, and 24+h old
// (4891) food in db, and 22+h old (for margin of error, we choose to fetch new FatSecret values after 22 hours)
// (4352576) food not in db

// create a function to setup our migrations
`;
};

const knexSeedRun = async () => {
  try {
    await knex.seed.run();
  } catch (err) {
    console.log(err);
  }
};

beforeAll(knexSeedRun);

describe("test food requestsrequests", () => {
  it("should return existing data in Foods for fatsecret_food_id=3433", async done => {
    const mock_get = sinon.spy(router, "get");

    mock_get("/fatsecret/get-food/3433", () => {
      return expected_results.results3433;
    });

    done();
  });

  it("should return new data for fatsecret_food_id=4881", async done => {
    //
    done();
  });

  it("should return new data for fatsecret_food_id=4891", async done => {
    //
    done();
  });

  it("should return new data for fatsecret_food_id=4352576", async done => {
    //
    done();
  });
});
