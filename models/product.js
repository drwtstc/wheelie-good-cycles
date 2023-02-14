const mongoose = require('mongoose');

require('./element');

const productSchema = require('./productSchema');

module.exports = mongoose.model('Product', productSchema);