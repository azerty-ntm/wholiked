class PlayerManager {
    constructor() {
        this.players = {};
    }

    addPlayer(id, name) {
        if (!this.players[id]) {
            this.players[id] = { name: name, score: 0 };
        }
    }

    removePlayer(id) {
        delete this.players[id];
    }

    updateScore(id, score) {
        if (this.players[id]) {
            this.players[id].score += score;
        }
    }

    getPlayer(id) {
        return this.players[id] || null;
    }

    getAllPlayers() {
        return Object.values(this.players);
    }

    resetScores() {
        for (const id in this.players) {
            this.players[id].score = 0;
        }
    }
}

module.exports = PlayerManager;
