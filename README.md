# Qui a liké ça ? - Multiplayer Game

## Overview
"Qui a liké ça ?" is a multiplayer online game where players guess who liked a specific TikTok video based on provided clues. The game is designed to be fun and engaging, allowing players to compete against each other in real-time.

## Project Structure
The project is organized into the following directories and files:

```
qui-a-like-multiplayer
├── public
│   ├── index.html       # Main HTML structure for the game
│   ├── styles.css       # Styles for the game interface
│   └── app.js           # Client-side JavaScript for game interactions
├── src
│   ├── server.js        # Server entry point for handling connections
│   └── game
│       ├── gameManager.js # Manages game state and logic
│       └── playerManager.js # Manages player connections and data
├── package.json         # npm configuration and dependencies
└── README.md            # Project documentation
```

## Setup Instructions
1. **Clone the repository:**
   ```
   git clone <repository-url>
   cd qui-a-like-multiplayer
   ```

2. **Install dependencies:**
   ```
   npm install
   ```

3. **Start the server:**
   ```
   npm start
   ```

4. **Open your browser:**
   Navigate to `http://localhost:3000` to access the game.

## Gameplay Rules
- Players will be presented with a TikTok video clue.
- Each player must guess who liked the video from a list of players.
- Points are awarded for correct guesses, and the player with the highest score at the end of the game wins.

## Technologies Used
- **Node.js**: Server-side JavaScript runtime.
- **Express**: Web framework for Node.js.
- **Socket.IO**: Library for real-time web applications, enabling real-time communication between clients and the server.

## Contributing
Contributions are welcome! Please fork the repository and submit a pull request for any changes or improvements.

## License
This project is licensed under the MIT License. See the LICENSE file for details.