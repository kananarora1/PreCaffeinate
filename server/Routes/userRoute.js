const router = require("express").Router();
const userController = require('../Controllers/userController');
const userModel = require('../Models/user');

router.post('/register', userController.registerUser);

router.post('/login', userController.loginUser);

router.get('/', userController.getAllUsers);

module.exports = router;