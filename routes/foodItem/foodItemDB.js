const db = require("../../data/knex");


const getFoodItem = async (foodLogID, userID) => {
    try{
        const log_data = await db("food_log").where({id:foodLogID, user_id:userID});    
            return log_data ;
         }
         catch(err){
            return (err)
        }
};


const updateFoodItem = async (foodLogId, userID, foodItem) => {
    try{
       const updatedRecord = await db("food_log").where({id:foodLogId, user_id:userID}).update({"quantity": foodItem.updatedQuantity, "time_consumed_at": foodItem.time_consumed_at});
       return updatedRecord;
    }catch(err){
        return err;
    }

};

const deleteFoodItem = (foodLogId, userID) => {
    return db("food_log").where({id:foodLogId, user_id:userID}).del()
}

module.exports = {
  getFoodItem,
  updateFoodItem, 
  deleteFoodItem
};
