const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const Schema = mongoose.Schema;

const schema = new Schema({
    api:{type: String, required: true},
    sulfur:{type: String, required: true},
    origin: {type: String, required: true},
    origin_terminal: {type: String, required: true},
    grade: {type: String, required: true},
    description: {type: String, required: true},
    type: {type: String, required: true},
    added_by: {type: String},
    user: {type: Schema.Types.ObjectId, ref: 'User'},
	dateadded: { type: Date, default: Date.now }

});
module.exports = mongoose.model('CargoRegister', schema);
