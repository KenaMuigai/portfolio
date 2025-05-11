const toggle = document.getElementById('toggle-dark');

// Initial mode from localStorage
const isDark = localStorage.getItem('dark') === 'on';
if (isDark) {
  document.documentElement.classList.add('dark-mode');
  toggle.textContent = '☀';
} else {
  toggle.textContent = '☾';
}

// Toggle on click
toggle.addEventListener('click', () => {
  document.documentElement.classList.toggle('dark-mode');
  const darkModeOn = document.documentElement.classList.contains('dark-mode');
  localStorage.setItem('dark', darkModeOn ? 'on' : 'off');
  toggle.textContent = darkModeOn ? '☀' : '☾';
});

// -------- TREE CANVAS SETUP (FIXED ORDER) --------
const treeCanvas = document.getElementById('tree-canvas');
const treeCtx = treeCanvas.getContext('2d');

// Set canvas size and scale for retina
const dpr = window.devicePixelRatio || 1;
treeCanvas.width = 150 * dpr;
treeCanvas.height = 150 * dpr;
treeCanvas.style.width = "150px";
treeCanvas.style.height = "150px";
treeCtx.scale(dpr, dpr);

// -------- FRACTAL TREE DRAWING --------
function drawFractalTree(ctx, x, y, length, angle, depth) {
  if (depth === 0) return;

  const xEnd = x + length * Math.cos(angle);
  const yEnd = y - length * Math.sin(angle);

  ctx.beginPath();
  ctx.moveTo(x, y);
  ctx.lineTo(xEnd, yEnd);
  ctx.stroke();

  drawFractalTree(ctx, xEnd, yEnd, length * 0.7, angle - Math.PI / 6, depth - 1);
  drawFractalTree(ctx, xEnd, yEnd, length * 0.7, angle + Math.PI / 6, depth - 1);
}

function animateFractalTree() {
  treeCtx.clearRect(0, 0, treeCanvas.width, treeCanvas.height);
  treeCtx.strokeStyle = "#ffffff";
  treeCtx.lineWidth = 1;

  drawFractalTree(treeCtx, treeCanvas.width / 2 / dpr, treeCanvas.height / dpr, 40, -Math.PI / 2, 6);

  requestAnimationFrame(animateFractalTree);
}

animateFractalTree();
