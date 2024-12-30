const http = require("http");
const { Server } = require("socket.io");
const express = require("express");
const cors = require("cors");

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: (origin, callback) => {
      // Vérifie si l'origine est autorisée
      if (!origin || /^http:\/\/192\.168\.\d+\.\d+(:\d+)?$/.test(origin)) {
        callback(null, true); // Origine acceptée
      } else {
        callback(new Error("Not allowed by CORS")); // Origine refusée
      }
    },
    methods: ["GET", "POST"], // Méthodes autorisées
  },
});

// Middleware pour les routes HTTP
app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || /^http:\/\/192\.168\.\d+\.\d+(:\d+)?$/.test(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
  })
);

const questions = {
  JeuxVidéos: [
    {
      question: "Quel est le principal rival de Mario dans la série de jeux ? ",
      answered: false,
      points: 1,
      pointsClaimed: false,
    },
    {
      question:
        "Dans Minecraft, quel matériau utilise-t-on pour fabriquer un portail vers le Nether ?",
      answered: false,
      points: 1,
      pointsClaimed: false,
    },
    {
      question:
        "Quel jeu mélange le football et des voitures équipées de propulseurs ? ",
      answered: false,
      points: 1,
      pointsClaimed: false,
    },
    {
      question:
        'Dans "League of Legends", comment s\'appelle la carte principale utilisée pour les parties compétitives ? ',
      answered: false,
      points: 2,
      pointsClaimed: false,
    },
    {
      question:
        "Quel est le nom complet de la ville où se déroule la majorité de l’action dans GTA V ?",
      answered: false,
      points: 2,
      pointsClaimed: false,
    },
    {
      question:
        "Dans The Legend of Zelda, comment s'appelle l’épée légendaire que Link utilise pour combattre le mal ? ",
      answered: false,
      points: 2,
      pointsClaimed: false,
    },
    {
      question:
        "Devinez le jeu : Un jeu où vous vivez sur une île où le temps est en temps réel, avec des saisons qui changent au fil des mois. Vous interagissez avec une variété d’animaux anthropomorphes et participez à des événements saisonniers uniques pour personnaliser votre environnement.",
      answered: false,
      points: 3,
      pointsClaimed: false,
    },
    {
      question:
        "Quel Pokémon légendaire est connu pour sa capacité de contrôler les tempêtes et est également le gardien des îles ?",
      answered: false,
      points: 3,
      pointsClaimed: false,
    },
    {
      question: "Quel studio est à l’origine de jeux comme Doom et Quake ? ",
      answered: false,
      points: 3,
      pointsClaimed: false,
    },
    {
      question: "dssd",
      answered: false,
      points: 5,
      pointsClaimed: false,
    },
  ],
  Géographie: [
    {
      question: "Quelles sont les couleurs du drapeau de la belgique ?",
      answered: false,
      points: 1,
      pointsClaimed: false,
    },
    {
      question: "Quel océan borde l’Est des États-Unis ?",
      answered: false,
      points: 1,
      pointsClaimed: false,
    },
    {
      question: "Quel est le plus grand pays du monde par superficie ?",
      answered: false,
      points: 1,
      pointsClaimed: false,
    },
    {
      question: "Dans quel pays se trouve le Machu Picchu ?",
      answered: false,
      points: 2,
      pointsClaimed: false,
    },
    {
      question: "Quel est le plus petit pays du monde en superficie ?",
      answered: false,
      points: 2,
      pointsClaimed: false,
    },
    {
      question: "Quelle est la capitale de l’Australie ?",
      answered: false,
      points: 2,
      pointsClaimed: false,
    },
    {
      question: "Quel est le point le plus bas sur Terre ? ",
      answered: false,
      points: 3,
      pointsClaimed: false,
    },
    {
      question: "Dans quel pays se trouve le lac Titicaca ?",
      answered: false,
      points: 3,
      pointsClaimed: false,
    },
    {
      question: "Quel est le plus grand pays d’Afrique par superficie ?",
      answered: false,
      points: 3,
      pointsClaimed: false,
    },
    {
      question: "Quelle mer borde les côtes de la Jordanie et d'Israël ?",
      answered: false,
      points: 5,
      pointsClaimed: false,
    },
  ],
  DessinAnimé: [
    {
      question: "Dans quel dessin animé trouve-t-on le personnage de Mufasa ?",
      answered: false,
      points: 1,
      pointsClaimed: false,
    },
    {
      question:
        "Dans quelle animation un chat tente sans cesse d’attraper un poussin ?",
      answered: false,
      points: 1,
      pointsClaimed: false,
    },
    {
      question:
        "Comment s’appelle la princesse dans La Belle au bois dormant ?",
      answered: false,
      points: 1,
      pointsClaimed: false,
    },
    {
      question:
        "Dans quel film d’animation trouve-t-on des personnages comme Carl et Doug ?",
      answered: false,
      points: 2,
      pointsClaimed: false,
    },
    {
      question: "Quel personnage de Toy Story est un sheriff de cow-boy ?",
      answered: false,
      points: 2,
      pointsClaimed: false,
    },
    {
      question:
        "Comment s’appelle le propriétaire de la centrale nucléaire de Springfield ?",
      answered: false,
      points: 2,
      pointsClaimed: false,
    },
    {
      question: "Quel est le nom des Daltons ?",
      answered: false,
      points: 3,
      pointsClaimed: false,
    },
    {
      question:
        "Quel est le nom du film où les personnages voyagent dans un train à destination du Japon ?",
      answered: false,
      points: 3,
      pointsClaimed: false,
    },
    {
      question: "Quels sont les noms des 4 tortues dans Tortue Ninja ?",
      answered: false,
      points: 3,
      pointsClaimed: false,
    },
    {
      question: "Quels sont les noms des 9 (10) émotions dans vice-versa 2 ?",
      answered: false,
      points: 5,
      pointsClaimed: false,
    },
  ],
  CultureGénérale: [
    {
      question: "Qui a peint la Joconde ?",
      answered: false,
      points: 1,
      pointsClaimed: false,
    },
    {
      question: "Qui a écrit Les Misérables ?",
      answered: false,
      points: 1,
      pointsClaimed: false,
    },
    {
      question: "Quand a eu lieu la prise de la Bastille ? ",
      answered: false,
      points: 1,
      pointsClaimed: false,
    },
    {
      question: "Quel scientifique a formulé la théorie de la relativité ?",
      answered: false,
      points: 2,
      pointsClaimed: false,
    },
    {
      question: "Qui a été le premier président des États-Unis ?",
      answered: false,
      points: 2,
      pointsClaimed: false,
    },
    {
      question: "Qui est le fondateur de Microsoft ?",
      answered: false,
      points: 2,
      pointsClaimed: false,
    },
    {
      question: "Quel est le plus petit os du corps humain ?",
      answered: false,
      points: 3,
      pointsClaimed: false,
    },
    {
      question:
        "Quelle est la substance chimique utilisée pour la photosynthèse chez les plantes ?",
      answered: false,
      points: 3,
      pointsClaimed: false,
    },
    {
      question: "Quelle est l’unité astronomique la plus petite ?",
      answered: false,
      points: 3,
      pointsClaimed: false,
    },
    {
      question:
        "Quelle est la vitesse de la lumière dans le vide en kilomètres par seconde ? (à 5000 km près)",
      answered: false,
      points: 5,
      pointsClaimed: false,
    },
  ],
  Musique: [
    {
      question: "Quel chanteur interprète Billie Jean ?",
      answered: false,
      points: 1,
      pointsClaimed: false,
    },
    {
      question: "Qui interprète Shape of You ?",
      answered: false,
      points: 1,
      pointsClaimed: false,
    },
    {
      question: "Quel est le genre de musique le plus écouté dans le monde ?",
      answered: false,
      points: 1,
      pointsClaimed: false,
    },
    {
      question:
        "De quelle chanson de Maître Gims est tiré cette phrase : “J'ai retrouvé le sourire quand j'ai vu l'bout du tunnel”",
      answered: false,
      points: 2,
      pointsClaimed: false,
    },
    {
      question: "Quel est le nom du groupe qui a chanté We Will Rock You ?",
      answered: false,
      points: 2,
      pointsClaimed: false,
    },
    {
      question:
        "Quel est l’artiste le plus écouté sur Spotify en France en 2024 ?",
      answered: false,
      points: 2,
      pointsClaimed: false,
    },
    {
      question: "Qui a composé la bande originale du film Inception ?",
      answered: false,
      points: 3,
      pointsClaimed: false,
    },
    {
      question:
        "Dans quel film peut-on retrouver la musique “The time of My Life” ?",
      answered: false,
      points: 3,
      pointsClaimed: false,
    },
    {
      question:
        "Continue les paroles (au moins 3 phrases) : Terre brûlée au vent …",
      answered: false,
      points: 3,
      pointsClaimed: false,
    },
    {
      question: "Devine la musique !",
      answered: false,
      points: 5,
      pointsClaimed: false,
    },
  ],
};
const players = {};
const presenter = {};
// Mettre à jour tous les clients avec la liste des joueurs connectés
const broadcastPlayerList = () => {
  const playerNames = Object.values(players).map((player) => player.name);
  io.emit("player_list_update", playerNames);
};

