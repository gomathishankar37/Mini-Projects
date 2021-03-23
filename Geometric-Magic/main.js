const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");
ctx.canvas.width = window.innerWidth;
ctx.canvas.height = window.innerHeight;

let particleArray = [];

// GET MOUSE POSITION 
const mouse = {
    x: null,
    y: null
}
window.addEventListener('mousemove', function (event) {
    mouse.x = event.x;
    mouse.y = event.y;
});
// SET MOUSE POSITION AS UNDEFINED EVERY 5 SEC(to prevent effect getting stuck in corners when mouse leaves window)//////
setInterval(function () {
    mouse.x = undefined;
    mouse.y = undefined;
}, 200);

// CREATE PARTICLE OBJECT 
class Particle {
    constructor(x, y, size, color, weight) {
        this.x = x;
        this.y = y;
        this.size = size;
        this.minSize = size;
        this.color = color;
        this.weight = weight;
    }
    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
        ctx.fillStyle = this.color;
        ctx.fill();
    }
    update() {
        this.size -= 0.05;
        if (this.size < 0) {
            this.x = (mouse.x + ((Math.random() * 20) - 10));
            this.y = (mouse.y + ((Math.random() * 20) - 10));
            this.size = (Math.random() * 15) + 2;
            this.weight = (Math.random() * 2) - 0.5;
        }
        this.y += this.weight;
        this.weight += 0.05;

        // if it reaches bottom bounce
        if (this.y > canvas.height - this.size) {
            this.weight *= -.5;
        };
    }
}

function init() {
    particleArray = [];
    for (let i = 0; i < 150; i++) {
        let size = (Math.random() * 10) + 1;
        let x = Math.random() * (innerWidth - size * 2) + size;
        let y = canvas.height - 100;
        let color = 'red';
        let weight = 1;
        particleArray.push(new Particle(x, y, size, color, weight));
    }

}

function animate() {
    ctx.fillStyle = 'black';
    
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < particleArray.length; i++) {
        particleArray[i].update();
    }
    connect();
    requestAnimationFrame(animate);
}
init();
animate();

// check if particles are close enough to draw line between them
function connect() {
    let opacityValue = 1;
    for (let a = 0; a < particleArray.length; a++) {
        for (let b = a; b < particleArray.length; b++) {
            let distance = ((particleArray[a].x - particleArray[b].x) * (particleArray[a].x - particleArray[b].x))
                + ((particleArray[a].y - particleArray[b].y) * (particleArray[a].y - particleArray[b].y));
            if (distance < (canvas.width / 7) * (canvas.height / 7)) {
                opacityValue = 1 - (distance / 5000);
                ctx.strokeStyle = 'rgba(255,255,255,' + opacityValue + ')';
                ctx.beginPath();
                ctx.lineWidth = 1;
                ctx.moveTo(particleArray[a].x, particleArray[a].y);
                ctx.lineTo(particleArray[b].x, particleArray[b].y);
                ctx.stroke();

            }
        }
    }
    window.addEventListener('resize', function (e) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
}