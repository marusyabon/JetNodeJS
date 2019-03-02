const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const StatusesSchema = new Schema({
	id: String,
	Value: String,
	Icon: String
});

const Status = mongoose.model('Statuse', StatusesSchema);

module.exports = Status;
