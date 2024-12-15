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
app.use(cors({
  origin: (origin, callback) => {
    if (!origin || /^http:\/\/192\.168\.\d+\.\d+(:\d+)?$/.test(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
}));

io.on("connection", (socket) => {
  console.log("Un utilisateur est connecté");

  // Écoute de l'événement 'requestData'
  socket.on('requestData', () => {
    // Simulez des données à renvoyer
    const data = ['Donnée 1', 'Donnée 2', 'Donnée 3'];
    socket.emit('dataResponse', data);
  });
  socket.on("join", (name) => {
    console.log(`${name} a rejoint`);
    socket.broadcast.emit("users", [name]); // Envoie à tous sauf l'émetteur
  });

  socket.on("disconnect", () => {
    console.log("Un utilisateur s'est déconnecté");
  });
});

// Lancer le serveur
server.listen(3000, () => {
  console.log("Serveur démarré sur le port 3000");
});


// const express = require('express');
// const cors = require('cors');
// const http = require('http');
// const { Server } = require('socket.io');
// const gameRoutes = require('./routes/gameRoutes');

// const app = express();
// const server = http.createServer(app);
// const io = new Server(server, {
//   cors: {
//     origin: '*', // Remplace "*" par le domaine autorisé si nécessaire
//     methods: ['GET', 'POST'],
//   },
// });

// // Middleware
// app.use(cors());
// app.use(express.json());

// // Routes
// app.use('/game', gameRoutes);

// // Socket.IO events
// io.on('connection', (socket) => {
//   console.log(`User connected: ${socket.id}`);

//   socket.on('disconnect', () => {
//     console.log(`User disconnected: ${socket.id}`);
//   });
// });

// // Export pour utilisation dans d'autres fichiers
// module.exports = { server, io };

// // Démarrer le serveur
// const PORT = 3000;
// server.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
