const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const productSchema = require('./productSchema')
const serviceSchema = require('./serviceSchema')

const lineProdSchema = new Schema({
    qty: { type: Number, default: 1 },
    item: productSchema
}, {
    timestamps: true,
    toJSON: { virtuals: true }
});

lineProdSchema.virtual('extPrice').get(function() {
    return this.qty * this.product.price;
})

const orderSchema = new Schema({
    name: { type: String, required: true },
    sortOrder: Number
}, {
    timestamps: true
});

module.exports = mongoose.model('Order', orderSchema);