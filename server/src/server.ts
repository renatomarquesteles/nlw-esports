import express from 'express';

const app = express();

// List all games
app.get('/games', (req, res) => {
  return res.json([]);
});

// Create a new Ad
app.post('/ads', (req, res) => {
  return res.status(201).json([]);
});

// List all game ads
app.get('/games/:id/ads', (req, res) => {
  const gameId = req.params.id;

  return res.json([
    { id: 1, name: 'First Ad' },
    { id: 2, name: 'Second Ad' },
    { id: 3, name: 'Third Ad' },
  ]);
});

// Gets discord from an ad
app.get('/ads/:id/discord', (req, res) => {
  const adId = req.params.id;

  return res.json([]);
});

app.listen(3333);
