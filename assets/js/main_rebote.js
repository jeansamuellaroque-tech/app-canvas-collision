const canvas3 = document.getElementById("canvas3");
const ctx3 = canvas3.getContext("2d");

canvas3.width = canvas3.offsetWidth;
canvas3.height = canvas3.offsetHeight;

class Circle3 {
  constructor(x, y, r) {
    this.x = x;
    this.y = y;
    this.r = r;

    this.dx = (Math.random() - 0.5) * 4;
    this.dy = (Math.random() - 0.5) * 4;

    this.color = "#007bff";
    this.collidingWith = new Set();
  }

  draw() {
    ctx3.beginPath();
    ctx3.shadowColor = "rgba(0,0,0,0.3)";
    ctx3.shadowBlur = 10;

    ctx3.fillStyle = this.color;
    ctx3.arc(this.x, this.y, this.r, 0, Math.PI * 2);
    ctx3.fill();
  }

  update() {
    this.draw();

    if (this.x + this.r > canvas3.width || this.x - this.r < 0) this.dx *= -1;
    if (this.y + this.r > canvas3.height || this.y - this.r < 0) this.dy *= -1;

    this.x += this.dx;
    this.y += this.dy;
  }
}

function detect3(c1, c2) {
  let dx = c1.x - c2.x;
  let dy = c1.y - c2.y;
  return Math.sqrt(dx * dx + dy * dy) <= c1.r + c2.r;
}

function resolve(c1, c2) {
  let tempX = c1.dx;
  let tempY = c1.dy;

  c1.dx = c2.dx;
  c1.dy = c2.dy;

  c2.dx = tempX;
  c2.dy = tempY;
}

function randomColor() {
  return `hsl(${Math.random() * 360},100%,50%)`;
}

let circles3 = [];

function createCircles3(n = 8) {
  circles3 = [];
  for (let i = 0; i < n; i++) {
    circles3.push(new Circle3(
      Math.random() * canvas3.width,
      Math.random() * canvas3.height,
      15 + Math.random() * 15
    ));
  }
}

function animate3() {
  requestAnimationFrame(animate3);
  ctx3.clearRect(0, 0, canvas3.width, canvas3.height);

  circles3.forEach(c => c.update());

  for (let i = 0; i < circles3.length; i++) {
    for (let j = i + 1; j < circles3.length; j++) {

      let a = circles3[i];
      let b = circles3[j];

      if (detect3(a, b)) {

        if (!a.collidingWith.has(j)) {

          resolve(a, b);

          a.color = randomColor();
          b.color = randomColor();

          a.collidingWith.add(j);
          b.collidingWith.add(i);
        }

      } else {
        a.collidingWith.delete(j);
        b.collidingWith.delete(i);
      }
    }
  }
}

createCircles3();
animate3();