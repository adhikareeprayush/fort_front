const navGroup = document.querySelectorAll(".nav_group");
const navLinks = document.querySelectorAll(".nav-link");

function highlightNav() {
  navGroup.forEach((section, index) => {
    const rect = section.getBoundingClientRect();

    if (rect.top <= 0 && rect.bottom > 0) {
      navLinks.forEach((link) => link.classList.remove("active"));
      navLinks[index].classList.add("active");
    }
  });
}

window.addEventListener("scroll", highlightNav);
