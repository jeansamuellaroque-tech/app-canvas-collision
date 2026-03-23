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

    // Rebote con paredes
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

// 💥 Resolver rebote (colisión)
function resolveCollision(c1, c2) {
  // Intercambiar velocidades (rebote simple)
  let tempDx = c1.dx;
  let tempDy = c1.dy;

  c1.dx = c2.dx;
  c1.dy = c2.dy;

  c2.dx = tempDx;
  c2.dy = tempDy;

  // Separarlos para evitar que se queden pegados
  let dx = c2.posX - c1.posX;
  let dy = c2.posY - c1.posY;
  let distance = Math.sqrt(dx * dx + dy * dy);

  let overlap = (c1.radius + c2.radius) - distance;

  if (overlap > 0) {
    let nx = dx / distance;
    let ny = dy / distance;

    c1.posX -= nx * overlap / 2;
    c1.posY -= ny * overlap / 2;

    c2.posX += nx * overlap / 2;
    c2.posY += ny * overlap / 2;
  }
}

// 🎨 Color random (opcional)
function randomColor() {
  return "hsl(" + Math.random() * 360 + ", 100%, 50%)";
}

// Crear N círculos
let circles = [];
let N = 10;

for (let i = 0; i < N; i++) {
  let radius = Math.floor(Math.random() * 40 + 20);
  let x = Math.random() * (window_width - radius * 2) + radius;
  let y = Math.random() * (window_height - radius * 2) + radius;

  circles.push(new Circle(x, y, radius, "blue", i + 1, 3));
}

// Animación
function updateCircle() {
  requestAnimationFrame(updateCircle);
  ctx.clearRect(0, 0, window_width, window_height);

  circles.forEach(c => c.update(ctx));

  // 🔥 Colisiones con rebote
  for (let i = 0; i < circles.length; i++) {
    for (let j = i + 1; j < circles.length; j++) {

      let c1 = circles[i];
      let c2 = circles[j];

      if (detectCollision(c1, c2)) {

        // Evitar múltiples rebotes seguidos
        if (!c1.collidingWith.has(j)) {

          resolveCollision(c1, c2);

          // (opcional) cambio de color
          c1.color = randomColor();
          c2.color = randomColor();

          c1.collidingWith.add(j);
          c2.collidingWith.add(i);
        }

      } else {
        c1.collidingWith.delete(j);
        c2.collidingWith.delete(i);
      }
    }
  }
}

updateCircle();