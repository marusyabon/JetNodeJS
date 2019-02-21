let mongoose = require('mongoose');

let Schema = mongoose.Schema;

const ContactSchema = new Schema({
	id: String,
    FirstName: String,
	LastName: String,
	Email: String,
	Photo: String,
	Skype: String,
	Job: String,
	Company: String,
	Birthday: String,
	Address: String
});

const Contact = mongoose.model('Contact', ContactSchema);

module.exports = Contact;