const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const Schema = mongoose.Schema;

const schema = new Schema({
    name: {type: String, required: true},
    own: {type: String, required: true},
    imo: {type: String, required: true},
    flag: {type: String, required: true},
    type: {type: String, required: true},
    vessel_class: {type: String, required: true},
    added_by: {type: String, required: true},
	dateadded: { type: Date, default: Date.now }

});
module.exports = mongoose.model('Vessel', schema);
