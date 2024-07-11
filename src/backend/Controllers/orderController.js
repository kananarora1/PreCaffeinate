const order = require('../Models/order');
// const user = require('../Models/user');

// Create a new order
exports.postOrder = async (req, res) => {
    try{
    const newOrder = new order(req.body);
    await newOrder.save();
    res.json({ message: "Order placed successfully" });
}
catch(error){
    res.json({message: "Not able to place order " + error});
}
};

// Get all orders of a user
exports.getOrders = async (req, res) => {
    const orders = await order.find({ orderedBy: req.params.userId });
    return res.status(200).json(orders);
};

// Get order by id
exports.getOrderById = async (req, res) => {
    const orderById = await order.findById(req.params.orderId);
    return res.status(200).json(orderById);
};