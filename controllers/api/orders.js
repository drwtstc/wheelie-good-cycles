const Order = require('../../models/order');

module.exports = {
    cart,
    addToCart,
    setProdQtyInCart,
    checkout,
    history
};

async function cart(req, res) {
    const cart = await Order.getCart(req.user._id);
    res.json(cart);
}

async function addToCart(req, res) {
    console.log(req.user)
    const cart = await Order.getCart(req.user._id);
    console.log(cart)
    await cart.addProdToCart(req.params.id);
    res.json(cart);
}

async function setProdQtyInCart(req, res) {
    const cart = await Order.getCart(req.user._id);
    await cart.setProdQty(req.body.productId, req.body.newQty)
    res.json(cart)
}

async function checkout(req, res) {
    const cart = await Order.getCart(req.user._id)
    cart.isPaid = true;
    await cart.save();
    res.json(cart);
}

async function history(req, res) {
    const orders = await Order
      .find({ user: req.user._id, isPaid: true })
      .sort('-updatedAt').exec();
    res.json(orders);
  }