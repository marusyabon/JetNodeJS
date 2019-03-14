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
			response.status = 'server';
			response.data = data;
		}
		res.send(response)
	})
});

router.post('/', function (req, res, next) {
	let status = new Status(req.body);
	status.save((err, item) => {
		const response = {};
		if (err) {
			response.status = 'error';
		}
		else {
			response.status = 'server';
			response.data = item;
		}
		res.send(response)
	});
});

router.put('/', function (req, res, next) {
	Status.findOneAndUpdate(
		{ _id: req.body.id },
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
				response.status = 'server';
				response.data = result;
			}
			res.send(response)
		}
	);
});

router.delete('/', function (req, res, next) {
	Status.findOneAndDelete(
		{ _id: req.body.id },
		function (err, result) {
			res.send(result);
		}
	);
});

module.exports = router;
