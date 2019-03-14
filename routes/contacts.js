const express = require('express');
const router = express.Router();
const Contact = require('../models/contacts');


/* GET users listing. */
router.get('/', function (req, res, next) {
	Contact.find({}).
	populate('StatusID', 'Value').
	exec(function (err, data) {
		const response = {};
		if (err) {
			console.log(err);
			response.status = 'error';
		}
		else {
			response.status = 'server';
			response.data = data;
		}
		res.send(response);
	})
});

router.post('/', function (req, res, next) {
	let contact = new Contact(req.body);
	contact.save((err, item) => {
		const response = {};
		if (err) {
			console.log(err);
			response.status = 'error';
		}
		else {
			response.status = 'server';
			response.data = item;
		}
		res.send(response);
	});
});

router.put('/', function (req, res, next) {
	Contact.findOneAndUpdate(
		{ _id: req.body.id },
		{
			$set: {
				FirstName: req.body.FirstName,
				LastName: req.body.LastName,
				StatusID: req.body.StatusID,
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
			const response = {};
			if (err) {
				console.log(err);
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

router.delete('/', function (req, res, next) {
	Contact.findOneAndDelete(
		{ _id: req.body.id },
		function (err, result) {
			res.send(result);
		}
	);
});

module.exports = router;
