const menuitem = require('../Models/menuitem');

exports.postMenuItem = async (req, res) => {
    try{
    const newMenuItem = new menuitem(req.body);
    await newMenuItem.save();
    res.json({ message: "Menu item created successfully" });
}
catch(error){
    res.json({message: "Not able to create menu item " + error});
}
};

exports.getMenuItems = async (req, res) => {
    const menuItems = await menuitem.find();
    return res.status(200).json(menuItems);
};

exports.getMenuItemById = async (req, res) => { 
    const menuItemById = await menuitem.findById(req.params.id);
    return res.status(200).json(menuItemById);
};

exports.updateMenuItem = async (req, res) => {
    try{
    await menuitem.findByIdAndUpdate(req.params.id, req.body);
    res.json({ message: "Menu item updated successfully" });
}
catch(error){
    res.json({message: "Not able to update menu item " + error});
}
};

exports.deleteMenuItem = async (req, res) => {
    try{
    await menuitem.findByIdAndDelete(req.params.id);
    res.json({ message: "Menu item deleted successfully" });
}
catch(error){
    res.json({message: "Not able to delete menu item " + error});
}
};

