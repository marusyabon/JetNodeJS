const express = require('express');
const router = express.Router();
const Activity = require('../models/activities');

/* GET users listing. */
router.get('/', function (req, res, next) {
	Activity.find({}, function (err, data) {
		if (!err) {
			res.send(data);
		}
		else {
			throw err;
		}
	})
});

router.post('/', function (req, res, next) {
	let activity = new Activity(req.body);
	activity.save((err) => {
		if (err) throw err;
		res.send("Activity saved")
	});
});

module.exports = router;
