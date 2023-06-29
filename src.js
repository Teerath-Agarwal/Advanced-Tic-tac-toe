const cells = document.querySelectorAll('.cell');
const reset_board = document.getElementById('rboard');
const reset_score = document.getElementById('rscore');
const resultPopup = document.getElementById('result-popup');
const resultMessage = document.getElementById('result-message');
const count = document.querySelectorAll('.scoreboard-count');
const countobj = {};

count.forEach((element) => {
    countobj[element.id] = element;
});

let curPl = 'X';
let board = ['', '', '', '', '', '', '', '', ''];
const winComb = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
];
let score = {
    'X': 0,
    'O': 0,
    'D': 0
};
let lstupdate = 'D';
let remComb = {
    'X': winComb,
    'O': winComb
};

function handleCellClick(idx) {
    if (board[idx] === '') {
        board[idx] = curPl;
        cells[idx].textContent = curPl;
        cells[idx].style.pointerEvents = 'none';

        if (checkWin()) {
            endGame(`${curPl} wins!`);
            return;
        }
        curPl = curPl === 'X' ? 'O' : 'X';
        remComb[curPl] = remComb[curPl].filter((arr) => {
            for (let i of arr) if (i == idx) return false;
            return true;
        });
        console.log("x_size:" + remComb['X'].length);
        console.log("o_size:" + remComb['O'].length);
        if (checkDraw()) {
            endGame("It's a draw!");
        }
    }
}

function checkWin() {
    for (let i = 0; i < remComb[curPl].length; i++) {
        const [a, b, c] = remComb[curPl][i];
        if (board[a] !== '' && board[a] === board[b] && board[b] === board[c]) {
            lstupdate = curPl;
            score[curPl]++;
            return true;
        }
    }
    return false;
}

function checkDraw() {
    if (!remComb[curPl].length && (remComb['X'].length + remComb['O'].length) <= 1) {
        lstupdate = 'D';
        score[lstupdate]++;
        return true;
    }
    return false;
}

function endGame(message) {
    resultMessage.textContent = message;
    resultPopup.style.display = 'flex';
    
    setTimeout(function () {
        resetGame();
        updateScore();
    }, 1500);
}

function resetGame() {
    board = ['', '', '', '', '', '', '', '', ''];
    remComb['X'] = winComb;
    remComb['O'] = winComb;
    cells.forEach((cell) => {
        cell.textContent = '';
        cell.style.pointerEvents = 'auto';
    });
    resultPopup.style.display = 'none';
}

function updateScore() {
    countobj[lstupdate].classList.add('fadeout');
    setTimeout(function () {
        countobj[lstupdate].textContent = score[lstupdate];
        countobj[lstupdate].classList.remove('fadeout');
        countobj[lstupdate].classList.add('fadein');
        setTimeout(function () {
            countobj[lstupdate].classList.remove('fadein');
        }, 500);
    }, 500);
}

function resetScore(){
    score.D = 0;
    score.X = 0;
    score.O = 0;
    count.forEach((element) => {
        element.classList.add('fadeout');
    });
    setTimeout(function () {
        count.forEach((element) => {
            element.textContent = 0;
            element.classList.remove('fadeout');
            element.classList.add('fadein');
        });
        setTimeout(function () {
            count.forEach((element) => {
                element.classList.remove('fadein');
            });
        }, 500);
    }, 500);
}

resultPopup.style.display = 'none';
cells.forEach((cell, idx) => {
    cell.addEventListener('click', () => handleCellClick(idx));
});

reset_board.addEventListener('click', resetGame);
reset_score.addEventListener('click', resetScore);