// comments.js

const Comment = require('../models/comment');

module.exports = (app) => {

	// CREATE Comment
    app.post('/reviews/:reviewId/comments', (req, res) => {
        Comment.create(req.body)
        .then(comment => {
            console.log(comment);
            res.redirect(`/reviews/${req.params.reviewId}`);
        })
        .catch((err) => {
            console.log(err.message);
        });
    });

    // DELETE
    app.delete('/reviews/:reviewId/comments/:id', function (req, res) {
        Comment.findByIdAndRemove(req.params.id)
        .then(comment => {
            res.redirect(`/reviews/${req.params.reviewId}`);
        })
        .catch((err) => {
            console.log(err.message);
        })
    })

}

