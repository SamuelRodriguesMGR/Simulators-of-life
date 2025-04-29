

const canvas = document.getElementById('life');
const ctx = canvas.getContext('2d');
const startBtn = document.getElementById('start');
const stopBtn = document.getElementById('stop');
const clearBtn = document.getElementById('clear');
const randomBtn = document.getElementById('random');

// Размер клетки и сетки
const cellSize = 10;
const rows = canvas.height / cellSize;
const cols = canvas.width / cellSize;

// Основные переменные
let grid = createEmptyGrid();
let isRunning = false;
let animationId = null;

// Создание пустой сетки
function createEmptyGrid() {
    return Array(rows).fill().map(() => Array(cols).fill(0));
}

// Заполнение случайными значениями
function randomizeGrid() {
    grid = Array(rows).fill().map(() => 
        Array(cols).fill().map(() => Math.random() > 0.7 ? 1 : 0)
    );
}

// Очистка сетки
function clearGrid() {
    grid = createEmptyGrid();
    drawGrid();
}

// Отрисовка сетки
function drawGrid() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
            if (grid[y][x]) {
                ctx.fillStyle = 'black';
                ctx.fillRect(x * cellSize, y * cellSize, cellSize - 1, cellSize - 1);
            }
        }
    }
}

// Подсчёт количества живых соседей
function countNeighbors(y, x) {
    let count = 0;
    for (let dy = -1; dy <= 1; dy++) {
        for (let dx = -1; dx <= 1; dx++) {
            if (dy === 0 && dx === 0) continue; // Пропускаем текущую клетку
            const ny = y + dy;
            const nx = x + dx;
            if (ny >= 0 && ny < rows && nx >= 0 && nx < cols && grid[ny][nx]) {
                count++;
            }
        }
    }
    return count;
}

// Обновление состояния клеток
function updateGrid() {
    const newGrid = createEmptyGrid();
    for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
            const neighbors = countNeighbors(y, x);
            if (grid[y][x]) {
                // Клетка жива: выживает при 2-3 соседях, иначе умирает
                newGrid[y][x] = (neighbors === 2 || neighbors === 3) ? 1 : 0;
            } else {
                // Клетка мертва: оживает при 3 соседях
                newGrid[y][x] = neighbors === 3 ? 1 : 0;
            }
        }
    }
    grid = newGrid;
}

// Основной цикл игры
function gameLoop() {
    updateGrid();
    drawGrid();
    
    if (isRunning) {
        animationId = requestAnimationFrame(gameLoop);
    }
}

// Обработка кликов по канвасу (можно добавлять/удалять клетки)
canvas.addEventListener('click', (e) => {
    if (isRunning) return;
    const x = Math.floor(e.offsetX / cellSize);
    const y = Math.floor(e.offsetY / cellSize);
    grid[y][x] = grid[y][x] ? 0 : 1;
    drawGrid();
});

// Управление кнопками
startBtn.addEventListener('click', () => {
    if (!isRunning) {
        isRunning = true;
        gameLoop();
    }
});

stopBtn.addEventListener('click', () => {
    isRunning = false;
    if (animationId) {
        cancelAnimationFrame(animationId);
    }
});

clearBtn.addEventListener('click', () => {
    if (isRunning) {
        isRunning = false;
        cancelAnimationFrame(animationId);
    }
    clearGrid();
});

randomBtn.addEventListener('click', () => {
    if (isRunning) {
        isRunning = false;
        cancelAnimationFrame(animationId);
    }
    randomizeGrid();
    drawGrid();
});

// Инициализация
drawGrid();