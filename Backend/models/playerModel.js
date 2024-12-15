class Player {
    constructor(id, name, role = 'player') {
      this.id = id;
      this.name = name;
      this.role = role; // "presenter" ou "player"
      this.score = 0;
    }
  
    addScore(points) {
      this.score += points;
    }
  }
  
  module.exports = Player;
  