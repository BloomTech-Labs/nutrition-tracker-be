const db = require("../../data/knex");


const getFoodItem = async (foodLogID, userID) => {
    try{
        const log_data = await db("food_log").where({ id: foodLogID, user_id: userID });    
            return log_data ;
         }
         catch(err){
            return (err)
        }
};


const updateFoodItem = async (foodLogId, userID, foodItem) => {
    //update the record with the updated informnation
    console.log('IN THE BACK END HERE IS THE ENDPOINT FOR UPDATE ITEM', foodItem)
    try{
       const updatedRecord = await db("food_log").where({ id:foodLogId, user_id:userID }).update({"quantity": foodItem.updatedQuantity});
       return updatedRecord;
    }catch(err){
        return err;
    }

};

const deleteFoodItem = () => {
    // delete the item from the db
}

module.exports = {
  getFoodItem,
  updateFoodItem
};
