const canvas = document.getElementById("canvas1");

const ctx = canvas.getContext("2d");

const particles = [];

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let hue = 0;

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

        this.color = `hsl(${hue}, 100%, 50%)`;
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        if (this.size > 0.2) {
            this.size -= 0.1;
        }
    }

    draw() {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill()
    }
}

function handleParticles() {
    for (let x = 0; x < particles.length; x++) {
        particles[x].update();
        particles[x].draw();

        for (let j = x; j < particles.length; j++) {
            const dx = particles[x].x - particles[j].x;
            const dy = particles[x].y - particles[j].y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            if (distance < 100) {
                ctx.beginPath()
                ctx.strokeStyle = particles[x].color;
                ctx.lineWidth = particles[x].size / 10;
                ctx.moveTo(particles[x].x, particles[x].y);
                ctx.lineTo(particles[j].x, particles[j].y);
                ctx.stroke();
                ctx.closePath();
            }
        }

        if (particles[x].size <= 0.3) {
            particles.splice(x, 1);
            x--;
        }
    }
}

function animate() {
    // ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "rgba(0,0,0,0.5)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    handleParticles();
    hue += 2;
    requestAnimationFrame(animate);
}

animate();

console.log(ctx);