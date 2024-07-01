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

    for (let i = 0; i < 10; i++) {
        particles.push(new Particle());
    }
});

canvas.addEventListener('mousemove', (event) => {
    mouse.x = event.x;
    mouse.y = event.y;

    for (let i = 0; i < 10; i++) {
        particles.push(new Particle());
    }
});

class Particle {
    constructor() {
        this.x = mouse.x;
        this.y = mouse.y

        this.size = Math.random() * 15;
        this.speedX = Math.random() * 3 - 1.5;
        this.speedY = Math.random() * 3 - 1.5;
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        if (this.size > 0.2) {
            this.size -= 0.1;
        }
    }

    draw() {
        ctx.fillStyle = "white";
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill()
    }
}

function handleParticles() {
    for (let x = 0; x < particles.length; x++) {
        particles[x].update();
        particles[x].draw();

        if (particles[x].size <= 0.3) {
            particles.splice(x, 1);
            x--;
        }
    }
}

function animate() {
    // ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "rgba(0,0,0,0.2)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    handleParticles();
    requestAnimationFrame(animate);
}

animate();

console.log(ctx);