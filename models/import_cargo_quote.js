const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const Schema = mongoose.Schema;

const schema = new Schema({
    cargo_status: {type: String},
    type: {type: String},
    market: {type: String},
    charterer: {type: String},
    broker: {type: String},
    grade: {type: String},
    quantity: {type: String},
    date1: {type: String},
    date2: {type: String},
    load: {type: String},
    discharge: {type: String},
    rate_type: {type: String},
    rate: {type: String},
    vessel: {type: String},
    remarks: {type: String},
    user: {type: Schema.Types.ObjectId, ref: 'User'},
    added_by: {type: String },
	dateadded: { type: Date, default: Date.now }

});
module.exports = mongoose.model('cargos', schema);
