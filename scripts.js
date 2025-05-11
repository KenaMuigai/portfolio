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
