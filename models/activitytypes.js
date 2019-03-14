const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ActivitytypeSchema = new Schema({
    value: String,
	Icon: String
});

ActivitytypeSchema.set('toJSON', {
	virtuals: true,
	transform: function (doc, ret) {
		delete ret._id;
		delete ret.__v;
	  }
});

const Activitytype = mongoose.model('Activitytype', ActivitytypeSchema);

module.exports = Activitytype;
