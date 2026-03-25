const canvas2 = document.getElementById("canvas2");
const ctx2 = canvas2.getContext("2d");

canvas2.width = canvas2.offsetWidth;
canvas2.height = canvas2.offsetHeight;

class Circle2 {
  constructor(x, y, r) {
    this.x = x;
    this.y = y;
    this.r = r;

    this.dx = (Math.random() - 0.5) * 4;
    this.dy = (Math.random() - 0.5) * 4;

    this.color = "#007bff";
  }

  draw() {
    ctx2.beginPath();
    ctx2.shadowColor = "rgba(0,0,0,0.3)";
    ctx2.shadowBlur = 10;

    ctx2.fillStyle = this.color;
    ctx2.arc(this.x, this.y, this.r, 0, Math.PI * 2);
    ctx2.fill();
  }

  update() {
    this.draw();

    if (this.x + this.r > canvas2.width || this.x - this.r < 0) this.dx *= -1;
    if (this.y + this.r > canvas2.height || this.y - this.r < 0) this.dy *= -1;

    this.x += this.dx;
    this.y += this.dy;
  }
}

function detect(c1, c2) {
  let dx = c1.x - c2.x;
  let dy = c1.y - c2.y;
  return Math.sqrt(dx * dx + dy * dy) <= c1.r + c2.r;
}

let circles2 = [];

function createCircles2(n = 8) {
  circles2 = [];
  for (let i = 0; i < n; i++) {
    circles2.push(new Circle2(
      Math.random() * canvas2.width,
      Math.random() * canvas2.height,
      15 + Math.random() * 15
    ));
  }
}

function animate2() {
  requestAnimationFrame(animate2);
  ctx2.clearRect(0, 0, canvas2.width, canvas2.height);

  circles2.forEach(c => {
    c.update();
    c.color = "#007bff";
  });

  for (let i = 0; i < circles2.length; i++) {
    for (let j = i + 1; j < circles2.length; j++) {
      if (detect(circles2[i], circles2[j])) {
        circles2[i].color = "#ff4d4d";
        circles2[j].color = "#ff4d4d";
      }
    }
  }
}

createCircles2(window.cantidadCirculos || 8);
animate2();