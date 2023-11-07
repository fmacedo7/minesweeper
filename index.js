const grid = document.getElementById('grid');
const size = 8; // Tamanho do campo minado
const totalMines = 10; // Número total de minas
let totalFlags = totalMines;
let gameIsOver = false;
let isPaused = false;
let timerInterval;
let seconds = 0;
let minutes = 0;
let hours = 0;

const cells = [];
const difficulties = {
    small: { size: 8, mines: 10 },
    medium: { size: 13, mines: 30 },
    large: { size: 24, mines: 100 }
};
let currentDifficulty = difficulties.small;

// Função para gerar números aleatórios
function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

// Função para iniciar o temporizador
function startTimer() {
    if (!timerInterval) {
        timerInterval = setInterval(() => {
            seconds++;
            if (seconds === 60) {
                seconds = 0;
                minutes++;
                if (minutes === 60) {
                    minutes = 0;
                    hours++;
                }
            }
            // Atualize o temporizador no DOM
            document.getElementById('seconds').textContent = seconds < 10 ? `0${seconds}` : seconds;
            document.getElementById('minutes').textContent = minutes < 10 ? `0${minutes}` : minutes;
            document.getElementById('hours').textContent = hours < 10 ? `0${hours}` : hours;
        }, 1000);
    }
}

function resetTimer() {
    clearInterval(timerInterval);
    seconds = 0;
    minutes = 0;
    hours = 0;
    document.getElementById('seconds').textContent = '00';
    document.getElementById('minutes').textContent = '00';
    document.getElementById('hours').textContent = '00';
    timerInterval = null;
}
// Função para contar as minas adjacentes
function countAdjacentMines(row, col) {
    let count = 0;
    for (let i = row - 1; i <= row + 1; i++) {
        for (let j = col - 1; j <= col + 1; j++) {
            if (i >= 0 && i < size && j >= 0 && j < size) {
                if (cells[i * size + j].classList.contains('mine')) {
                    count++;
                }
            }
        }
    }
    return count;
}

// Função para finalizar o jogo
function endGame() {
    gameIsOver = true;
    clearInterval(timerInterval);
    cells.forEach(cell => {
        if (cell.classList.contains('mine')) {
            cell.style.backgroundColor = 'red';
            cell.removeEventListener('click', handleCellClick);
            cell.removeEventListener('contextmenu', handleContextMenu);
        }
    });
}

// Função para reiniciar o jogo
function resetGame() {
    gameIsOver = false;
    totalFlags = totalMines;
    clearInterval(timerInterval);
    resetTimer();
    isPaused = false;
    timerInterval = null;
    updateFlagCount();
    cells.forEach(cell => {
        cell.textContent = '';
        cell.style.backgroundColor = '#ccc';
        cell.classList.remove('clicked', 'flagged');
        cell.removeEventListener('click', handleCellClick);
        cell.removeEventListener('contextmenu', handleContextMenu);
        cell.addEventListener('click', handleCellClick);
        cell.addEventListener('contextmenu', handleContextMenu);
    });
    createMinefield(); // Adicionado para recriar o campo minado
    document.getElementById('flags').textContent = `Bandeiras Restantes: ${totalFlags}`;
}

document.getElementById('newGameBtn').addEventListener('click', () => {
    currentDifficulty = difficulties[document.getElementById('sizeGrid').value];
    size = currentDifficulty.size;
    totalMines = currentDifficulty.mines;
    resetGame();
    resetTimer();
    timerInterval = null;
});

function pauseTimer() {
    if (!isPaused) {
        clearInterval(timerInterval);
        isPaused = true;
    } else {
        startTimer();
        isPaused = false;
    }
}
document.getElementById('pauseBtn').addEventListener('click', pauseTimer);

cells.forEach(cell => {
    cell.addEventListener('click', handleCellClick);
    cell.addEventListener('contextmenu', handleContextMenu);
});

