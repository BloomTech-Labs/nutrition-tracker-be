// db for sending/receiving queries to the database
// not using knex because knex doesn't like sending a raw sql query if it has upserting
const { db } = require("../../data/pg-promise.js");

const { createUpsertQueryCustomSetValuesLogicSql } = require("../../data/helpers/upsert.js");

const upsertDailyTotal = data => {
  const table = "daily_nutrition_totals";
  const alias = "t";

  const setColumns = ["total_calories", "fat_calories", "carbs_calories", "protein_calories"];

  const lineStr = e => `${e}=t.${e}+EXCLUDED.${e}`;
  const arrLines = setColumns.map(lineStr);
  const setColumnsStr = arrLines.join(",");

  const onConflictColumns = ["user_id", "date"];

  const columns = [...onConflictColumns, ...setColumns];

  try {
    const querySql = createUpsertQueryCustomSetValuesLogicSql(
      data,
      table,
      columns,
      onConflictColumns,
      setColumnsStr,
      alias
    );
    console.log(querySql);

    return db.any(querySql);
  } catch (e) {
    return e;
  }
};

module.exports = { upsertDailyTotal };
