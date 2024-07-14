function resetGame() {
    fetch(resetUrl).then(() => pollBoard());
}

function makeAMove(bigBoard, smallBoard) {
    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ bigBoard, smallBoard })
    };

    fetch(moveUrl, requestOptions)
        .then(data => {
            pollBoard();
            console.log('Move response:', data);
            // Handle the response data as needed
        })
        .catch(error => {
            console.error('Error making move request:', error);
            // Handle errors if any
        });
}

function pollBoard() {
    // Make a GET request to http://localhost:8080/board
    fetch(getBoardUrl)
        .then(response => response.json())  // Assuming the response is JSON
        .then(data => {
            // Call your drawing function with the received data
            const gameBoardElement = document.getElementById('game-board');
            const currentPlayerElement = document.getElementById('current-player');
            drawTheBoard(data.state, gameBoardElement, currentPlayerElement);
        })
        .catch(error => {
            console.error('Error fetching board:', error);
            // Handle errors if needed
        });
}

// Call pollBoard function initially and then every 3 seconds
pollBoard();
setInterval(pollBoard, 3000);  // 3000 milliseconds = 3 seconds
