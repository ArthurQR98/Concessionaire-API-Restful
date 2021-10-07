const mongoose = require('mongoose');
const { Schema } = mongoose;

const schema = Schema({
    name: {
        type: String,
        required: true,
        minLength: 1,
        maxLength: 99
    },
    country: String,
    date: { type: Date, default: Date.now }
});

const CompanyModel = mongoose.model('Company', schema);
module.exports = CompanyModel;