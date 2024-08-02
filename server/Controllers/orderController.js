const order = require('../Models/order');
// const user = require('../Models/user');

// Create a new order
exports.postOrder = async (req, res) => {
    try{
        const menuItem = await MenuItem.findById(req.body.orderedItem);
        if(!menuItem){
            return res.status(404).json({ message: "Menu item not found" });
        }
        const newOrder = new order({
            orderedItem: req.body.orderedItem,
            orderedItemQuantity: req.body.orderedItemQuantity,
            orderedBy: req.body.orderedBy,
            orderPrice: menuItem.price
        
        });
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

// Get all orders of a user

exports.getOrderByUserId = async (req, res) => {
    const orders = await order.find({ orderedBy: req.params.userId });
    return res.status(200).json(orders);
}