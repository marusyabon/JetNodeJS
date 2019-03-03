const express = require('express');
const router = express.Router();
const FileModel = require('../models/files');
const ObjectID = require('mongodb').ObjectID;

// default options
router.get('/', function (req, res, next) {
	FileModel.find({}).
		populate('ContactID').
		exec(function (err, data) {
			const response = {};
			if (err) {
				response.status = 'error';
			}
			else {
				console.log(data);
				response.status = 'server';
				response.data = data;
			}
			res.send(response);
		})
});

router.post('/', function (req, res) {
	let file = new FileModel(req.body);
	console.log(file)
	file.save((err) => {
		const response = {};
		if (err) {
			console.log(err);
			response.status = 'error';
		}
		else {
			response.status = 'server';
		}
	});
	res.send(response);
});

router.post('/upload', function (req, res) {
	if (Object.keys(req.files).length == 0) {
		return res.status(400).send('No files were uploaded.');
	}

	let uploadedFile = req.files.upload;
	let fileName = uploadedFile.name;

	const path = __dirname + '\\data\\files\\' + fileName;

	uploadedFile.mv(path, function (err) {
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

module.exports = router;
