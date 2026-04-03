const express = require('express');
const router = express.Router();

const map = new Map();
const addMarker = (clientId, position) => {
  const stack = map.get(clientId) || [];
  stack.push(position);
  map.set(clientId, stack);
}
const getMarkers = (clientId) => map.get(clientId) || [];
const clearMarkers = (clientId) => map.delete(clientId);

router.get('/status', function(req, res, next) {
  res.send('OK');
});

router.get('/addmarker', function(req, res, next) {
  const { id, pos } = req.query;
  const position = pos.split('+').map(parseFloat);
  addMarker(id, position);
  res.sendStatus(204);
})

router.get('/connect', function(req, res, next) {
  const { id } = req.query;

  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');

  res.write(`event: connect\n`);
  res.write(`data: OK\n\n`);

  const intervalId = setInterval(() => {
    const markers = getMarkers(id);
    if (markers.length > 0) {
      res.write(`event: addMarker\n`);
      res.write(`data: ${JSON.stringify(markers)}\n\n`);
      clearMarkers(id);
    }
  }, 500);

  req.on('close', () => {
    clearInterval(intervalId);
    res.end();
  });
});

module.exports = router;
