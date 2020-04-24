const mongoose = require('mongoose');

const Comment = require('../models/comment');

const Review = mongoose.model('Review', {
  title: String,
  description: String,
  rating: Number,
  movieTitle: String,
  movieId: {type: String, required: true }
});

module.exports = Review;