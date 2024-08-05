const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Place' },
    rating: { type: Number, required: true, min: 1, max: 5 },
    text: { type: String, required: true }
});

const Review = mongoose.model('Review', reviewSchema);
module.exports = Review;
