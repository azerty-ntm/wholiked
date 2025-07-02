class GameManager {
    constructor() {
        this.players = [];
        this.currentQuestion = null;
        this.scoreBoard = {};
        this.totalQuestions = 0;
        this.gameStarted = false;
    }

    startGame() {
        this.gameStarted = true;
        this.scoreBoard = {};
        this.totalQuestions = 0;
        this.players.forEach(player => {
            this.scoreBoard[player.id] = 0;
        });
    }

    endGame() {
        this.gameStarted = false;
        // Logic to handle end of game, e.g., announcing winner
    }

    addPlayer(player) {
        this.players.push(player);
        this.scoreBoard[player.id] = 0;
    }

    removePlayer(playerId) {
        this.players = this.players.filter(player => player.id !== playerId);
        delete this.scoreBoard[playerId];
    }

    getRandomQuestion() {
        // Logic to fetch a random question from the question pool
    }

    submitAnswer(playerId, answer) {
        // Logic to check the answer and update scores
    }

    getScores() {
        return this.scoreBoard;
    }
}

module.exports = GameManager;
