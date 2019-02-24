const express = require('express');
const router = express.Router();
const Contact = require('../models/contacts');
const ObjectID = require('mongodb').ObjectID;


/* GET users listing. */
router.get('/', function (req, res, next) {
	Contact.find({}, function (err, data) {
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
	let contact = new Contact(req.body);
	contact.save((err) => {
		if (err) {
			console.log('error');
			res.send({status: 'error'});
		}
		else {
			res.send("Contact saved");
		}
	});
});

router.put('/:id', function (req, res, next) {
	Contact.findOneAndUpdate(
		{ _id: ObjectID(req.body._id) },
		{
			$set: {
				id: req.body._id,
				FirstName: req.body.FirstName,
				LastName: req.body.LastName,
				Email: req.body.Email,
				Photo: req.body.Photo,
				Skype: req.body.Skype,
				Job: req.body.Job,
				Company: req.body.Company,
				Birthday: req.body.Birthday,
				Address: req.body.Address
			}
		},
		function (err, result) {
			if (err) {
				console.log('error');
				res.send({status: 'error'});
			}
			else {
				console.log('result');
				res.send(result);
			}
		}
	);
});

router.delete('/:id', function (req, res, next) {
	Contact.findOneAndDelete(
		{ _id: ObjectID(req.body._id) },
		function (err, result) {
			res.send(result);
		}
	);
});

module.exports = router;
