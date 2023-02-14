const service = require('./service');

const Schema = require('mongoose').Schema;

const serviceSchema = new Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true, default: 0 },
    element: { type: Schema.Types.ObjectId, ref: 'Element' },
}, {
    timestamps: true
});

module.exports = serviceSchema;