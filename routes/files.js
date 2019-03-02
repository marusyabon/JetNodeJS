const express = require('express');
const router = express.Router();

// default options
router.get('/', function (req, res, next) {
	res.send([]);
});

router.post('/', function(req, res) {
  if (Object.keys(req.files).length == 0) {
    return res.status(400).send('No files were uploaded.');
  }

  // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
  let sampleFile = req.files.upload;
  let fileName = req.files.upload.name;

  const path = __dirname + '\\data\\files\\' + fileName;
  // Use the mv() method to place the file somewhere on your server
  sampleFile.mv(path, function(err) {
    if (err)
      return res.status(500).send(err);

    res.send('File uploaded!');
  });
});

module.exports = router;
