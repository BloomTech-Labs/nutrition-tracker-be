const observation_dates = (start_date, end_date) => {
  // returns set of every "observation date" between (inclusive) goal start date and goal end date.
  return `
    (
      SELECT date_trunc('day', timeseries)::date as observation_date
      FROM generate_series
      ('${start_date}'::timestamp 
      ,'${end_date}'::timestamp
      ,'1 day'::interval) as timeseries
    )
  `;
};

module.exports = observation_dates;