io.on("connection", (socket) => {
  console.log("Un utilisateur est connecté");
  socket.on("join", (data) => {
    const { name } = data;
    players[socket.id] = { name };
    console.log(`Player logged in: ${name} (${socket.id})`);
    broadcastPlayerList();
  });

  socket.on("join_presenter", (data) => {
    const name = "presenter";
    presenter[socket.id] = { name };
    console.log(`Presenter logged in: ${name} (${socket.id})`);
    broadcastPlayerList();
  });

  socket.on("disconnect", () => {
    console.log("Un utilisateur s'est déconnecté");
    delete players[socket.id];
    broadcastPlayerList();
  });
});

app.get("/players", (req, res) => {
  const playerNames = Object.values(players).map((player) => player.name);
  res.json(playerNames);
});

const gameState = {
  participants: [],
  categories: [],
  currentTurn: 0,
  turnInProgress: false,
  inProgress: false,
  scores: {}, // Stockage des scores des joueurs
};

const shuffleArray = (array) => {
  const shuffled = [...array]; // Créer une copie pour éviter de modifier l'original
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1)); // Choisir un index aléatoire entre 0 et i
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]; // Échanger les éléments
  }
  return shuffled;
};

// Fonction pour récupérer la première question non répondue d'une catégorie et vérifier si les points ont été encaissés
const getQuestionsFromCategory = (category) => {
  const categoryQuestions = questions[category] || [];

  // Filtrer les questions non répondues
  const unansweredQuestions = categoryQuestions.filter((q) => !q.answered);

  // Retourner la première question non répondue ou null si aucune
  return unansweredQuestions.length > 0 ? unansweredQuestions[0] : null;
};

