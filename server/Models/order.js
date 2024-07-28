const mongoose = require('mongoose');
const userSchema = require('./user');
const menuItemSchema = require('./menuItem');

const orderSchema = new mongoose.Schema({
    orderedItem:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'MenuItem',
        required: true
    },
    orderedItemQuantity:{
        type: Number,
        required: true,
        default: 1
    },
    orderedBy:{
        type: mongoose.Schema.Types.ObjectId,
        ref: userSchema,
        required: true
    },
    orderDate:{
        type: Date,
        default: Date.now
    },
    orderPrice:{
        type: mongoose.Schema.Types.Decimal128,
        ref : menuItemSchema,
        required: true
    },
    orderStatus:{
        type: String,
        enum: ['ordered', 'preparing', 'completed'],
        default: 'ordered'
    }
});

module.exports = mongoose.model('order', orderSchema);