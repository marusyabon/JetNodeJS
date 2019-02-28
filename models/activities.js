const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ActivitiesSchema = new Schema({
	Details: String,
	TypeID: String,
	State: String,
	ContactID: [{type: Schema.Types.ObjectId, ref: "Activitytype"}],
	DueDate: Date
});

const Activity = mongoose.model('Activity', ActivitiesSchema);

module.exports = Activity;
