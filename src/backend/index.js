const express = require('express');
const mongoose = require('mongoose');
const user = require('./Models/user');
require('dotenv').config();
const app = express();
const port = 3000;
const userRoute = require('./Routes/userRoute');
const order = require('./Models/order');
const orderRoute = require('./Routes/orderRoute');
const menuItemRoute = require('./Routes/menuItemRoute');

mongoose.connect(process.env.MONGODB_URL,
    {
        useNewUrlParser: true, 
        useUnifiedTopology: true, 
        serverSelectionTimeoutMS: 30000
    }
)
.then(() => {
    console.log('Connected to MongoDB');
})
.catch((err) => {
    console.log('Failed to connect to MongoDB', err);
});

app.use(express.json());

app.use('/users', userRoute);

app.use('/orders', orderRoute);

app.use('/menuItems',menuItemRoute);

app.listen(port, () => {    
    console.log("Server is running on port 3000");
});
