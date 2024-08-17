const order = require('../Models/order');
// const user = require('../Models/user');
const menuItem = require('../Models/menuItem');
const mongoose = require('mongoose');

// Create a new order
exports.postOrder = async (req, res) => {
    try {
        const { orderedItems, orderedBy } = req.body;

        // Fetch menu items in parallel using map and Promise.all
        const menuItems = await Promise.all(
            orderedItems.map(async ({ id }) => {
                const item = await menuItem.findById(id);
                if (!item) {
                    throw new Error(`Menu item with ID ${id} not found`);
                }
                return item;
            })
        );

        // Create order details
        const orderItems = orderedItems.map(({ id, quantity }) => {
            const item = menuItems.find(menuItem => menuItem._id.toString() === id);
            const price = item.itemPrice * quantity;
            return {
                item: id,
                quantity,
                price
            };
        });
        const orderPrice = orderItems.reduce((total, item) => total + item.price, 0); 
        console.log('Total Order Price:', orderPrice);
        // Create and save the order
        const newOrder = new order({
            orderItems,
            orderedBy,
            orderPrice,
            orderStatus: 'ordered'
        });

        await newOrder.save();

        res.send({ 
            message: "Order placed successfully",
            order: newOrder
        });
    } catch (error) {
        console.error('Error placing order:', error.message);
        res.status(500).json({ message: `Not able to place orders: ${error.message}` });
    }
};



// Get order by id
exports.getOrderById = async (req, res) => {
    const orderById = await order.findById(req.params.id);
    try{
        if(!orderById){
            return res.status(404).json({ message: "Order not found" });
        }
        return res.status(200).json(orderById);
    } catch(error){
        res.json({message: "Order not found " + error});
    }
};

exports.updateOrder = async (req, res) => {
    try {
        const { orderStatus } = req.body;
        const validStatuses = ['ordered', 'preparing', 'prepared', 'completed'];
        
        if (!validStatuses.includes(orderStatus)) { 
            return res.status(400).json({ message: 'Invalid status' });
        }

        const Order = await order.findById(req.params.id); 
        if (!Order) return res.status(404).json({ message: 'Order not found' });

        Order.orderStatus = orderStatus;
        await Order.save();
        
        res.json({ message: `Order status updated to ${orderStatus}` });
    } catch (error) {
        res.status(500).json({ message: 'Failed to update order status', error });
    }
};


// Get orders by user ID
exports.getOrderByUserId = async (req, res) => {
    const userId = req.params.userId;
    console.log('Fetching orders for user ID:', userId); // Debugging line

    if (!mongoose.isValidObjectId(userId)) {
        return res.status(400).send('Invalid user ID');
    }

    try {
        const orders = await order.find({ orderedBy: userId });
        res.json(orders);
    } catch (err) {
        console.error('Error fetching orders by user ID:', err);
        res.status(500).send('Internal Server Error');
    }
};

exports.deleteOrders = async (req, res) => {
    try {
        const deletedOrder = await order.deleteOne({ _id: req.params.id });
        res.json(deletedOrder);
    } catch (error) {
        res.json({ message: "Order not found " + error });
    }
};

exports.getAllOrders = async (req, res) => {
    const orders = await order.find();
    return res.status(200).json(orders);
};




