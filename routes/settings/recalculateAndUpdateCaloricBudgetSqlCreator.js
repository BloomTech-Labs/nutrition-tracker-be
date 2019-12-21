// returns raw SQL which recalculates a user's caloric budget

// ultimate output of query is of the form:

//  select user_id, caloric_budget
//  from (big_long_query);

const recalculateAndUpdateCaloricBudgetSqlCreator = user_id => `
  insert into user_budget_data(user_id, caloric_budget)
  select v.user_id,
    -- Calculates a user's caloric budget using the
    -- Mifflin-St. Jeor Equation for BMR (Basal Metabolic Rate)
    -- mutiplied by an Activity Factor of (1.2 - 1.9)
    -- https://www.calculator.net/bmr-calculator.html
    ROUND(
        ((10 * v.actual_weight_kg) 
        + (6.25 * v.height_cm) 
        - (5 * v.age) 
        + v.sex_offset) * v.activity_level
    ) as caloric_budget
  from (
    select 
      u.id as user_id,
      u.height_cm, 

      (
        CASE 
          WHEN u.sex='Male' THEN 5
          ELSE -161
        END
      ) as sex_offset,

      date_part('year', age(u.dob)) as age,

      ( select ubd.actual_weight_kg
        from user_budget_data as ubd
        where
          ubd.user_id = ${user_id} and
          ubd.actual_weight_kg is not null
        order by ubd.applicable_date desc)
      as actual_weight_kg, 

      ( select ubd.activity_level
        from user_budget_data as ubd
        where
          ubd.user_id = ${user_id} and
          ubd.activity_level is not null
        order by ubd.applicable_date desc)
      as activity_level
      
    from users as u
    where u.id = ${user_id}
  ) as v
  returning user_id, caloric_budget;
`;

module.exports = { recalculateAndUpdateCaloricBudgetSqlCreator };
