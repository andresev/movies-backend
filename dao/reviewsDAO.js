const mongodb = require('mongodb');

const ObjectId = mongodb.ObjectId;

let reviews;

class ReviewsDAO {
  static async injectDB(conn) {
    if (reviews) {
      return;
    }

    try {
      reviews = await conn.db(MOVIEWREVIEWS_NS).collection('reviews');
    } catch (e) {
      console.error(
        'Unable to establish connection handle in reviewsDAO: ' + e
      );
    }
  }

  static async addReview(movieId, user, review, date) {
    try {
      const reviewDoc = {
        name: user.name,
        user_id: user.id,
        date: date,
        review: review,
        movie_id: ObjectId(movieId),
      };
      return await reviews.insertOne(reviewDoc);
    } catch (e) {
      console.error('We are unable to add review ' + e);
      return { error: e };
    }
  }

  static async updateReview(movieId, userId, review, date) {
    try {
      const updateResponse = await reviews.updateOne(
        { user_id: user_id, _id: ObjectId(reviewId) },
        { $set: { review: review, date: date } }
      );
      return updateResponse;
    } catch (e) {
      console.error('Unable to update review ' + e);
      return { error: e };
    }
  }

  static async deleteReview(reviewId, userId) {
    try {
      const deleteResponse = await reviews.deleteOne({
        _id: ObjectId(reviewId),
        user_id: userId,
      });
      return deleteResponse;
    } catch (e) {
      console.error('Unable to delete review ' + e);
      return { error: e };
    }
  }
}