const findQuestionIdByName = (category, questionName) => {
  const categoryQuestions = questions[category];
  if (!categoryQuestions) {
    return null; // Si la catégorie n'existe pas
  }

  // Trouver l'index de la question qui correspond au nom
  const questionIndex = categoryQuestions.findIndex(
    (q) => q.question === questionName
  );

  return questionIndex !== -1 ? questionIndex : null; // Retourner l'index ou null si non trouvé
};

// Fonction pour calculer le score jusqu'à une question donnée
const calculerScore = (category, questionIndex) => {
  const categoryQuestions = questions[category] || [];
  let totalScore = 0;

  // Parcourir toutes les questions jusqu'à l'index donné
  for (let i = 0; i <= questionIndex; i++) {
    const question = categoryQuestions[i];
    console.log(question);

    // Vérifier si la question n'a pas encore encaissé ses points
    if (question && !question.pointsClaimed) {
      // Ajouter les points de la question au score total
      totalScore += question.points;

      // Marquer les points comme encaissés
      questions[category][i].pointsClaimed = true;
    }
  }

  console.log(totalScore);

  // Retourner le score total calculé
  return totalScore;
};

const isGameOver = () => {
  // Vérifie si un participant a plus de 25 points
  return Object.values(gameState.scores).some((score) => score > 25);
};

const findKeyByValue = (obj, keyToFind, valueToMatch) => {
  return Object.entries(obj).find(
    ([key, value]) => value[keyToFind] === valueToMatch
  )?.[0];
};

function waitForCategoryChoice(socket) {
  return new Promise((resolve) => {
    socket.once("category_chosen", (data) => {
      resolve(data.category);
    });
  });
}
function waitForContinue(socket) {
  return new Promise((resolve) => {
    socket.once("player_decision", (data) => {
      resolve(data.wantsToContinue);
    });
  });
}
function waitForCorrection(socket) {
  return new Promise((resolve) => {
    socket.once("presenter_response", (data) => {
      resolve(data.isCorrect);
    });
  });
}

