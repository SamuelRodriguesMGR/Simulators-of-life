

const canvas = document.getElementById('life');
const ctx = canvas.getContext('2d');
const start_button = document.getElementById('start');
const  stop_button = document.getElementById('stop');

// Размер клетки и сетки
const CELL_SIZE = 10;
const ROWS = canvas.height / CELL_SIZE;
const COLS = canvas.width / CELL_SIZE;
const all_sprites = [];

// Основные переменные
let running = false;
let animation_id = null;

class Bot {
    constructor(x, y, color, size) {
        this.x = x;
        this.y = y;
        this.color = color;
        this.size = size;
        this.brain
    }

    draw() {
        ctx.fillStyle = this.color
        ctx.fillRect(this.x, this.y, this.size, this.size)
    }
}

// Основной цикл игры
function Loop() {
    // Отрисовываем все частицы
    for (let i = 0; i < all_sprites.length; i++) {
        all_sprites[i].draw()
    }
    
    requestAnimationFrame(Loop);
    
}

// Обработка кликов по канвасу (можно добавлять/удалять клетки)
canvas.addEventListener('click', (event) => {
    if (running) return;
    const x = Math.floor(event.offsetX / CELL_SIZE) * CELL_SIZE;
    const y = Math.floor(event.offsetY / CELL_SIZE) * CELL_SIZE;
    var new_bot = new Bot(x, y, "red", CELL_SIZE - 1);
    all_sprites.push(new_bot)
});

// Управление кнопками
start_button.addEventListener('click', () => {
    if (!running) {
        running = true;
    }
});

stop_button.addEventListener('click', () => {
    running = false;
    if (animation_id) {
        cancelAnimationFrame(animation_id);
    }
});

Loop();