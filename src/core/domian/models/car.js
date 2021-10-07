const mongoose = require('mongoose');
const { Schema } = mongoose;
const { distributorSchema } = require('./distributor');

const schema = Schema({
    company: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Company',
        autopopulate: { select: 'name country' }
    },
    model: {
        type: String,
        trim: true
    },
    sold: Boolean,
    price: {
        type: Number,
        required: true
    },
    year: {
        type: Number,
        min: 2000,
        max: 2080
    },
    extras: [String],
    distributor: {
        type: distributorSchema,
        required: true
    },
    date: { type: Date, default: Date.now }
});

// Auto-populate para referencia con otro documento
schema.plugin(require('mongoose-autopopulate'));
const CarModel = mongoose.model('Car', schema);
module.exports = CarModel;


