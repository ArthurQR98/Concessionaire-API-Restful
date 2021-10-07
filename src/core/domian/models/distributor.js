const mongoose = require('mongoose');
const { Schema } = mongoose;

const schema = Schema({
    name: {
        type: String,
        required: true
    },
    address: {
        type: String
    },
    phone: Number
});

const DistributorModel = mongoose.model('Distributor', schema);

module.exports.DistributorModel = DistributorModel;
module.exports.distributorSchema = schema;