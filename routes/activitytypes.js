const express = require('express');
const router = express.Router();
const Activitytype = require('../models/activitytypes');


/* GET users listing. */
router.get('/', function (req, res, next) {
	Activitytype.find({}, function (err, data) {
		if (!err) {
			res.send(data);
		} 
		else { 
			throw err; 
		}
	})
});

router.post('/', function (req, res, next) {
	let activitytype = new Activitytype(req.body);
	activitytype.save((err) => {
		if (err) throw err;
		res.send("Type saved")
	});
});

module.exports = router;
