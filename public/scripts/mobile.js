const mobileMenuBtn = document.getElementById("mobileMenuBtn");
const mobileMenu = document.getElementById("mobileMenu");

function toggleMobileMenu(event) {
  mobileMenu.classList.toggle("open");
}

mobileMenuBtn.addEventListener("click", toggleMobileMenu);
