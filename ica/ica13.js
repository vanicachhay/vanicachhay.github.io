const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');


function Ball(x, y, dx, dy, radius, color) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;
    this.color = color;

    
    this.draw = function() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.closePath();
    }

    
    this.update = function() {
        
        if (this.x + this.radius > canvas.width || this.x - this.radius < 0) {
            this.dx = -this.dx;
        }
        if (this.y + this.radius > canvas.height || this.y - this.radius < 0) {
            this.dy = -this.dy;
        }

        
        this.x += this.dx;
        this.y += this.dy;

        
        this.draw();
    }
}


const balls = [];


function randomIntFromRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

 //randome color
function randomColor() {
    const r = randomIntFromRange(0, 255);
    const g = randomIntFromRange(0, 255);
    const b = randomIntFromRange(0, 255);
    return `rgb(${r}, ${g}, ${b})`;
}

// ball creation
for (let i = 0; i < 5; i++) {
    const radius = randomIntFromRange(10, 30);
    const x = randomIntFromRange(radius, canvas.width - radius);
    const y = randomIntFromRange(radius, canvas.height - radius);
    const dx = randomIntFromRange(-2, 2); 
    const dy = randomIntFromRange(-2, 2); 
    const color = randomColor();

    balls.push(new Ball(x, y, dx, dy, radius, color));
}

// Animation loop
function animate() {
    requestAnimationFrame(animate);
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Update and draw each ball
    balls.forEach(ball => {
        ball.update();
    });
}

animate();
