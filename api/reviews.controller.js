const { response } = require('express');
const ReviewsDAO = require('../dao/moviesDAO');

class ReviewsController {
  static async apiPostReview(req, res) {
    try {
      const movieId = req.body.movie_id;
      const review = req.body.review;
      const userInfo = {
        name: req.body.user_name,
        _id: req.body.user_id,
      };
      const date = new Date();
      const ReviewResponse = await ReviewsDAO.addReview(
        movieId,
        review,
        userInfo,
        date
      );

      res.json({ status: 'success' });
    } catch (e) {
      return res.status(500).json({ error: e.message });
    }
  }
}

module.exports = ReviewsController;
