// ui.js

// Function to draw the game board
function drawTheBoard(state, parentElement, currentPlayerElement) {

    currentPlayerElement.innerHTML = state.currentPlayer;
   
    // Clear any existing content
    parentElement.innerHTML = '';

    // Check if game is won
    if (state.gameWins !== null) {
        // Display congratulatory message
        const congratulations = document.createElement('div');
        congratulations.classList.add('congratulations');
        congratulations.textContent = `Congratulations Player ${state.gameWins}!`;

        // Style for congratulatory message
        congratulations.style.backgroundColor = 'lightgreen';
        congratulations.style.padding = '20px';
        congratulations.style.fontSize = '24px';
        congratulations.style.textAlign = 'center';

        parentElement.appendChild(congratulations);
        return;
    }

    // Create the big board container
    const bigBoardContainer = document.createElement('div');
    bigBoardContainer.classList.add('big-board');

    // Create the 9 small boards
    for (let i = 0; i < 9; i++) {
        const smallBoard = document.createElement('div');
        smallBoard.classList.add('small-board');
        
        // Check for big board result
        if (state.bigBoardResults[i]) {
            smallBoard.textContent = state.bigBoardResults[i];
            smallBoard.classList.add('result');
        } else {
            // Highlight the current big board
            if (state.currentBigBoard === i) {
                smallBoard.classList.add('highlight');
            }

            // Create the 9 cells for each small board
            for (let j = 0; j < 9; j++) {
                const cell = document.createElement('div');
                cell.classList.add('cell');
                cell.dataset.bigBoardIndex = i;
                cell.dataset.smallBoardIndex = j;

                if (state.bigBoard[i][j]) {
                    cell.textContent = state.bigBoard[i][j];
                }

                // Add click event listener to the cell
                cell.addEventListener('click', () => {
                    if (makeAMove(i, j)) {
                        drawTheBoard(parentElement, currentPlayerElement); // Redraw the board after a move
                    }
                });

                // Add the cell to the small board
                smallBoard.appendChild(cell);
            }
        }

        // Add the small board to the big board container
        bigBoardContainer.appendChild(smallBoard);
    }

    // Add the big board container to the parent element
    parentElement.appendChild(bigBoardContainer);
}
