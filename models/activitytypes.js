const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ActivitytypeSchema = new Schema({
    Value: String,
	Icon: String
});

const Activitytype = mongoose.model('Activitytype', ActivitytypeSchema);

module.exports = Activitytype;
