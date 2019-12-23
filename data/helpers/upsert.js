const { pgp } = require("../pg-promise.js");

//generates *sql string* for an UPSERT functionality
const createUpsertQuerySql = (
  data, // array of objects to be upserted
  table, // name of table we're upserting to
  columns, // array of columns to be inserted/updated
  onConflictColumns, // set of columns or constraint that defines whether to update or insert
  skipUpdateColumns // array of column(s) we dont want to update
) => {
  const onConflictColumnsStr = onConflictColumns.join(", ");

  const columnSet = new pgp.helpers.ColumnSet(columns, { table: table });
  return (
    pgp.helpers.insert(data, columnSet) +
    ` ON CONFLICT(${onConflictColumnsStr}) DO UPDATE SET ` +
    columnSet.assignColumns({
      from: "EXCLUDED",
      skip: skipUpdateColumns
    }) +
    " RETURNING *"
  );
};

//generates *sql string* for an UPSERT functionality
const createUpsertQueryCustomSetValuesLogicSql = (
  data, // array of objects to be upserted
  table, // name of table we're upserting to
  columns, // array of columns to be inserted/updated
  onConflictColumns, // set of columns or constraint that defines whether to update or insert
  setColumnsStr // string that details the values that you want to set if it's an update
  // rather than an insert
) => {
  const onConflictColumnsStr = onConflictColumns.join(", ");

  const columnSet = new pgp.helpers.ColumnSet(columns, { table: table });
  return (
    pgp.helpers.insert(data, columnSet) +
    ` ON CONFLICT(${onConflictColumnsStr}) DO UPDATE SET ` +
    setColumnsStr +
    " RETURNING *"
  );
};

module.exports = { createUpsertQuerySql, createUpsertQueryAddValuesSql: createUpsertQueryCustomSetValuesLogicSql };
