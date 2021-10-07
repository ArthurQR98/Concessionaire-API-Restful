const mongoose = require('mongoose');
const { Schema } = mongoose;

const schema = Schema({
    user: {
        type: new mongoose.Schema({
            name: String,
            email: String
        }),
        required: true
    },
    car: {
        type: new mongoose.Schema({
            model: String
        }),
        required: true
    },
    price: Number,
    date: { type: Date, default: Date.now }
});

module.exports.SaleModel = mongoose.model('Sale', schema);
module.exports.saleSchema = schema;