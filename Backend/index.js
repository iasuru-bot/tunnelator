const express = require("express");
const app = express();
const http = require("http").createServer(app);
const io = require("socket.io")(http);

const users = [];

io.on("connection", (socket) => {
  console.log("Nouvel appareil connecté");

  socket.on("join", (name) => {
    users.push(name);
    io.emit("users", users);
  });

  socket.on("disconnect", () => {
    console.log("Appareil déconnecté");
  });
});

app.get("/", (req, res) => {
  res.send("Serveur en ligne !");
});

http.listen(3000, () => {
  console.log("Serveur démarré sur le port 3000");
});