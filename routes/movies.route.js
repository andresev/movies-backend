const MoviesController = require('../api/movies.controller');
const express = require('express');

const router = express.Router(); //get access to express router

router.get('/', (req, res) => {
  MoviesController.apiGetMovies(req, res);
});

module.exports = router;
