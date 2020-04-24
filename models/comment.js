// comment.js

// imports `mongoose`. We need `mongoose` here to create the new model.
const mongoose = require('mongoose')
const Schema = mongoose.Schema

//similar to the Review model with the difference that the Comment model only saves a `title` and `content`.
const Comment = mongoose.model('Comment', {
  title: String,
  content: String,
  reviewId: { type: Schema.Types.ObjectId, ref: 'Review', required: true },
  date: { type: Date, default: Date.now }
});

// exports the `Comment` object. By doing this you can import `Comment` into any of your other files.
module.exports = Comment
