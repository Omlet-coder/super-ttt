// state.js

// Initialize the game state
let state = {
    bigBoardResults: Array(9).fill(null),
    currentBigBoard: null,
    gameWins: null,
    currentPlayer: 'X', // 'X' or 'O'
    bigBoard: [
        Array(9).fill(null), // small board 1
        Array(9).fill(null), // small board 2
        Array(9).fill(null), // small board 3
        Array(9).fill(null), // small board 4
        Array(9).fill(null), // small board 5
        Array(9).fill(null), // small board 6
        Array(9).fill(null), // small board 7
        Array(9).fill(null), // small board 8
        Array(9).fill(null)  // small board 9
    ]
};



// Function to make a move
function makeAMove(bigBoardIndex, smallBoardIndex) {
    if (state.currentBigBoard !== null && bigBoardIndex !== state.currentBigBoard) {
        return "WrongBigBoard"
    }

    // Check if the move is valid
    if (state.bigBoard[bigBoardIndex] === undefined || state.bigBoard[bigBoardIndex][smallBoardIndex] !== null) {
        console.error('Invalid move, position already taken.');
        return "Error";
    }

    // Make the move
    state.bigBoard[bigBoardIndex][smallBoardIndex] = state.currentPlayer;

    // Check if the game should continue or if there is a winner
    if (checkWinner(state.bigBoard[bigBoardIndex])) {
        state.bigBoardResults[bigBoardIndex] = state.currentPlayer;
    }

    if (checkWinner(state.bigBoardResults)) {
        console.log('Player ', state.currentPlayer, ' has won');
        state.gameWins = state.currentPlayer;
        return "PlayerWins";
    }

    updateCurrentBigBoard(smallBoardIndex);

    // Switch to the other player
    state.currentPlayer = state.currentPlayer === 'X' ? 'O' : 'X';

    return "Continue";
}

function checkBigBoardWinner() {
    return checkWinner(state.bigBoardResults)
}

// Helper function to check for a winner on a small board
function checkWinner(board) {
    const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
        [0, 4, 8], [2, 4, 6]             // Diagonals
    ];

    return winPatterns.some(pattern => {
        const [a, b, c] = pattern;
        return board[a] !== null && board[a] === board[b] && board[a] === board[c];
    });
}

function updateCurrentBigBoard(smallBoardIndex) {
    state.currentBigBoard = smallBoardIndex;

    if (state.bigBoardResults[state.currentBigBoard] !== null) {
        state.currentBigBoard = null;
    }
}
