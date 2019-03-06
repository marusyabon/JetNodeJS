const express = require('express');
const router = express.Router();
const FileModel = require('../models/files');
const ObjectID = require('mongodb').ObjectID;
const fs = require('fs');
const path = require(`path`);

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

router.post('/', function (req, res) {
	let file = new FileModel(req.body);

	file.save((err) => {
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

router.post('/upload', function (req, res) {
	if (Object.keys(req.files).length == 0) {
		return res.status(400).send('No files were uploaded.');
	}

	const uploadedFile = req.files.upload;
	const fileName = uploadedFile.name;

	const _path = path.resolve('/JetNodeJS/data/files');

	uploadedFile.mv(`${_path}/${fileName}`, function (err) {
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

router.delete('/:id', function (req, res, next) {

	const fileName = req.body.FileName;
	const _path = path.resolve('/JetNodeJS/data/files');

	fs.unlink(`${_path}/${fileName}`, (err) => {
		const response = {};

		if (err) {
			console.log(err);
			response.status = 'error';
		}
		else {
			FileModel.findOneAndDelete(
				{ _id: ObjectID(req.body._id) },
				function (err, result) {
					if (err) {
						console.log(err);
						response.status = 'error';
					}
					else {
						response.status = 'server';
						response.data = result;
					}
				}
			);
		}
		res.send(response);
	});

});

module.exports = router;
