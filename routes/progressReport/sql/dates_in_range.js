const dates_in_range = (time_zone, goal_start_date, goal_end_date) => {
  return `
    ( select 
        d.observation_date, 
        ((d.observation_date + interval '1 day') AT TIME ZONE '${time_zone}' AT TIME ZONE 'UTC')::timestamptz as eod_in_utc
    
        -- eg for '2019-12-25', eod = '2019-12-26', with our query saying we want the last (aka max) value 
        -- less than eod.
        -- but since our database stores timestamptz, which are in utc, we want to check
        -- the eod to be in utc form.
        -- for d.observation_date = date '2019-12-25', in "EST" (-5 vs UTC), eod_in_utc = timestamptz '2019-12-26 05:00'
        -- eg one off select query
        -- select ((date '2019-12-25' + interval '1 day') AT TIME ZONE 'EST' AT TIME ZONE 'UTC')::timestamptz as eod_in_utc
      from (
        SELECT date_trunc('day', timeseries)::date as observation_date
        FROM generate_series
        ('${goal_start_date}'::timestamp 
        ,'${goal_end_date}'::timestamp
        ,'1 day'::interval) as timeseries
      ) as d)
    as d
  `;
};

module.exports = dates_in_range;
