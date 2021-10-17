const mongoose = require('mongoose');
const { Schema } = mongoose;

const schema = Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        autopopulate: { select: 'name email' },
        required: true
    },
    car: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Car',
        autopopulate: { select: 'model' },
        required: true,
    },
    price: Number,
    date: { type: Date, default: Date.now }
});

// Auto-populate para referencia con otro documento
schema.plugin(require('mongoose-autopopulate'));
module.exports.SaleModel = mongoose.model('Sale', schema);
module.exports.saleSchema = schema;