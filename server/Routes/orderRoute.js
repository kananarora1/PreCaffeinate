const router = require("express").Router();
const orderController = require('../Controllers/orderController');

router.post('/createOrder', orderController.postOrder);

router.get('/', orderController.getOrders);

router.get('/:id', orderController.getOrderById);

module.exports = router;