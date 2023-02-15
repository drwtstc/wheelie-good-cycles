const product = require('./product');

const Schema = require('mongoose').Schema;

const productSchema = new Schema({
    name: { type: String, required: true },
    color: { type: String, required: true },
    year: Number,
    discipline: String,
    brand: String,
    model: String,
    department: String,
    element: { type: Schema.Types.ObjectId, ref: 'Element' },
    price: { type: Number, required: true, default: 0 },
}, {
    timestamps: true
});

module.exports = productSchema;