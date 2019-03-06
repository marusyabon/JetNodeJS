const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ActivitiesSchema = new Schema({
	Details: String,
	TypeID: {type: Schema.Types.ObjectId, ref: "Activitytype"},
	State: String,
	ContactID: {type: Schema.Types.ObjectId, ref: "Contact"},
	DueDate: String
});

const Activity = mongoose.model('Activity', ActivitiesSchema);

module.exports = Activity;
