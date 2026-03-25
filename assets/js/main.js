const canvas1 = document.getElementById("canvas1");
const ctx1 = canvas1.getContext("2d");

canvas1.width = canvas1.offsetWidth;
canvas1.height = canvas1.offsetHeight;

class Circle {
  constructor(x, y, r) {
    this.x = x;
    this.y = y;
    this.r = r;

    this.dx = (Math.random() - 0.5) * 4;
    this.dy = (Math.random() - 0.5) * 4;
  }

  draw() {
    ctx1.beginPath();
    ctx1.shadowColor = "rgba(0,0,0,0.3)";
    ctx1.shadowBlur = 10;

    ctx1.fillStyle = "#007bff";
    ctx1.arc(this.x, this.y, this.r, 0, Math.PI * 2);
    ctx1.fill();
  }

  update() {
    this.draw();

    if (this.x + this.r > canvas1.width || this.x - this.r < 0) this.dx *= -1;
    if (this.y + this.r > canvas1.height || this.y - this.r < 0) this.dy *= -1;

    this.x += this.dx;
    this.y += this.dy;
  }
}

let circles1 = [];

function createCircles1(n = 8) {
  circles1 = [];
  for (let i = 0; i < n; i++) {
    circles1.push(new Circle(
      Math.random() * canvas1.width,
      Math.random() * canvas1.height,
      15 + Math.random() * 15
    ));
  }
}

function animate1() {
  requestAnimationFrame(animate1);
  ctx1.clearRect(0, 0, canvas1.width, canvas1.height);

  circles1.forEach(c => c.update());
}

createCircles1(window.cantidadCirculos || 8);
animate1();