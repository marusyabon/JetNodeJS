let mongoose = require('mongoose');

let Schema = mongoose.Schema;

const ActivitySchema = new Schema({
    Details: String,
	TypeID: Number,
	State: String
});

const Activity = mongoose.model('Activity', ActivitySchema);

module.exports = Activity;