document.addEventListener('mousedown', (e) => {
    if (e.target.classList.contains('square')) {
        if (isPaused) {
            startTimer();
            isPaused = false;
        }
    }
});

// Função para contar as minas adjacentes e abrir células vizinhas se não houver bombas adjacentes
function countAdjacentMines(row, col) {
    let count = 0;
    let toBeOpened = [];
    for (let i = row - 1; i <= row + 1; i++) {
        for (let j = col - 1; j <= col + 1; j++) {
            if (i >= 0 && i < size && j >= 0 && j < size) {
                if (cells[i * size + j].classList.contains('mine')) {
                    count++;
                } else {
                    toBeOpened.push({ row: i, col: j });
                }
            }
        }
    }
    if (count === 0) {
        openAdjacentCells(toBeOpened);
    }
    return count;
}

// Função para abrir células vizinhas recursivamente
function openAdjacentCells(cellsToOpen) {
    cellsToOpen.forEach(coords => {
        const cell = cells[coords.row * size + coords.col];
        if (!cell.classList.contains('clicked')) {
            cell.classList.add('clicked');
            cell.style.backgroundColor = 'lightgray';
            const adjacentMines = countAdjacentMines(coords.row, coords.col);
            cell.textContent = adjacentMines === 0 ? '' : adjacentMines;
        }
    });
}

// Cria o campo minado
for (let i = 0; i < currentDifficulty.size; i++) {
    for (let j = 0; j < currentDifficulty.size; j++) {
        const cell = document.createElement('div');
        cell.classList.add('square');
        cell.dataset.row = i;
        cell.dataset.col = j;
        grid.appendChild(cell);
        cells.push(cell)

        cell.addEventListener('click', handleCellClick);
        cell.addEventListener('contextmenu', handleContextMenu);
    }
}

// Coloca as minas em posições aleatórias
const minePositions = new Set();
while (minePositions.size < currentDifficulty.mines) {
    const randomIndex = getRandomInt(size * size);
    minePositions.add(randomIndex);
}

minePositions.forEach((position) => {
    cells[position].classList.add('mine');
});

// Adicione a lógica de cliques e a contagem de minas adjacentes
cells.forEach(cell => {
    cell.addEventListener('click', handleCellClick);
    cell.addEventListener('contextmenu', handleContextMenu);
});

function handleCellClick() {
    if (!timerInterval) {//Verifica se o bendito cronometro ainda nao foi iniciado
        startTimer();
    }
    if (gameIsOver) return;
    if (this.classList.contains('flagged')) return;
    const isMine = this.classList.contains('mine');
    if (isMine) {
        this.style.backgroundColor = 'red';
        endGame();
        alert('Você perdeu! Tente novamente.');
    } else {
        const row = parseInt(this.dataset.row);
        const col = parseInt(this.dataset.col);
        const adjacentMines = countAdjacentMines(row, col);
        this.textContent = adjacentMines === 0 ? '' : adjacentMines;
        this.style.backgroundColor = 'lightgray';
        this.classList.add('clicked');
        checkWinCondition();
    }
}

function handleContextMenu(e) {
    e.preventDefault();
    if (gameIsOver) return;
    if (this.classList.contains('clicked')) return;
    if (this.classList.contains('flagged')) {
        this.classList.remove('flagged');
        this.textContent = '';
        totalFlags++;
    } else if (totalFlags > 0) {
        this.classList.add('flagged');
        this.textContent = '🚩';
        totalFlags--;
    }
    updateFlagCount();
}

function checkWinCondition() {
    const clickedCells = document.querySelectorAll('.clicked').length;
    const totalCells = size * size - totalMines;
    if (clickedCells === totalCells) {
        gameIsOver = true;
        alert('Parabéns! Você venceu!');
        clearInterval(timerInterval);
    }
}

function updateFlagCount() {
    document.getElementById('minesCount').textContent = `Bandeiras: ${totalFlags}`;
}

// Iniciar o temporizador
startTimer();