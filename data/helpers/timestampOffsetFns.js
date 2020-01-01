// takes current date and subtracts off x number of days
const presentMinusXDays = x => new Date(new Date() - 1000 * 60 * 60 * 24 * x);
const presentMinusXHours = x => new Date(new Date() - 1000 * 60 * 60 * x);

module.exports = { presentMinusXDays, presentMinusXHours };
