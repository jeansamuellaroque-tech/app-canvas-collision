const canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");

// Dimensiones
const window_height = window.innerHeight / 2;
const window_width = window.innerWidth / 2;

canvas.height = window_height;
canvas.width = window_width;
canvas.style.background = "#ff8";

// Clase Circle
class Circle {
  constructor(x, y, radius, color, text, speed) {
    this.posX = x;
    this.posY = y;
    this.radius = radius;
    this.color = color;
    this.text = text;
    this.speed = speed;

    this.dx = (Math.random() - 0.5) * this.speed * 2;
    this.dy = (Math.random() - 0.5) * this.speed * 2;

    // 🔥 Para controlar colisiones únicas
    this.collidingWith = new Set();
  }

  draw(context) {
    context.beginPath();

    context.strokeStyle = this.color;
    context.textAlign = "center";
    context.textBaseline = "middle";
    context.font = "20px Arial";

    context.fillText(this.text, this.posX, this.posY);

    context.lineWidth = 2;
    context.arc(this.posX, this.posY, this.radius, 0, Math.PI * 2);
    context.stroke();
    context.closePath();
  }

  update(context) {
    this.draw(context);

    // Rebote paredes
    if ((this.posX + this.radius) > window_width || (this.posX - this.radius) < 0) {
      this.dx = -this.dx;
    }

    if ((this.posY + this.radius) > window_height || (this.posY - this.radius) < 0) {
      this.dy = -this.dy;
    }

    this.posX += this.dx;
    this.posY += this.dy;
  }
}

// 🔍 Detectar colisión
function detectCollision(c1, c2) {
  let dx = c1.posX - c2.posX;
  let dy = c1.posY - c2.posY;
  let distance = Math.sqrt(dx * dx + dy * dy);

  return distance <= (c1.radius + c2.radius);
}

// 🎨 Color random
function randomColor() {
  return "hsl(" + Math.random() * 360 + ", 100%, 50%)";
}

// 🔢 Crear N círculos
let circles = [];
let N = 10; // 🔥 puedes cambiar la cantidad

for (let i = 0; i < N; i++) {
  let radius = Math.floor(Math.random() * 40 + 20);
  let x = Math.random() * (window_width - radius * 2) + radius;
  let y = Math.random() * (window_height - radius * 2) + radius;

  let circle = new Circle(x, y, radius, "blue", i + 1, 3);
  circles.push(circle);
}

// 🔁 Animación
function updateCircle() {
  requestAnimationFrame(updateCircle);
  ctx.clearRect(0, 0, window_width, window_height);

  // Actualizar posiciones
  circles.forEach(c => c.update(ctx));

  // 🔥 Detectar colisiones únicas
  for (let i = 0; i < circles.length; i++) {
    for (let j = i + 1; j < circles.length; j++) {

      let c1 = circles[i];
      let c2 = circles[j];

      let isColliding = detectCollision(c1, c2);

      if (isColliding) {

        // SOLO cuando inicia el choque
        if (!c1.collidingWith.has(j)) {
          c1.color = randomColor();
          c2.color = randomColor();

          c1.collidingWith.add(j);
          c2.collidingWith.add(i);
        }

      } else {
        // Limpiar cuando se separan
        c1.collidingWith.delete(j);
        c2.collidingWith.delete(i);
      }
    }
  }
}

updateCircle();