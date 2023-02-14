const mongoose = require('mongoose');

require('./element');

const serviceSchema = require('./serviceSchema');

module.exports = mongoose.model('Service', serviceSchema);