const express = require('express');
const { createGame, joinGame, askQuestion, answerQuestion, getLeaderboard, endGame, selectCategory } = require('../controllers/gameController');

const router = express.Router();

// Créer une partie
router.post('/create', createGame);

// Rejoindre une partie
router.post('/join', joinGame);

// Présentateur : poser une question
router.post('/:gameId/presenter/question', askQuestion);

// Joueur : choisir une catégorie
router.post('/:gameId/player/select-category', selectCategory);

// Joueur : répondre à une question
router.post('/:gameId/player/answer', answerQuestion);

// Obtenir le classement
router.get('/:gameId/leaderboard', getLeaderboard);

// Présentateur : terminer la partie
router.post('/:gameId/presenter/end', endGame);

module.exports = router;
