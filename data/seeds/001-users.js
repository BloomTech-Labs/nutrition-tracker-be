exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex
    .raw("TRUNCATE TABLE users RESTART IDENTITY CASCADE")
    .then(function() {
      // Inserts seed entries
      return knex("users").insert([
        {
          id: 1,
          firebase_id: "paxnAEqEsPTWJs2DdPEHYjDa4uq2",
          email: "billy@thekid.com",
          height_cm: 180,
          sex: "Male",
          dob: "1987-09-29"
        }
      ]);
    });
};
