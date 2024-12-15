class Game {
    constructor(id, presenter, categories) {
      this.id = id;
      this.presenter = presenter; // { id, name }
      this.categories = categories.map((category) => ({
        ...category,
        progression: 0, // Avancement de la catégorie
      }));
      this.players = []; // Liste des joueurs
      this.status = 'waiting'; // waiting, in_progress, ended
    }
  
    addPlayer(player) {
      this.players.push(player);
    }
  
    getLeaderboard() {
      return this.players.sort((a, b) => b.score - a.score);
    }
  
    updateCategoryProgression(categoryId, increment) {
      const category = this.categories.find((cat) => cat.id === categoryId);
      if (category) {
        category.progression += increment;
        return category;
      }
      return null;
    }
  
    isPresenter(userId) {
      return this.presenter.id === userId;
    }
  }
  
  module.exports = Game;
  