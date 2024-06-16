document.addEventListener("DOMContentLoaded", function() {
    const canvas = document.getElementById("animationCanvas");
    const ctx = canvas.getContext("2d");
    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;
    const balls = [];
    const ballCount = 50;
    const maxLineDistance = 150;

    window.addEventListener('resize', () => {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
    });

    class Ball {
        constructor() {
            this.x = Math.random() * width;
            this.y = Math.random() * height;
            this.vx = (Math.random() - 0.5) * 2;
            this.vy = (Math.random() - 0.5) * 2;
            this.radius = 5;
        }

        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            ctx.fillStyle = "rgb(30, 144, 255)";
            ctx.fill();
            ctx.closePath();
        }

        update() {
            this.x += this.vx;
            this.y += this.vy;

            if (this.x - this.radius < 0 || this.x + this.radius > width) {
                this.vx *= -1;
            }

            if (this.y - this.radius < 0 || this.y + this.radius > height) {
                this.vy *= -1;
            }
        }
    }

    for (let i = 0; i < ballCount; i++) {
        balls.push(new Ball());
    }

    function connectBalls() {
        for (let i = 0; i < balls.length; i++) {
            for (let j = i + 1; j < balls.length; j++) {
                const dx = balls[i].x - balls[j].x;
                const dy = balls[i].y - balls[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < maxLineDistance) {
                    ctx.beginPath();
                    ctx.moveTo(balls[i].x, balls[i].y);
                    ctx.lineTo(balls[j].x, balls[j].y);
                    ctx.strokeStyle = `rgba(30, 144, 255, ${1 - distance / maxLineDistance})`;
                    ctx.stroke();
                    ctx.closePath();
                }
            }
        }
    }

    function animate() {
        ctx.clearRect(0, 0, width, height);
        for (let ball of balls) {
            ball.update();
            ball.draw();
        }
        connectBalls();
        requestAnimationFrame(animate);
    }

    animate();
});
