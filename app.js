const express = require('express')
const app = express()
const methodOverride = require('method-override')
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));

app.listen(3000, () => {
  console.log('App listening on port 3000!');
})

var exphbs = require('express-handlebars');

app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

app.get('/', (req, res) => {
  Review.find()
  	.lean()
    .then(reviews => {
      res.render('reviews-index', { reviews: reviews });
    })
    .catch(err => {
      console.log(err);
    })
})

// OUR MOCK ARRAY OF PROJECTS
let reviews = [
  { title: "Great Review", movieTitle: "Batman II" },
  { title: "Awesome Movie", movieTitle: "Titanic" },
  { title: "Amazing", movieTitle: "Brokeback Mountain" }
]

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/rotten-potatoes', {
	useNewUrlParser: true,
	useUnifiedTopology: true
});

const Review = mongoose.model('Review', {
  title: String,
  description: String,
  rating: Number,
  movieTitle: String,
});

// NEW
app.get('/reviews/new', (req, res) => {
  res.render('reviews-new', {title: "New Review"});
});

app.post('/reviews', (req, res) => {
  Review.create(req.body).then((review) => {
    console.log(review);
    res.redirect(`/reviews/${review._id}`);
  }).catch((err) => {
    console.log(err.message);
  })
});

// SHOW
app.get('/reviews/:id', (req, res) => {
  Review.findById(req.params.id)
  .lean()
  .then((review) => {
    res.render('reviews-show', { review: review })
  }).catch((err) => {
    console.log(err.message);
  })
});

// EDIT
app.get('/reviews/:id/edit', (req, res) => {
  Review.findById(req.params.id)
  .lean()
  .then((review) => {
    res.render('reviews-edit', {review: review, title: "Edit Review"});
  }).catch((err) => {
    console.log(err.message);
  })
});

// override with POST having ?_method=DELETE or ?_method=PUT
app.use(methodOverride('_method'));

// UPDATE
app.put('/reviews/:id', (req, res) => {
  Review.findByIdAndUpdate(req.params.id, req.body)
  	.lean()
    .then(review => {
      res.redirect(`/reviews/${review._id}`)
    })
    .catch(err => {
      console.log(err.message)
    })
})
