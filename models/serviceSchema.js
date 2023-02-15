const service = require('./service');

const Schema = require('mongoose').Schema;

const serviceSchema = new Schema({
    name: { type: String, required: true },
    emoji: String,
    element: { type: Schema.Types.ObjectId, ref: 'Element' },
    price: { type: Number, required: true, default: 0 },
}, {
    timestamps: true
});

module.exports = serviceSchema;