// movies.js

const API_KEY = "d6d213e27bfb10d52d43288fb95ef788"

module.exports = function (app) {

    const MovieDb = require('moviedb-promise')
    const moviedb = new MovieDb(API_KEY)

    app.get('/', (req, res) => {
        moviedb.miscNowPlayingMovies()
        .then(response => {
            res.render('movies-index', { movies: response.results });
        })
        .catch(console.error)
    })

}
