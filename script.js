function showSection(id) {
  document.querySelectorAll('.sezione').forEach(s => s.style.display = 'none');
  document.getElementById(id).style.display = 'block';
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function goHome() {
  document.querySelectorAll('.sezione').forEach(s => s.style.display = 'none');
  window.scrollTo({ top: 0, behavior: 'smooth' });
}