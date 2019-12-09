const moment = require("moment-timezone");

module.exports = function toUTCTimeStamp(currentDate, currentTimeZone) {
  // create a new moment from the current date
  const now = moment(currentDate);

  // extract the year month and date
  const year = now.get("year");
  const month = now.get("month");
  const date = now.get("date");

  // create a new moment representing "today"
  const timestamp = moment.tz(currentTimeZone);

  // update the date to match the currentDate passed in
  timestamp.set("year", year);
  timestamp.set("month", month);
  timestamp.set("date", date);

  // return the utc formatted string to be stored in the DB
  return timestamp.utc().format()
}