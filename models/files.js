const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const FilesSchema = new Schema({
	FileName: String,
	FileDate: String,
	ContactID: {type: Schema.Types.ObjectId, ref: "Contact"},
	FileSize: String
});

const File = mongoose.model('File', FilesSchema);

module.exports = File;
