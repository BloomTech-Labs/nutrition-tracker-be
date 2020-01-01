const observation_dates_with_eod = (time_zone, start_date, end_date) => {
  // for every "observation date" between (inclusive) goal start date and goal end date, also calculates a "end of day" timestamp value, and translates it into a UTC timestamptz value to compare against the values for applicable_date in user_budget_data
  const observation_dates = require("./observation_dates")(start_date, end_date);
  return `
    ( select 
        od.observation_date, 
        ((od.observation_date + interval '1 day') AT TIME ZONE '${time_zone}' AT TIME ZONE 'UTC')::timestamptz as eod_in_utc --"end of day in utc"
    
        -- eg for '2019-12-25', eod = '2019-12-26', with our query saying we want the last (aka max) value 
        -- less than eod.
        -- but since our database stores timestamptz, which are in utc, we want to check
        -- the eod to be in utc form.
        -- for od.observation_date = date '2019-12-25', in "EST" (-5 vs UTC), eod_in_utc = timestamptz '2019-12-26 05:00'
        -- eg one off select query
        -- select ((date '2019-12-25' + interval '1 day') AT TIME ZONE 'EST' AT TIME ZONE 'UTC')::timestamptz as eod_in_utc
      from ${observation_dates} as od
    )
  `;
};

module.exports = observation_dates_with_eod;
