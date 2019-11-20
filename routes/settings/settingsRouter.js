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


router.put('/', async (req, res) => {

})

module.exports = router;
