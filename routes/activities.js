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
			console.log('error');
			res.send({status: 'error'});
		}
	});
});

router.post('/', function (req, res, next) {
	let activity = new Activity(req.body);
	activity.save((err) => {
		if (err) {
			console.log('error');
			res.send({status: 'error'});
		}
		else {
			res.send("Activity saved");
		}
	});
});

module.exports = router;
