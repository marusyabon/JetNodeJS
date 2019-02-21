const express = require('express');
const router = express.Router();
const Contact = require('../models/contacts');
var ObjectID = require('mongodb').ObjectID;


/* GET users listing. */
router.get('/', function (req, res, next) {
	Contact.find({}, function (err, data) {
		if (err) throw err; 
		else { 
			let mappedArr = data.map(function(el) {
				el.id = el._id;
				return el;
			});
			res.send(data);
		}
	})
});

router.post('/', function (req, res, next) {
	let contact = new Contact(req.body);
	contact.save((err) => {
		if (err) throw err;
		res.send("Contact saved")
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
			console.log(result);
		}
	);
});

router.delete('/:id', function (req, res, next) {
	Contact.findOneAndDelete(
		{ _id: ObjectID(req.body._id) },
		function (err, result) {
			console.log(result);
		}
	);
});

module.exports = router;
