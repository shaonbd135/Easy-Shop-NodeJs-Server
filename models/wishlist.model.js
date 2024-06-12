const mongoose = require('mongoose');

const wishlistSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    productId: {
        type: String,
        required: true
    }
});
const Wishlist = mongoose.model('Wishlist', wishlistSchema);
module.exports = Wishlist