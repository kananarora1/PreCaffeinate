const router = require("express").Router();
const menuItemController = require('../Controllers/menuItemController');
// const menuItemModel = require('../Models/menuitem');

router.post('/createMenuItem', menuItemController.postMenuItem);

router.get('/', menuItemController.getMenuItems);

router.get('/:id', menuItemController.getMenuItemById);

router.patch('/:id', menuItemController.updateMenuItem);

router.delete('/:id', menuItemController.deleteMenuItem);

module.exports = router;