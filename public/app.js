// This file contains the client-side JavaScript code that handles user interactions, communicates with the server, and updates the game state in the browser.

// Elements
const peopleList = document.getElementById('peopleList');
const personNameInput = document.getElementById('personName');
const addPersonBtn = document.getElementById('addPersonBtn');
const gameSection = document.getElementById('gameSection');
const startGameBtn = document.getElementById('startGameBtn');
const questionContainer = document.getElementById('questionContainer');
const optionsContainer = document.getElementById('optionsContainer');
const resultDisplay = document.getElementById('resultDisplay');
const nextQuestionBtn = document.getElementById('nextQuestionBtn');
const scoreDisplay = document.getElementById('scoreDisplay');
const scoreSpan = document.getElementById('score');
const totalSpan = document.getElementById('total');

let score = 0;
let totalQuestions = 0;
let gameStarted = false;

// Add person event
addPersonBtn.addEventListener('click', () => {
    const name = personNameInput.value.trim();
    if (name) {
        socket.emit('addPerson', name);
        personNameInput.value = '';
    }
});

// Start game event
startGameBtn.addEventListener('click', () => {
    if (!gameStarted) {
        gameStarted = true;
        score = 0;
        totalQuestions = 0;
        scoreDisplay.style.display = 'block';
        scoreSpan.textContent = '0';
        totalSpan.textContent = '0';
        socket.emit('startGame');
    }
});

// Listen for game updates
socket.on('updatePeopleList', (people) => {
    peopleList.innerHTML = '';
    people.forEach(person => {
        const personDiv = document.createElement('div');
        personDiv.textContent = person.name;
        peopleList.appendChild(personDiv);
    });
});

socket.on('newQuestion', (question) => {
    totalQuestions++;
    totalSpan.textContent = totalQuestions;
    questionContainer.style.display = 'block';
    optionsContainer.innerHTML = '';
    
    question.options.forEach(option => {
        const button = document.createElement('button');
        button.textContent = option.name;
        button.onclick = () => selectAnswer(option);
        optionsContainer.appendChild(button);
    });
});

function selectAnswer(selectedOption) {
    socket.emit('answer', selectedOption);
}

socket.on('result', (result) => {
    if (result.correct) {
        score++;
        scoreSpan.textContent = score;
        resultDisplay.textContent = `🎉 Correct! It was ${result.correctPerson.name}!`;
    } else {
        resultDisplay.textContent = `❌ Incorrect! It was ${result.correctPerson.name}.`;
    }
    resultDisplay.style.display = 'block';
    nextQuestionBtn.style.display = 'inline-block';
});

nextQuestionBtn.addEventListener('click', () => {
    socket.emit('nextQuestion');
});
// Ajoute dans public/app.js
const socket = io("https://wholiked.onrender.com/");

document.getElementById('joinBtn').onclick = () => {
    const pseudo = document.getElementById('pseudo').value;
    const code = document.getElementById('roomCode').value;
    socket.emit('joinRoom', code, pseudo, (res) => {
        if (res.success) {
            document.getElementById('login').style.display = 'none';
            document.getElementById('game').style.display = '';
        } else {
            alert(res.message || "Impossible de rejoindre la salle.");
        }
    });
};

document.getElementById('createBtn').onclick = () => {
    const pseudo = document.getElementById('pseudo').value;
    socket.emit('createRoom', pseudo, (res) => {
        document.getElementById('login').style.display = 'none';
        document.getElementById('game').style.display = '';
        alert("Code de la salle : " + res.code);
    });
};