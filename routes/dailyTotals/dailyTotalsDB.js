// db for sending/receiving queries to the database
// not using knex because knex doesn't like sending a raw sql query if it has upserting
const { db } = require("../../data/pg-promise.js");

const { createUpsertQuerySql } = require("../../data/helpers/upsert.js");

const upsertDailyTotal = data => {
  const table = "daily_nutrition_totals";

  const setColumns = [
    "total_calories",
    "fat_calories",
    "carbs_calories",
    "protein_calories"
  ];

  const onConflictColumns = ["user_id", "date"];

  const skipInsertColumns = ["id"];

  const columns = [...onConflictColumns, ...setColumns];

  const skipUpdateColumns = [...skipInsertColumns, ...onConflictColumns];

  try {
    const querySql = createUpsertQuerySql(
      data,
      table,
      columns,
      onConflictColumns,
      skipUpdateColumns
    );

    return db.any(querySql);
  } catch (e) {
    return e;
  }
};

module.exports = { upsertDailyTotal };
