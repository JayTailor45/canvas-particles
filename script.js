const canvas = document.getElementById("canvas1");

const ctx = canvas.getContext("2d");

const particles = [];

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

const mouse = {
    x: undefined, y: undefined,
}

canvas.addEventListener('click', (event) => {
    mouse.x = event.x;
    mouse.y = event.y;
});

canvas.addEventListener('mousemove', (event) => {
    mouse.x = event.x;
    mouse.y = event.y;
});

class Particle {
    constructor() {
        // this.x = mouse.x;
        // this.y = mouse.y

        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;

        this.size = Math.random() + 6;
        this.speedX = Math.random() * 3 - 1.5;
        this.speedY = Math.random() * 3 - 1.5;
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;

    }

    draw() {
        ctx.fillStyle = "white";
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill()
    }
}

function init() {
    for (let x = 0; x < 100; x++) {
        particles.push(new Particle());
    }
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let x = 0; x < particles.length; x++) {
        particles[x].update();
        particles[x].draw();
    }
    requestAnimationFrame(animate);
}

init();
animate();

console.log(ctx);