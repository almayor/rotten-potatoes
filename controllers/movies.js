// movies.js

const API_KEY = "d6d213e27bfb10d52d43288fb95ef788"
const Review = require('../models/review')

module.exports = function(app) {

    const MovieDb = require('moviedb-promise');
    const moviedb = new MovieDb(API_KEY);

    // INDEX
    app.get('/', (req, res) => {
        if (req.query.page === undefined)
            res.redirect("/?page=1")
        else if (req.query.page <= 0 || req.query.page >= 1000)
            res.status(400).send("Only pages between 1-1000 are accepted");
        else {
            moviedb.miscNowPlayingMovies({
                    page: req.query.page
                })
                .then(movies => {
                    res.render('movies-index', {
                        movies: movies.results,
                        page: req.query.page
                    });
                })
                .catch(console.error)
        }
    })

    // SHOW
    app.get('/movies/:id', (req, res) => {
        Promise.all([
                moviedb.movieInfo({
                    id: req.params.id
                }),
                moviedb.movieTrailers({
                    id: req.params.id
                }),
                Review.find({
                    movieId: req.params.id
                }).lean()
            ])
            .then(responses => {
                const [movie, videos, reviews] = responses;
                movie.trailer_youtube_id = (
                    videos.youtube[0] &&
                    videos.youtube[0].source
                );
                res.render('movies-show', {
                    movie: movie,
                    reviews: reviews
                });
            })
            .catch(console.error)
    })

    // NEW REVIEW
    app.get('/movies/:id/reviews/new', (req, res) => {
        moviedb.movieInfo({
                id: req.params.id
            })
            .then(movie => {
                res.render('reviews-new', {
                    movieId: req.params.id,
                    movieTitle: movie.title
                });
            })
            .catch(console.error)
    });

    // CREATE REVIEW
    app.post('/movies/:id/reviews', (req, res) => {
        Review.create(req.body)
            .then(review => {
                console.log(review);
                res.redirect(`/reviews/${review._id}`);
            })
            .catch(err => console.log(err.message))
    });
}