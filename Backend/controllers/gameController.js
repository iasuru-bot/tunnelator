const Game = require('../models/gameModel');
const Player = require('../models/playerModel');
const { io } = require('../server');

const games = {}; // Stocke toutes les parties en mémoire

// Créer une nouvelle partie (présentateur)
const createGame = (req, res) => {
  const { presenterName, categories } = req.body;
  const gameId = `game_${Date.now()}`;
  const presenter = new Player(`presenter_${Date.now()}`, presenterName, 'presenter');
  const newGame = new Game(gameId, presenter, categories);
  games[gameId] = newGame;
  res.status(201).json({ gameId, message: 'Game created', presenter });
};

// Rejoindre une partie (joueur)
const joinGame = (req, res) => {
  const { gameId, playerName } = req.body;
  const game = games[gameId];
  if (!game) {
    return res.status(404).json({ message: 'Game not found' });
  }
  const playerId = `player_${Date.now()}`;
  const newPlayer = new Player(playerId, playerName, 'player');
  game.addPlayer(newPlayer);
  res.status(200).json({ playerId, message: 'Player joined' });

  // Notification en temps réel
  io.emit('playerJoined', { gameId, players: game.players });
};

// Poser une question (présentateur)
const askQuestion = (req, res) => {
  const { gameId } = req.params;
  const { categoryId, question } = req.body;
  const game = games[gameId];
  if (!game) {
    return res.status(404).json({ message: 'Game not found' });
  }

  // Envoie la question en temps réel à tous les joueurs
  io.emit('newQuestion', { gameId, categoryId, question });
  res.status(200).json({ message: 'Question sent' });
};

// Choisir une catégorie (joueur)
const selectCategory = (req, res) => {
  const { gameId } = req.params;
  const { playerId, categoryId } = req.body;
  const game = games[gameId];
  if (!game) {
    return res.status(404).json({ message: 'Game not found' });
  }

  const player = game.players.find((p) => p.id === playerId);
  if (!player) {
    return res.status(404).json({ message: 'Player not found' });
  }

  // Notifie le présentateur de la catégorie choisie
  io.emit('categorySelected', { gameId, categoryId, playerName: player.name });
  res.status(200).json({ message: 'Category selected' });
};

// Répondre à une question (joueur)
const answerQuestion = (req, res) => {
  const { gameId } = req.params;
  const { playerId, isCorrect, points } = req.body;
  const game = games[gameId];
  if (!game) {
    return res.status(404).json({ message: 'Game not found' });
  }

  const player = game.players.find((p) => p.id === playerId);
  if (!player) {
    return res.status(404).json({ message: 'Player not found' });
  }

  // Mise à jour du score
  if (isCorrect) {
    player.addScore(points);
  }

  // Mise à jour en temps réel du classement
  io.emit('leaderboardUpdate', game.getLeaderboard());
  res.status(200).json({ newScore: player.score });
};

// Obtenir le classement
const getLeaderboard = (req, res) => {
  const { gameId } = req.params;
  const game = games[gameId];
  if (!game) {
    return res.status(404).json({ message: 'Game not found' });
  }
  res.status(200).json({ leaderboard: game.getLeaderboard() });
};

// Terminer la partie (présentateur)
const endGame = (req, res) => {
  const { gameId } = req.params;
  const game = games[gameId];
  if (!game) {
    return res.status(404).json({ message: 'Game not found' });
  }
  const winner = game.getLeaderboard()[0];
  delete games[gameId]; // Supprime la partie
  res.status(200).json({ winner, message: 'Game ended' });
};

module.exports = { createGame, joinGame, askQuestion, answerQuestion, getLeaderboard, endGame, selectCategory };
