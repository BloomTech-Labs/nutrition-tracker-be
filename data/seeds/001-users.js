
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex.raw('TRUNCATE TABLE users RESTART IDENTITY CASCADE')
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {
        id: 1,
        username:'jakecali',
        password:'123456',
        email:'jake@myemail.com',
        height_cm:182.88,
        sex:'male',
        dob: '1995-06-23'
        },
        {
        id: 2,
        username:'amirking',
        password:'123456',
        email:'amir@lycos.com',
        height_cm:170.688,
        sex:'male',
        dob: '1986-07-02'
        },
        {
        id: 3,
        username:'janetjarrel',
        password:'123456',
        email:'janetj@someemail.com',
        height_cm:152.40,
        sex:'female',
        dob: '1998-1-07'
        },
        {
        id: 4,  
        username:'shaylashe',
        password:'123456',
        email:'shaeshae@hotmail.com',
        height_cm:161.54,
        sex:'female',
        dob: '1982-10-10'
        },
        
      ]);
    });
};
