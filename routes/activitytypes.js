const express = require('express');
const router = express.Router();
const Activitytype = require('../models/activitytypes');
const ObjectID = require('mongodb').ObjectID;

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

router.put('/:id', function (req, res, next) {
	Activitytype.findOneAndUpdate(
		{ _id: ObjectID(req.body._id) },
		{
			$set: {
				Value: req.body.Value,
				Icon: req.body.Icon
			}
		},
		function (err, result) {
			if (err) {
				console.log('error');
				res.send({status: 'error'});
			}
			else {
				console.log(result);
				res.send(result);
			}
		}
	);
});

router.delete('/:id', function (req, res, next) {
	Activitytype.findOneAndDelete(
		{ _id: ObjectID(req.body._id) },
		function (err, result) {
			res.send(result);
		}
	);
});

module.exports = router;
