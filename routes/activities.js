const express = require('express');
const router = express.Router();
const Activity = require('../models/activities');
const ObjectID = require('mongodb').ObjectID;

/* GET users listing. */
router.get('/', function (req, res, next) {
	Activity.find({}).
	populate('ContactID').
	exec(function (err, data) {
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
	let activity = new Activity(req.body);
	activity.id = ObjectID(req.body._id);
	activity.save((err) => {
		const response = {};
		if (err) {
			console.log(err);
			response.status = 'error';
		}
		else {
			response.status = 'success';
		}
		res.send(response);
	});
});

router.put('/', function (req, res, next) {
	Activity.findOneAndUpdate(
		{ _id: ObjectID(req.body._id) },
		{
			$set: {
				Details: req.body.Details,
				TypeID: req.body.TypeID,
				State: req.body.State,
				ContactID: req.body.ContactID,
				DueDate: req.body.DueDate
			}
		},
		function (err, result) {
			const response = {};
			if (err) {
			console.log('error');
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
	Activity.findOneAndDelete(
		{ _id: ObjectID(req.body._id) },
		function (err, result) {
			res.send(result);
		}
	);
});

module.exports = router;
