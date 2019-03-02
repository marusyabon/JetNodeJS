const express = require('express');
const router = express.Router();
const Activity = require('../models/activities');
const ObjectID = require('mongodb').ObjectID;

/* GET users listing. */
router.get('/', function (req, res, next) {
	Activity.find({}).
	populate('ContactID', 'TypeID').
	exec(function (err, data) {
		const response = {};
		if (err) {
			response.status = 'error';
		}
		else {
			data = data.map((item) => {
				item.id = ObjectID(item._id);
				return item
			});
			response.status = 'server';
			response.data = data;
		}
		res.send(response);
	})
});

router.post('/', function (req, res, next) {
	let activity = new Activity(req.body);
	activity.save((err) => {
		const response = {};
		if (err) {
			console.log(err);
			response.status = 'error';
		}
		else {
			response.status = 'server';
		}
		res.send(response);
	});
});

router.put('/:id', function (req, res, next) {
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
				response.status = 'server';
				response.data = result;
			}
			res.send(response);
		}
	);
});

router.delete('/:id', function (req, res, next) {
	Activity.findOneAndDelete(
		{ _id: ObjectID(req.body._id) },
		function (err, result) {
			res.send(result);
		}
	);
});

module.exports = router;
