const mongoose = require('mongoose');
const User = require('./user');
const MenuItem = require('./menuItem'); 

const orderSchema = new mongoose.Schema({
    orderedItem: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'MenuItem', 
        required: true
    },
    orderedItemQuantity: {
        type: Number,
        required: true,
        default: 1
    },
    orderedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    orderDate: {
        type: Date,
        default: Date.now
    },
    orderPrice: {
        type: mongoose.Schema.Types.Decimal128,
        required: true
    },
    orderStatus: {
        type: String,
        enum: ['ordered', 'preparing', 'completed'],
        default: 'ordered'
    }
});

module.exports = mongoose.model('Order', orderSchema); // Export the model, not the schema
