const express = require('express');
const router = express.Router();

router.get('/status', function(req, res, next) {
  res.send('OK');
});

router.get('/addmarker', function(req, res, next) {
  const { pos } = req.query;
  res.sendStatus(204);
})

router.get('/map', function(req, res, next) {
  res.sendStatus(204);
});

module.exports = router;
