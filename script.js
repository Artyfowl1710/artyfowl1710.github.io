// ------------------------------------------------------------
// Footer year
// ------------------------------------------------------------
document.getElementById("year").textContent = new Date().getFullYear();

// ------------------------------------------------------------
// Role text cycle
// ------------------------------------------------------------
const roles = [
  "ai research",
  "computer vision",
  "backend systems",
  "building zenso",
  "open source"
];
const roleEl = document.getElementById("role-text");
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (roleEl && !reducedMotion) {
  let i = 0;
  const cursor = roleEl.querySelector(".cursor");
  const textNode = document.createTextNode(roles[0]);
  roleEl.insertBefore(textNode, cursor);

  setInterval(() => {
    i = (i + 1) % roles.length;
    textNode.textContent = roles[i];
  }, 2600);
}

// ------------------------------------------------------------
// Ambient particle network — hero background
// ------------------------------------------------------------
(function initNetwork() {
  const canvas = document.getElementById("network-bg");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  let width, height, particles, animationId;

  const PARTICLE_COUNT = 46;
  const LINK_DIST = 130;
  const AMBER = "255,138,61";

  function resize() {
    const hero = canvas.parentElement;
    width = canvas.width = hero.offsetWidth;
    height = canvas.height = hero.offsetHeight;
  }

  function makeParticles() {
    particles = Array.from({ length: PARTICLE_COUNT }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.25,
      vy: (Math.random() - 0.5) * 0.25,
      r: Math.random() * 1.6 + 0.8
    }));
  }

  function step() {
    ctx.clearRect(0, 0, width, height);

    for (const p of particles) {
      p.x += p.vx;
      p.y += p.vy;
      if (p.x < 0 || p.x > width) p.vx *= -1;
      if (p.y < 0 || p.y > height) p.vy *= -1;
    }

    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const a = particles[i], b = particles[j];
        const dx = a.x - b.x, dy = a.y - b.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < LINK_DIST) {
          ctx.strokeStyle = `rgba(${AMBER}, ${0.14 * (1 - dist / LINK_DIST)})`;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
        }
      }
    }

    for (const p of particles) {
      ctx.fillStyle = `rgba(${AMBER}, 0.55)`;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fill();
    }

    animationId = requestAnimationFrame(step);
  }

  resize();
  makeParticles();

  if (!reducedMotion) {
    step();
  } else {
    // draw a single static frame
    step();
    cancelAnimationFrame(animationId);
  }

  window.addEventListener("resize", () => {
    resize();
    makeParticles();
  });
})();
