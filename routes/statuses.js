const express = require('express');
const router = express.Router();
const Status = require('../models/statuses');


/* GET users listing. */
router.get('/', function (req, res, next) {
	Status.find({}, function (err, data) {
		if (!err) {
			res.send(data);
		}
		else {
			throw err;
		}
	})
});

router.post('/', function (req, res, next) {
	let status = new Status(req.body);
	status.save((err) => {
		if (err) throw err;
		res.send("Status type saved")
	});
});

module.exports = router;
