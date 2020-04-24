// comments.js

const Comment = require('../models/comment');

module.exports = (app) => {

	// CREATE Comment
    app.post('/reviews/:reviewId/comments', (req, res) => {
        Comment.create(req.body)
        .then(comment => {
            res.status(200).send({ comment: comment });
        })
        .catch((err) => {
            console.log(err);
            res.status(400).send({ err: err })
        })
    });

    // DELETE
    app.delete('/reviews/:reviewId/comments/:id', function (req, res) {
        Comment.findByIdAndRemove(req.params.id)
        .then(comment => {
            console.log("Deleted comment");
            res.status(200).send({ comment: comment });
        })
        .catch((err) => {
            console.log(err.message);
            res.status(400).send({ err: err });
        })
    })

}

