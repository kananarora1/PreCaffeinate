const mongoose = require('mongoose');

const menuItemSchema = new mongoose.Schema({
    itemName:{
        type:String,
        required:true
    },
    itemPrice:{
        type:Number,
        required:true
    },
    itemCategory:{
        type:String,
        required:true
    },
    itemDescription:{
        type:String,
        required:true
    },
    itemImage:{
        type:String,
        required:true
    }
});

module.exports = mongoose.model('menuitem', menuItemSchema) || mongoose.models.menuItem;