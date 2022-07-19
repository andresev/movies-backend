const MoviesController = require('../api/movies.controller');
const ReviewsController = require('../api/reviews.controller');
const express = require('express');

const router = express.Router(); //get access to express router

router.get('/', (req, res) => {
  MoviesController.apiGetMovies(req, res);
});

router
  .post('/review', (req, res) => {
    ReviewsController.apiPostReview(req, res);
  })
  .put('/review', (req, res) => {
    ReviewsController.apiUpdateReview(req, res);
  })
  .delete('/review', (req, res) => {
    ReviewsController.apiDeleteReview(req, res);
  });

module.exports = router;
