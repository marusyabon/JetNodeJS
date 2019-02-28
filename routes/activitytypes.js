const express = require('express');
const router = express.Router();
const Activitytype = require('../models/activitytypes');
const ObjectID = require('mongodb').ObjectID;

/* GET users listing. */
router.get('/', function (req, res, next) {
	Activitytype.find({}, function (err, data) {
		const response = {};
		if (err) {
			response.status = 'error';
		}
		else {
			response.status = 'success';
			response.data = data;
		}
		res.send(response);
	})
});

router.post('/', function (req, res, next) {
	let activitytype = new Activitytype(req.body);
	activitytype.id = ObjectID(req.body._id);
	activitytype.save((err) => {
		const response = {};
		if (err) {
			response.status = 'error';
		}
		else {
			response.status = 'success';
		}
		res.send(response);
	});
});

router.put('/', function (req, res, next) {
	Activitytype.findOneAndUpdate(
		{ _id: ObjectID(req.body._id) },
		{
			$set: {
				Value: req.body.Value,
				Icon: req.body.Icon
			}
		},
		function (err, result) {
			const response = {};
			if (err) {
				response.status = 'error';
			}
			else {
				response.status = 'success';
				response.data = result;
			}
			res.send(response);
		}
	);
});

router.delete('/', function (req, res, next) {
	Activitytype.findOneAndDelete(
		{ _id: ObjectID(req.body._id) },
		function (err, result) {
			res.send(result);
		}
	);
});

module.exports = router;
