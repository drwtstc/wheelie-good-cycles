const product = require('./product');

const Schema = require('mongoose').Schema;

const productSchema = new Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true, default: 0 },
    color: { type: String, required: true },
    year: Number,
    discipline: String,
    brand: String,
    model: String,
    department: String,
    element: { type: Schema.Types.ObjectId, ref: 'Element' }
}, {
    timestamps: true
});

module.exports = productSchema;