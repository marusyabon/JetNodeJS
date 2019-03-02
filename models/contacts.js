const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ContactSchema = new Schema({
	id: String,
    FirstName: String,
	LastName: String,
	StatusID: {type: Schema.Types.ObjectId, ref: "Statuse"},
	Email: String,
	Photo: String,
	Skype: String,
	Job: String,
	Company: String,
	Birthday: String,
	StartDate: String,
	Address: String
});

const Contact = mongoose.model('Contact', ContactSchema);

module.exports = Contact;
