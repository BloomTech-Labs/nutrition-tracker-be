const express = require('express');
const router = express.Router();
const UserInfo = require('./settingsDB');

router.get("/", async (req, res) => {
	try {
		const users = await UserInfo.find();
		res.json(users);
	} catch (err) {
		res.status(500).json({ message: "Failed to get Users" });
	}
});

router.get("/:id", async (req, res) => {
	const { id } = req.params;
	try {
		const user = await UserInfo.findById(id);
		user.height = heightToImperial(user.height_cm)

		res.json(user);
	} catch (err) {
		res.status(500).json({ err });
	}
});

router.put("/:id", async (req, res) => {
	const id = req.params.id;
	const updatedSettings = req.body;
	if(!updatedSettings) {
		res.status(400).json({
			message: "Item required for update are missing"
		})
	}
	try {
		const updated = await UserInfo.updateUserSettings(updatedSettings, id);
		res.status(201).json(updated);
	} catch (err) {
		res.status(500).json({ message: "Failed to update user settings" });
	}
});

function heightToImperial(n){
	const height = []
	var realFeet = ((n*0.393700) / 12);
	var convFeet = Math.floor(realFeet);
	var convInches = Math.round((realFeet - convFeet) * 12);
	height.push({
		feet: convFeet,
		inches: convInches
	})
	return height
}

module.exports = router;
