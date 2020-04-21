const express = require('express')
const app = express()
const methodOverride = require('method-override')
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
var exphbs = require('express-handlebars');

app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('_method')); // override with POST having ?_method=DELETE or ?_method=PUT

const reviews = require('./controllers/reviews')(app);

mongoose.connect('mongodb://localhost/rotten-potatoes', {
	useNewUrlParser: true,
	useUnifiedTopology: true
});

app.listen(3000, () => {
  console.log('App listening on port 3000!');
})
