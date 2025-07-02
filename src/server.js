const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const GameManager = require('./game/gameManager');
const PlayerManager = require('./game/playerManager');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

const gameManager = new GameManager();
const playerManager = new PlayerManager();

app.use(express.static('public'));

io.on('connection', (socket) => {
    console.log('A user connected:', socket.id);

    playerManager.addPlayer(socket);

    socket.on('joinGame', (playerName) => {
        playerManager.updatePlayerName(socket.id, playerName);
        gameManager.addPlayer(socket.id);
        io.emit('playerList', playerManager.getPlayers());
    });

    socket.on('startGame', () => {
        gameManager.startGame();
        io.emit('gameStarted', gameManager.getGameState());
    });

    socket.on('answer', (answer) => {
        const result = gameManager.checkAnswer(socket.id, answer);
        io.emit('answerResult', { playerId: socket.id, result });
    });

    socket.on('disconnect', () => {
        console.log('User disconnected:', socket.id);
        playerManager.removePlayer(socket.id);
        gameManager.removePlayer(socket.id);
        io.emit('playerList', playerManager.getPlayers());
    });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
// ...existing code...
const rooms = {}; // { code: { gameManager, playerManager } }

function generateRoomCode() {
    return Math.floor(100000 + Math.random() * 900000).toString();
}

io.on('connection', (socket) => {
    console.log('A user connected:', socket.id);

    socket.on('createRoom', (playerName, callback) => {
        const code = generateRoomCode();
        rooms[code] = {
            gameManager: new GameManager(),
            playerManager: new PlayerManager()
        };
        socket.join(code);
        rooms[code].playerManager.addPlayer(socket.id, playerName);
        callback({ code });
        io.to(code).emit('playerList', rooms[code].playerManager.getAllPlayers());
    });

    socket.on('joinRoom', (code, playerName, callback) => {
        if (rooms[code]) {
            socket.join(code);
            rooms[code].playerManager.getAllPlayers(socket.id, playerName);
            callback({ success: true });
            io.to(code).emit('playerList', rooms[code].playerManager.getAllPlayers());
        } else {
            callback({ success: false, message: 'Room not found' });
        }
    });

    socket.on('startGame', (code) => {
        if (rooms[code]) {
            rooms[code].gameManager.startGame();
            io.to(code).emit('gameStarted', rooms[code].gameManager.getScores());
        }
    });

    socket.on('disconnecting', () => {
        for (const code of socket.rooms) {
            if (rooms[code]) {
                rooms[code].playerManager.removePlayer(socket.id);
                io.to(code).emit('playerList', rooms[code].playerManager.getAllPlayers());
            }
        }
    });
});
// ...existing code...