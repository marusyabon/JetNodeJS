const express = require('express');
const router = express.Router();
const Status = require('../models/statuses');
const ObjectID = require('mongodb').ObjectID;

/* GET users listing. */
router.get('/', function (req, res, next) {
	Status.find({}, function (err, data) {
		if (err) {
			console.log('error');
			res.send({status: 'error'});
		}
		else {
			res.send(data);
		}
	})
});

router.post('/', function (req, res, next) {
	let status = new Status(req.body);
	status.save((err) => {
		if (err) {
			console.log('error');
			res.send({status: 'error'});
		}
		else {
			console.log(req.body);
			res.send("Status type saved");
		}
	});
});

router.put('/:id', function (req, res, next) {
	Status.findOneAndUpdate(
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
	Status.findOneAndDelete(
		{ _id: ObjectID(req.body._id) },
		function (err, result) {
			res.send(result);
		}
	);
});

module.exports = router;
