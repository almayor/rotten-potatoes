const mongoose = require('mongoose');

const Review = mongoose.model('Review', {
  title: String,
  description: String,
  rating: Number,
  movieTitle: String,
});

module.exports = Review;