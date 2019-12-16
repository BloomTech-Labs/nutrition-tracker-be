const db = require("../../data/knex");


const getFoodItem = async (foodLogID, userID) => {
    try{
        const log_data = await db("food_log as fl").where({ id: foodLogID, user_id: userID });    
            return log_data ;
         }
         catch(err){
            return (err)
        }
};


const updateFoodItem = () => {
    //update the record with the updated informnation
};

module.exports = {
  getFoodItem
};
