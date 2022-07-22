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

  static async apiUpdateReview(req, res) {
    try {
      const reviewId = req.body.review_id;
      const review = req.body.review;

      const date = new Date();

      const ReviewResponse = await ReviewsDAO.updateReview(
        reviewId,
        review,
        req.body.user_name,
        date
      );

      let { error } = ReviewResponse;
      if (error) {
        res.status.json({ error });
      }

      if (ReviewResponse.modifiedCount === 0) {
        throw new Error(
          'Unable to update review. User may not be original poster'
        );
      }

      res.json({ status: 'success' });
    } catch (e) {
      return res.status(500).json({ error: e.message });
    }
  }

  static async apiDeleteReview(req, res) {
    try {
      const reviewId = req.body.review_id;
    } catch (e) {}
  }
}

module.exports = ReviewsController;
