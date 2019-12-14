const express = require('express');
const db = require('./foodItemDB');


router = express.Router();


router.get('/getfooditem/:foodlogID/user/:id', async (req, res) => {
     const {id} = req.params;
     const{foodlogID} = req.params;
     try{
         console.log("in the router",foodlogID, id)
        const foodItem = await db.getFoodItem(foodlogID, id)
        res.status(400).json(foodItem)
     }catch({message}){
        res.status(500).json(message)
     }  
})

module.exports = router;