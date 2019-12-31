const { upsertDailyTotal } = require("./dailyTotalsDB.js");

async function main() {
  console.log(
    await upsertDailyTotal([
      {
        user_id: 1,
        date: "2019-12-23",
        total_calories: 1000,
        fat_calories: 400,
        carbs_calories: 100,
        protein_calories: 500
      }
    ])
  );
}

main();
