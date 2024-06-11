require("dotenv").config();
const express = require("express");
const cors = require("cors");
require('./config/database');
const User = require('./models/user.model');
const Order = require('./models/order.model');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.send('Server is working well')
})

app.post('/signup', async (req, res) => {

    const { name, email, password } = req.body;
    try {
        if (!name || !email || !password) {
            return res.status(400).send({
                status: 400,
                success: false,
                message: "Please provide name, email and password for signup",
            })
        }
        const findUser = await User.findOne({ email });
        if (findUser) {
            return res.status(400).send({
                status: 400,
                success: false,
                message: "User already exists",
            })
        }
        if (password.length < 6) {
            return res.status(400).send({
                status: 400,
                success: false,
                message: "Password must be at least 6 characters",
            })
        }
        const newUser = new User({
            name,
            email,
            password
        })
        await newUser.save();
        res.status(200).send({
            status: 200,
            success: true,
            message: "Order created successfully",
        })
    }
    catch (err) {
        res.status(500).send({
            status: 500,
            success: false,
            message: "Server error",
        })
        console.log(err);
    }
})

app.post('/login', async (req, res) => {

    const { email, password } = req.body;
    try {
        if (!email || !password) {
            return res.status(400).send({
                status: 400,
                success: false,
                message: "Please provide email and password for login",
            })
        }
        const findUser = await User.findOne({ email });
        if (!findUser) {
            return res.status(400).send({
                status: 400,
                success: false,
                message: "User does not exist",
            })
        }
        if (password != findUser.password) {
            return res.status(400).send({
                status: 400,
                success: false,
                message: "Incorrect password",
            })
        }
        res.status(200).send({
            status: 200,
            success: true,
            message: "Login successful",
            data: {
                userId: findUser._id,
                name: findUser.name,
                email: findUser.email
            }
        })
    }
    catch (err) {
        res.status(500).send({
            status: 500,
            success: false,
            message: "Server error",
        })
        console.log(err);
    }
})

app.post('/order', async (req, res) => {

    const { userId, name, email, productInfo, deliveryOption, address, city, state, zip, country, subTotal, deliveryFee, tax, totalCost } = req.body;
    try {
        if (!userId || !name || !email || !productInfo || !deliveryOption || !address || !city || !state || !zip || !country) {
            return res.status(400).send({
                status: 400,
                success: false,
                message: "Please provide all required fields",
            })
        }
        
        const newOrder = new Order({
            userId,
            name,
            email,
            productInfo,
            deliveryOption,
            address,
            city,
            state,
            zip,
            country,
            subTotal,
            deliveryFee,
            tax,
            totalCost,
            orderStatus: "pending",
            paymentStatus: "Unpaid",
            paymentMethod: "COD",
        })
        await newOrder.save();
        res.status(200).send({
            status: 200,
            success: true,
            message: "Order created successfully",
            orderID: newOrder._id
        })
    }
    catch (err) {
        res.status(500).send({
            status: 500,
            success: false,
            message: "Server error",
        })
        console.log(err);
    }
});


app.get('/orders/:UserId', async (req, res) => {
    const userID = req.params.UserId
    
    const orders = await Order.find({ userId: userID })
    try {
        if (!orders) {
            return res.status(400).send({
                status: 400,
                success: false,
                message: "No orders found",
            })
        }
        res.send({
            status: 200,
            success: true,
            message: "Orders fetched successfully",
            orders
           
        })
        
    }
    catch (err) {
        res.status(500).send({
            status: 500,
            success: false,
            message: "Server error",
        })
        console.log(err);
    }
})

app.get('/order-details/:orderId', async (req, res) => {
    const orderID = req.params.orderId
        
    const order = await Order.findOne({ _id: orderID })
    try {
        if (!order) {
            return res.status(400).send({
                status: 400,
                success: false,
                message: "No order found",
            })
        }
        res.send({
            status: 200,
            success: true,
            message: "Order fetched successfully",
            order
           
        })
        
    }
    catch (err) {
        res.status(500).send({
            status: 500,
            success: false,
            message: "Server error",
        })
        console.log(err);
    }
})

module.exports = app;