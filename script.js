const canvas = document.querySelector('.fireworks');
const ctx = canvas.getContext('2d');
let w = canvas.width = window.innerWidth;
let h = canvas.height = window.innerHeight;

const particles = [];

function random(min, max) {
  return Math.random() * (max - min) + min;
}

function createFirework() {
  const x = random(100, w - 100);
  const y = random(100, h / 2);
  const colors = ['#ff0000', '#ffff00', '#ff6600', '#00ccff', '#ffffff'];
  for (let i = 0; i < 50; i++) {
    particles.push({
      x, y,
      angle: random(0, Math.PI * 2),
      speed: random(1, 5),
      radius: random(1, 3),
      color: colors[Math.floor(random(0, colors.length))],
      life: 100
    });
  }
}

function animate() {
  ctx.clearRect(0, 0, w, h);
  particles.forEach((p, i) => {
    const vx = Math.cos(p.angle) * p.speed;
    const vy = Math.sin(p.angle) * p.speed;
    p.x += vx;
    p.y += vy;
    p.life--;
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
    ctx.fillStyle = p.color;
    ctx.fill();
    if (p.life <= 0) particles.splice(i, 1);
  });
  requestAnimationFrame(animate);
}

setInterval(createFirework, 800);
animate();

window.addEventListener('resize', () => {
  w = canvas.width = window.innerWidth;
  h = canvas.height = window.innerHeight;
});

const titleText = "শুভ নববর্ষ ১৪৩২!";
const titleElement = document.getElementById("boishakh-title");

function animateTitle() {
  titleElement.innerHTML = ""; // Clear previous animation
  const span = document.createElement("span");
  span.textContent = titleText;
  span.className = "fancy-letter whole-title";
  titleElement.appendChild(span);

  setTimeout(() => {
    titleElement.classList.add("animate-finished");
  }, 2000);
}

animateTitle(); // Initial call
setInterval(animateTitle, 3000); // Repeat every 3 seconds