// Démarrer le jeu et définir les catégories
app.post("/start-game", (req, res) => {
  // Extraire les joueurs à partir de l'objet `players`
  const playersList = Object.values(players).map((player) => player.name);

  if (!playersList || playersList.length === 0) {
    return res
      .status(400)
      .json({ error: "No players available to start the game" });
  }

  // Initialiser l'état du jeu
  gameState.participants = shuffleArray(playersList);
  gameState.categories = [
    "JeuxVidéos",
    "Géographie",
    "DessinAnimé",
    "CultureGénérale",
    "Musique",
  ];
  gameState.currentTurn = 0;
  gameState.turnInProgress = false;
  gameState.inProgress = true;
  gameState.scores = Object.fromEntries(
    gameState.participants.map((player) => [player, 0])
  );

  // Notifier tous les clients que le jeu a commencé
  io.emit("game_started", {
    categories: gameState.categories,
    players: gameState.participants,
  });

  console.log("jeu started");

  res.json({ message: "Game started successfully", players });

  // Boucle principale du jeu
  runGame();
});

// Fonction principale pour gérer le jeu
const runGame = async () => {
  const presenterKey = findKeyByValue(presenter, "name", "presenter"); // Trouver l'ID du socket du joueur actuel
  const presenterSocket = io.sockets.sockets.get(presenterKey); // Obtenir le socket du joueur spécifique

  //envoie des points à tous les clients
  io.emit("update_scores", { scores: gameState.scores });

  while (gameState.inProgress) {
    //emettre toutes les questions et les categories au presenter pour les afficher comme un tableau
    presenterSocket.emit("categories", { questions });
    console.log("game is in progress", gameState);
    // tour du joueur
    const currentPlayer = gameState.participants[gameState.currentTurn];
    const playerSocketId = findKeyByValue(players, "name", currentPlayer); // Trouver l'ID du socket du joueur actuel
    const playerSocket = io.sockets.sockets.get(playerSocketId); // Obtenir le socket du joueur spécifique

    //maj des categories non terminer

    // Notifier le joueur qu'il est à son tour et qu'il doit choisir une catégorie
    playerSocket.emit("your_turn", {
      categories: gameState.categories,
    });

    // Attendre que le joueur choisisse une catégorie
    const chosenCategory = await waitForCategoryChoice(playerSocket);

    gameState.turnInProgress = true;

    while (gameState.turnInProgress) {
      // get choix categories from joueur
      const question = getQuestionsFromCategory(chosenCategory);
      console.log(question);

      // Envoyer la question et la réponse correcte au présentateur
      presenterSocket.emit("new_question", {
        player: currentPlayer,
        question: question.question,
      });

      // Attendre que le présentateur donne la réponse
      const isCorrect = await waitForCorrection(presenterSocket);
      // si bonne reponse alors envoie au joueur le choix de s'arreter ou de continuer si il rest des questions dans la catégorie
      if (isCorrect) {
        //set questions to answered
        idQuestion = findQuestionIdByName(chosenCategory, question.question);
        questions[chosenCategory][idQuestion].answered = true;

        // if fin d'un tunnel
        var wantToContinue;
        if (
          questions[chosenCategory].length - 1 ==
          findQuestionIdByName(chosenCategory, question.question)
        ) {
          //remove from GameState the category
          gameState.categories = gameState.categories.filter(
            (cat) => cat !== chosenCategory
          );
          wantToContinue = false;
        } else {
          playerSocket.emit("correct_answer", { question });
          // Attendre que le joueur décide de continuer ou de s'arrêter
          wantToContinue = await waitForContinue(playerSocket);
        }

        if (!wantToContinue) {
          gameState.scores[currentPlayer] += calculerScore(
            chosenCategory,
            findQuestionIdByName(chosenCategory, question.question)
          );
          gameState.turnInProgress = false;
        }
        if (isGameOver()) {
          gameState.turnInProgress = false;
        }
      } else {
        playerSocket.emit("wrong_answer", { question });
        gameState.turnInProgress = false;
      }
      presenterSocket.emit("categories", { questions });
    }

    //envoie des points à tous les clients
    io.emit("update_scores", { scores: gameState.scores });

    // Vérifier si la partie est terminée
    if (isGameOver()) {
      gameState.inProgress = false;
      io.emit("game_over", { scores: gameState.scores });
      break;
    }
    gameState.currentTurn =
      (gameState.currentTurn + 1) % gameState.participants.length;
  }
};

// Lancer le serveur
server.listen(3000, () => {
  console.log("Serveur démarré sur le port 3000");
});
