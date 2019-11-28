const express = require('express');
const router = express.Router();
const UserInfo = require('./settingsDB');
//const {heightToImperial, kgToLbs} = require('./helper');

//Gets all users. For Testing purposes mostly.
router.get("/", async (req, res) => {
	try {
		const users = await UserInfo.find();
		res.json(users);
	} catch (err) {
		res.status(500).json({ message: "Failed to get Users" });
	}
});

//Get specific user from users table.
router.get("/:id", async (req, res) => {
	const { id } = req.params;
	try {
		const user = await UserInfo.findByUserId(id);
		//Calls function to convert height in cm to height in ft/inches, and adds it to user obj.
		user.height = heightToImperial(user.height_cm);
		res.json(user);
	} catch (err) {
		res.status(500).json({ message: "Failed to get Users"  });
	}
});

//Get specific users metric history from user_metric_history table.
router.get("/metrics/:id", async (req, res) => {
	const { id } = req.params;
	try {
		const user = await UserInfo.findMetricHistoryById(id);
		//Calls function to convert weight in kg to weight in lbs, and adds it to user obj.
		user.weight = kgToLbs(user.weight_kg);
		res.json(user);
	} catch (err) {
		res.status(500).json({ message: "Failed to get user's metrics"  });
	}
});

//Get specific users metric history from user_metric_history table.
router.get("/budget/:id", async (req, res) => {
	const { id } = req.params;
	try {
		const user = await UserInfo.findBudgetDataById(id);
		//Calls function to convert weight in kg to weight in lbs, and adds it to user obj.
		res.json(user);
	} catch (err) {
		res.status(500).json({ message: "Failed to get user's budget"  });
	}
});

//Update specific user in users table.
router.put("/:id", async (req, res) => {
	const id = req.params.id;
	const updatedSettings = req.body;
	if(!updatedSettings) {
		res.status(400).json({
			message: "Item required for update are missing"
		})
	}
	try {
		const updated = await UserInfo.updateUser(updatedSettings, id);
		res.status(201).json({updated});
	} catch (err) {
		console.log(err)
		res.status(500).json({ message: "Failed to update user settings" });
	}
});

//Update specific user in users table.
router.put("/metrics/:id", async (req, res) => {
	const id = req.params.id;
	const updatedSettings = req.body;
	if(!updatedSettings) {
		res.status(400).json({
			message: "Item required for update are missing"
		})
	}
	try {
		const updated = await UserInfo.updateMetrics(updatedSettings, id);
		res.status(201).json(updated);
	} catch (err) {
		res.status(500).json({ message: "Failed to update user metrics" });
	}
});

//Converts cm to feet and inches.
function heightToImperial(n){
	var realFeet = ((n*0.393700) / 12);
	var convFeet = Math.floor(realFeet);
	var convInches = Math.round((realFeet - convFeet) * 12);
	return {
		feet: convFeet,
		inches: convInches
	}
}

//Converts kg to lbs
function kgToLbs(kg) {
    var nearExact = kg/0.45359237;
    var lbs = Math.floor(nearExact);
    return lbs
}


module.exports = router;
