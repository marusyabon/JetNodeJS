const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const StatusesSchema = new Schema({
	Value: String,
	Icon: String
});

StatusesSchema.set('toJSON', {
	virtuals: true,
	transform: function (doc, ret) {
		delete ret._id;
		delete ret.__v;
	  }
});

const Status = mongoose.model('Statuse', StatusesSchema);

module.exports = Status;
