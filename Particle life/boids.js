class Particle 
{
    constructor(x, y, color, size) {
        this.x = x;
        this.y = y;
        this.color = color;
        this.size = size;
        this.velocity = [0.0, 0.0]
    }

    draw() {
        ctx.fillStyle = this.color
        ctx.fillRect(this.x, this.y, this.size, this.size)
    }

    process() {
        if (this.x < 0 || this.x > WIDTH - this.size) {
            // this.velocity[0] *= -0.5;
            this.x = Math.max(0, Math.min(WIDTH - this.size, this.x));
        }

        if (this.y < 0 || this.y > HEIGHT - this.size) {
            // this.velocity[1] *= -0.5;
            this.y = Math.max(0, Math.min(HEIGHT - this.size, this.y));
        }
    }
}

function random(size) {
    return Math.random() * size + 50;
}

function random_num_float() {
    return Math.random() * 2 - 1;
}

function add_group(size, color) {
    var group = []

    for (let i = 0; i < size; i++) {
        var new_particle = new Particle(random(WIDTH - 100), random(HEIGHT - 100), color, SIZE_PARTICLE);
        group.push(new_particle)
        all_particles.push(new_particle)
    }
    return group
}

function apply_rules(group1, group2, g) {

    for (let y = 0; y < group1.length; y++) {
        var velocity = [0.0, 0.0]

        for (let x = 0; x < group2.length; x++) {
            var particle1 = group1[y]
            var particle2 = group2[x]

            var dx = particle1.x - particle2.x
            var dy = particle1.y - particle2.y

            var dist_sq = Math.sqrt(dx * dx + dy * dy)

            if (dist_sq > 0 && dist_sq < 80) {
                // сила притяяжения
                var f = g / dist_sq

                // прибавляем притяжение к 2 измерениям
                velocity[0] += f * dx
                velocity[1] += f * dy
            }
        }
        
        // движение
        particle1.x += (particle1.velocity[0] + velocity[0]) * FORCE
        particle1.y += (particle1.velocity[1] + velocity[1]) * FORCE
    }
}

function random_rules() {
    for (let i = 0; i < group_array.length; i++) {
        for (let j = 0; j < group_array.length; j++) {
            apply_rules(group_array[i], group_array[j], list_random[i * group_array.length + j]);
        }
    }
}


// Основной цикл игры
function Loop() {
    random_rules()

    // Очищаем поле
    ctx.clearRect(0, 0, WIDTH, HEIGHT)

    // Отрисовываем снова
    ctx.fillStyle = "rgb(15, 15, 15)"
    ctx.fillRect(0, 0, WIDTH, HEIGHT)

    // Отрисовываем все частицы
    for (let i = 0; i < all_particles.length; i++) {
        all_particles[i].process()
        all_particles[i].draw()
    }
    
    if (isRunning) {
        animationId = requestAnimationFrame(Loop);
    }
}

const canvas = document.getElementById('life');
const ctx = canvas.getContext("2d");
const startBtn = document.getElementById('start');
const WIDTH = document.getElementById("life").width; 
const HEIGHT = document.getElementById("life").height; 

let isRunning = true;
let animationId = null;

const all_particles = [];

const SIZE_PARTICLE = 4
const FORCE = 0.3

const LEN_PARTICLES = 300
const yellow = add_group(LEN_PARTICLES, "yellow");
const red = add_group(LEN_PARTICLES, "red");
const green = add_group(LEN_PARTICLES, "green")
const blue = add_group(LEN_PARTICLES, "blue")
const white = add_group(LEN_PARTICLES, "white")
const purple = add_group(LEN_PARTICLES, "purple")
const orange = add_group(LEN_PARTICLES, "orange")
const aqua = add_group(LEN_PARTICLES, "aqua")

const group_array = [yellow, red, green, blue, white, purple, orange, aqua];

const list_random = []
for(let i = 0; i < group_array.length * group_array.length; i++)
    { list_random.push(random_num_float()); console.log(list_random[i])}

Loop()

// Управление кнопками
startBtn.addEventListener('click', () => {
    if (!isRunning) {
        isRunning = true;
        Loop();
    } else {
        isRunning = false;
        if (animationId) {
            cancelAnimationFrame(animationId);
    }
    }
});