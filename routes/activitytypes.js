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
			console.log('error');
			res.send({status: 'error'});
		}
	})
});

router.post('/', function (req, res, next) {
	let activitytype = new Activitytype(req.body);
	activitytype.save((err) => {
		if (err) {
			console.log('error');
			res.send({status: 'error'});
		}
		else {
			res.send("Type saved");
		}
	});
});

module.exports = router;
