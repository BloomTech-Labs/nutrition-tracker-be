exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex
    .raw("TRUNCATE TABLE users RESTART IDENTITY CASCADE")
    .then(function() {
      // Inserts seed entries
      return knex("users").insert([
        {
          // id: 1,
          firebase_id: 12345,
          email: "jake@myemail.com",
          height_cm: 182.88,
          sex: "Male",
          dob: "1995-06-23"
        },
        {
          // id: 2,
          firebase_id: 23456,
          email: "amir@lycos.com",
          height_cm: 170.688,
          sex: "Male",
          dob: "1986-07-02"
        },
        {
          // id: 3,
          firebase_id: 34567,
          email: "janetj@someemail.com",
          height_cm: 152.4,
          sex: "Female",
          dob: "1998-1-07"
        },
        {
          // id: 4,
          firebase_id: 45678,
          email: "shaeshae@hotmail.com",
          height_cm: 161.54,
          sex: "Female",
          dob: "1982-10-10"
        },
        {
          // id: 5,
          firebase_id: "sDs3omvkWje9Lgv8wEteFkhZpVa2",
          email: "mcbride967@gmail.com",
          height_cm: 178,
          sex: "Male",
          dob: "1991-02-04"
        },
        {
          // id: 5,
          firebase_id: "dave",
          email: "dave@dave.com",
          height_cm: 180,
          sex: "Male",
          dob: "1987-09-29"
        }
      ]);
    });
};
