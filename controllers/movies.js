// movies.js

const API_KEY = "d6d213e27bfb10d52d43288fb95ef788"
const Review = require('../models/review')

module.exports = function (app) {

	const MovieDb = require('moviedb-promise');
	const moviedb = new MovieDb(API_KEY);

    app.get('/', (req, res) => {
        Promise.all([
            moviedb.miscNowPlayingMovies(),
            moviedb.genreMovieList(),
        ])
        .then(responses => {
        	const movies = responses[0].results;
        	const genreList = responses[1].genres;
        	const genreMap = Object.fromEntries(
        		genreList.map(genre => [genre.id, genre.name])
        	);

        	for (let i = 0; i < movies.length; i++)
                movies[i].genre_names = movies[i].genre_ids.map(id => genreMap[id]);

        	res.render('movies-index', { movies: movies });
        })
        .catch(console.error)
    })

    app.get('/movies/:id', (req, res) => {
        Promise.all([
            moviedb.movieInfo({ id: req.params.id }),
            moviedb.movieTrailers({ id: req.params.id }),
            Review.find({ movieId: req.params.id }).lean()
        ])
        .then(responses => {
            const [movie, videos, reviews] = responses;
            movie.trailer_youtube_id = videos.youtube[0].source;
            res.render('movies-show', { movie: movie, reviews: reviews });
        })
        .catch(console.error)
    })
}
