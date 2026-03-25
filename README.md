# 🎯 Simulación de Círculos con Canvas

Aplicación web interactiva desarrollada con **HTML, CSS, JavaScript y Bootstrap 5**, que permite visualizar en tiempo real el comportamiento de múltiples círculos dentro de un canvas.

Incluye simulaciones de:

* 🟢 Movimiento
* 🔴 Colisiones
* 🔵 Rebotes dinámicos

---

## 🚀 Características

✨ Interfaz moderna con **Glassmorphism**
✨ Fondo profesional con imagen y overlay
✨ Diseño responsive con **Bootstrap 5**
✨ Simulación en tiempo real con `requestAnimationFrame`
✨ Control dinámico del número de círculos
✨ Detección de colisiones entre objetos
✨ Rebotes con cambio de dirección y color

---

## 🧠 Simulaciones incluidas

### 1️⃣ Movimiento

Círculos que se desplazan libremente dentro del canvas y rebotan contra los bordes.

### 2️⃣ Colisiones

Los círculos detectan cuando se tocan y cambian de color al colisionar.

### 3️⃣ Rebotes

Simulación más avanzada donde los círculos:

* Detectan colisión
* Intercambian velocidades
* Cambian de color al impacto

---

## 🛠️ Tecnologías utilizadas

* HTML5
* CSS3 (Glassmorphism + animaciones)
* JavaScript (Canvas API)
* Bootstrap 5

---

## 📂 Estructura del proyecto

```
📁 app-canvas-collision/
│
├── index.html
│
├── assets/
│   ├── css/
│   │   └── styles.css
│   │
│   ├── js/
│   │   ├── main.js
│   │   ├── main_colision.js
│   │   └── main_rebote.js
│   │
│   └── img/
│       ├── fondo.jpg
│       └── favicon.png
```

---

## ⚙️ Funcionamiento

El usuario puede ajustar el número de círculos mediante un **slider interactivo**, lo que actualiza en tiempo real las tres simulaciones.

Cada canvas funciona de manera independiente:

* `main.js` → Movimiento
* `main_colision.js` → Detección de colisiones
* `main_rebote.js` → Rebotes físicos

---

## ▶️ Cómo ejecutar el proyecto

1. Clonar o descargar el repositorio
2. Abrir el archivo `index.html` en el navegador
3. Ajustar el número de círculos con el slider

---

## 💡 Aprendizajes

Este proyecto permite comprender:

* Uso del **Canvas en JavaScript**
* Animaciones con `requestAnimationFrame`
* Detección de colisiones entre objetos
* Manipulación del DOM
* Diseño moderno con CSS

---

## 👨‍💻 Autor

**Jean Samuel Laroque**
Ingeniería en Sistemas
Programación Web
2026

---

## 📌 Notas

Este proyecto fue desarrollado con fines educativos para comprender conceptos de simulación visual, física básica y diseño de interfaces modernas.

---

## ⭐ Mejoras futuras

* 🎮 Interacción con el mouse
* 📊 Contador de colisiones
* 🌌 Fondo animado con partículas
* 🎛 Controles avanzados de simulación

---
