//reviews.js

const Review = require('../models/review');
const Comment = require('../models/comment');

module.exports = function(app) {

	// NEW
	app.get('/movies/:movieId/reviews/new', (req, res) => {
	  res.render('reviews-new', { movieId: req.params.movieId });
	});
	
	// CREATE
	app.post('/movies/:movieId/reviews', (req, res) => {
	  Review.create(req.body)
	  .then(review => {
	    console.log(review);
	    res.redirect(`/movies/${review.movieId}`);
	  })
	  .catch(err => console.log(err.message))
	});

	// SHOW
	app.get('/reviews/:id', (req, res) => {
		Review.findById(req.params.id).lean()
		.then(review => {
	  		Comment.find({ reviewId: req.params.id }).sort('-date').lean()
	  		.then(comments => res.render('reviews-show', {
	  			review: review, comments: comments
	  		}))
	    	.catch((err) => console.log(err.message))
		})
	});

	// EDIT
	app.get('/reviews/:id/edit', (req, res) => {
	  Review.findById(req.params.id).lean()
	  .then(review => res.render('reviews-edit', {
	  	review: review, title: "Edit Review"
	  }))
	  .catch(err => console.log(err.message))
	});

	// UPDATE
	app.put('/reviews/:id', (req, res) => {
	  Review.findByIdAndUpdate(req.params.id, req.body).lean()
	    .then(review => {
	    	res.redirect(`/reviews/${review._id}`);
	    })
	    .catch(err => console.log(err.message))
	})

	// DELETE
	app.delete('/reviews/:id', function (req, res) {
	  Review.findByIdAndRemove(req.params.id)
	  .then(review => {
	  	Comment.deleteMany({ reviewId: review._id }).lean()
	  	.then(comments => console.log(comments))
	  	.catch(err => console.log(err));
	    res.redirect(`/movies/${review.movieId}`);
	  })
	  .catch(err => console.log(err.message))
	})

}
