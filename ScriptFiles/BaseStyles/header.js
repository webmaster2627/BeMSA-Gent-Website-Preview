function toggleMenu() {
  document.getElementById("mobileMenu").classList.toggle("active");
  document.getElementById("backdrop").classList.toggle("active");
}

function closeMenu() {
  document.getElementById("mobileMenu").classList.remove("active");
  document.getElementById("backdrop").classList.remove("active");
}

function toggleSubmenu(e) {
  e.preventDefault();
  const parent = e.target.closest("li");
  parent.classList.toggle("open");
}

// Close with ESC key
document.addEventListener("keydown", function(e) {
  if (e.key === "Escape") {
    closeMenu();
  }
});