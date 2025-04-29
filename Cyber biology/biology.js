

const canvas = document.getElementById('life');
const ctx = canvas.getContext('2d');

// Размер клетки и сетки
const TILE_SIZE = 16;
const ROWS = canvas.height / TILE_SIZE;
const COLS = canvas.width / TILE_SIZE;

// Основные переменные
let grid = create_empty_grid();
let isRunning = true;

// Создание пустой сетки
function create_empty_grid() {
    return Array(ROWS).fill().map(() => Array(COLS).fill(0));
}

// Отрисовка сетки
function draw_grid() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let y = 0; y < ROWS; y++) {
        for (let x = 0; x < COLS; x++) {
            if (grid[y][x]) {
                ctx.fillStyle = 'black';
                ctx.fillRect(x * TILE_SIZE, y * TILE_SIZE, TILE_SIZE - 1, TILE_SIZE - 1);
            }
        }
    }
}

class Bot
{
    constructor(x, y, color, size) {
        this.x = x;
        this.y = y;
        this.color = color;
        this.size = size;
        this.brain
    }

    draw() {
        canvas.fillStyle = this.color
        canvas.fillRect(this.x, this.y, this.size, this.size)
    }
}

// Основной цикл игры
function gameLoop() {
    draw_grid();
    
    requestAnimationFrame(gameLoop);
}

gameLoop();