const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const productSchema = require('./productSchema')
//const serviceSchema = require('./serviceSchema')

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

// const lineSvcSchema = new Schema({
//     qty: { type: Number, default: 1 },
//     item: serviceSchema
// }, {
//     timestamps: true,
//     toJSON: { virtuals: true }
// })

// lineSvcSchema.virtual('extPrice').get(function() {
//     return this.qty * this.service.price;
// })

const orderSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User'},
    lineItems: [lineProdSchema], //lineSvcSchema],
    isPaid: { type: Boolean, required: false },
    sortOrder: Number
}, {
    timestamps: true,
    toJSON: { virtuals: true }
});

orderSchema.virtual('orderTotal').get(function() {
    return (
        this.lineItems.reduce((total, product) => total + product.extPrice, 0)
       //this.lineItems.reduce((total, service) => total + service.extPrice, 0)
        )
});

orderSchema.virtual('totalQty').get(function() {
    return (
        this.lineItems.reduce((total, product) => total + product.qty, 0)
        //this.lineItems.reduce((total, service) => total + service.qty, 0)
    )
});

orderSchema.virtual('orderId').get(function() {
    return this.id.slice(-6).toUpperCase();
});

orderSchema.statics.getCart = function(userId) {
    return this.findOneAndUpdate(
      { user: userId, isPaid: false },
      { user: userId },
      { upsert: true, new: true }
    );
};

orderSchema.methods.addProdToCart = async function(productId) {
    const cart = this;
    const lineItem = cart.lineItems.find(lineItem => lineItem.product._id.equals(productId));
    if (lineItem) {
      lineItem.qty += 1;
    } else {
      const product = await mongoose.model('Product').findById(productId);
      cart.lineItems.push({ product });
    }
    return cart.save();
};

orderSchema.methods.setProdQty = function(productId, newQty) {
    const cart = this;
    const lineItem = cart.lineItems.find(lineItem => lineItem.product._id.equals(productId));
    if (lineItem && newQty <= 0) {
      lineItem.remove();
    } else if (lineItem) {
      lineItem.qty = newQty;
    }
    return cart.save();
};


module.exports = mongoose.model('Order', orderSchema);