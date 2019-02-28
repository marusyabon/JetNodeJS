const express = require('express');
const router = express.Router();
const Status = require('../models/statuses');
const ObjectID = require('mongodb').ObjectID;

/* GET users listing. */
router.get('/', function (req, res, next) {
	Status.find({}, function (err, data) {
		const response = {};
		if (err) {
			response.status = 'error';
		}
		else {
			response.status = 'success';
			response.data = data;
		}
		res.send(response)
	})
});

router.post('/', function (req, res, next) {
	let status = new Status(req.body);
	// status.id = req.body._id;
	status.save((err) => {
		const response = {};
		if (err) {
			response.status = 'error';
		}
		else {
			response.status = 'success';
		}
		res.send(response)
	});
});

router.put('/', function (req, res, next) {
	Status.findOneAndUpdate(
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
			res.send(response)
		}
	);
});

router.delete('/', function (req, res, next) {
	Status.findOneAndDelete(
		{ _id: ObjectID(req.body._id) },
		function (err, result) {
			res.send(result);
		}
	);
});

module.exports = router;
