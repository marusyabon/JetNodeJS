let mongoose = require('mongoose');

let Schema = mongoose.Schema;

const ActivitytypeSchema = new Schema({
    Value: String
});

const Activitytype = mongoose.model('Activitytype', ActivitytypeSchema);

module.exports = Activitytype;