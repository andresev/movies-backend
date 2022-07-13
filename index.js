const MoviesDAO = require('./dao/moviesDAO.js');
const app = require('./server.js');

const mongodb = require('mongodb');
const dotenv = require('dotenv');

async function main() {
  dotenv.config();

  const client = new mongodb.MongoClient(process.env.MOVIEREVIEWS_DB_URI);
  const port = process.env.PORT || 8000;

  try {
    //Connect to MongoDB cluster
    await client.connect();
    await MoviesDAO.injectDB(client);

    //run server
    app.listen(port, () => {
      console.log(`Server running on port: ${port}`);
    });
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
}

main().catch(console.error);
