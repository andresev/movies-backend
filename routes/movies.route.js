const express = require('express');

const router = express.Router(); //get access to express router

router.get('/', (req, res) => {
  res.send('hello world');
});

module.exports = router;
