const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    productInfo: {
        type: Array,
        required: true
    },
    deliveryOption: {
        type: String,
        required: true
    },
    address: {
        type: String,
    },
    city: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true
    },
    zip: {
        type: String,
        required: true
    },
    country: {
        type: String,
        required: true
    },
    subTotal: {
        type: Number,
        required: true
    },
    tax: {
        type: Number,
        required: true
    },

    deliveryFee: {
        type: Number,
        required: true
    },

    totalCost: {
        type: Number,
        required: true
    },

    orderStatus: {
        type: String,
        
    },

    paymentMethod: {
        type: String,
        
    },

    paymentStatus: {
        type: String,
    },

    OrderDate: {
        type: Date,
        default: Date.now
    }
    
})

const Order = mongoose.model('Order', orderSchema);
module.exports = Order;