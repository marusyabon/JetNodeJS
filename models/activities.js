const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ActivitySchema = new Schema({
    Details: String,
	TypeID: Number,
	ContactID: Number,
	State: String
});

const Activity = mongoose.model('Activity', ActivitySchema);

module.exports = Activity;
