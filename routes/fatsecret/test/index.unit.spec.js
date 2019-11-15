const app = require("../../../server");
const supertest = require("supertest");
const request = supertest(app);

it("Test fatsecret search expression", async done => {
  const res = await request.get("/fatsecret/search-food/kale");

  expect(res.status).toBe(200);
  done();
});

it("Test fatsecret get food by id", async done => {
  const res = await request.get("/fatsecret/search-food/865");

  expect(res.status).toBe(200);
  done();
});
