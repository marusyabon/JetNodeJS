const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ContactSchema = new Schema({
    FirstName: String,
	LastName: String,
	StatusID: {type: String, ref: "Statuse"},
	Email: String,
	Photo: String,
	Skype: String,
	Job: String,
	Company: String,
	Birthday: String,
	StartDate: String,
	Address: String
});

ContactSchema.set('toJSON', {
	virtuals: true,
	transform: function (doc, ret) {
		delete ret._id;
		delete ret.__v;
	  }
});

const Contact = mongoose.model('Contact', ContactSchema);

module.exports = Contact;
