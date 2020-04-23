const express = require('express')
const methodOverride = require('method-override')
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
var exphbs = require('express-handlebars');

const app = express()

app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('_method')); // override with POST having ?_method=DELETE or ?_method=PUT

const reviews = require('./controllers/reviews')(app);
const comments = require('./controllers/comments')(app);
const movies = require('./controllers/movies')(app);

mongoose.connect(
	process.env.MONGODB_URI || 'mongodb://localhost/rotten-potatoes', {
		useNewUrlParser: true,
		useUnifiedTopology: true
	}
);

app.listen(process.env.PORT || 3000, () => {
  console.log('App listening on port 3000!');
})

module.exports = app;
