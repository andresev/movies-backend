let movies;

class MoviesDAO {
  static async injectDB(conn) {
    if (movies) {
      return;
    }

    try {
      movies = await conn.db(process.env.MOVIEWREVIEWS_NS).collection('movies');
    } catch (err) {
      console.error('Unable to connect in MOviesDAO: ' + err);
    }
  }

  static async getMovies({
    filters = null,
    page = 0,
    moviesPerPage = 20, // will only get movies per page
  } = {}) {
    let query;
    if (filters) {
      if ('title' in filters) {
        query = { $text: { $search: filters['title'] } };
      } else if ('rated' in filters) {
        query = { $text: { $search: filters['rated'] } };
      }
    }

    let cursor;
    try {
      cursor = await movies
        .find(query)
        .limit(moviesPerPage)
        .skip(page * moviesPerPage);

      const moviesList = await cursor.toArray();
      const totalNumMovies = movies.countDocuments(query);

      return { moviesList, totalNumMovies };
    } catch (err) {
      console.error('Unable to issue find command: ' + err);
      return { moviesList: [], totalNumMovies: 0 };
    }
  }
}

module.exports = MoviesDAO;
