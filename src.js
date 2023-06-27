const cells = document.querySelectorAll('.cell');
const resetButton = document.getElementById('reset');
const resultPopup = document.getElementById('result-popup');
const resultMessage = document.getElementById('result-message');
const closePopupButton = document.getElementById('close-popup');

let currentPlayer = 'X';
let gameEnded = false;

let board = ['', '', '', '', '', '', '', '', ''];
const winningCombinations = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
];

function handleCellClick(index) {
    if (board[index] === '' && !gameEnded) {
        board[index] = currentPlayer;
        cells[index].textContent = currentPlayer;
        cells[index].style.pointerEvents = 'none';

        if (checkWin()) {
            endGame(`${currentPlayer} wins!`);
        } else if (checkDraw()) {
            endGame("It's a draw!");
        } else {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        }
    }
}

function checkWin() {
    for (let i = 0; i < winningCombinations.length; i++) {
        const [a, b, c] = winningCombinations[i];
        if (board[a] !== '' && board[a] === board[b] && board[b] === board[c]) {
            return true;
        }
    }
    return false;
}

function checkDraw() {
    return !board.includes('');
}

function endGame(message) {
    gameEnded = true;
    resultMessage.textContent = message;
    resultPopup.style.display = 'block';
}

function resetGame() {
    currentPlayer = 'X';
    gameEnded = false;
    board = ['', '', '', '', '', '', '', '', ''];
    cells.forEach((cell, index) => {
        cell.textContent = '';
        cell.style.pointerEvents = 'auto';
    });
    resultPopup.style.display = 'none';
}

cells.forEach((cell, index) => {
    cell.addEventListener('click', () => handleCellClick(index));
});

resetButton.addEventListener('click', resetGame);

closePopupButton.addEventListener('click', () => {
    resultPopup.style.display = 'none';
});