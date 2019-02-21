let mongoose = require('mongoose');

let Schema = mongoose.Schema;

const StatusesSchema = new Schema({
    Value: String
});

const Status = mongoose.model('Statuse', StatusesSchema);

module.exports = Status;