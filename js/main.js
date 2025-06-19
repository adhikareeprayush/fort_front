document.addEventListener("DOMContentLoaded", () => {
  const currentPath = window.location.pathname;
  const hamburgerMenu = document.querySelector(".hamburger-menu");
  const mobileMenu = document.querySelector(".mobile-menu");
  const navLinks = document.querySelectorAll(".nav-link");
  const contactButton = document.querySelector(".contact-btn");
  const closeMenu = document.querySelector(".close-menu");
  document.addEventListener("scroll", () => {
    const navbar = document.querySelector("nav");
    if (window.scrollY > 80) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  });

  // Toggle mobile menu visibility
  hamburgerMenu.addEventListener("click", () => {
    mobileMenu.classList.toggle("show");
    mobileMenu.classList.toggle("hide");
  });
  closeMenu.addEventListener("click", () => {
    mobileMenu.classList.toggle("show");
    mobileMenu.classList.toggle("hide");
  });
  // Close mobile menu on link or button click
  [...navLinks, contactButton].forEach((element) => {
    element.addEventListener("click", () => {
      mobileMenu.classList.add("hide");
      mobileMenu.classList.remove("show");
    });
  });

  // Set active navigation link based on current page
  navLinks.forEach((link) => {
    // Remove any existing active class first
    link.classList.remove("active");
    
    const linkPath = new URL(link.href).pathname;
    const currentPath = window.location.pathname;
    
    // Handle exact matches and special cases
    if (linkPath === currentPath) {
      link.classList.add("active");
    } else if (currentPath.includes("index.html") && link.textContent.trim() === "About") {
      link.classList.add("active");
    } else if (currentPath === "/" && link.textContent.trim() === "About") {
      link.classList.add("active");
    } else if (currentPath.includes("fort_talent") && link.textContent.trim() === "Talent") {
      link.classList.add("active");
    } else if (currentPath.includes("fort_technology") && link.textContent.trim() === "Technology") {
      link.classList.add("active");
    } else if (currentPath.includes("fort_venture") && link.textContent.trim() === "Ventures") {
      link.classList.add("active");
    }
  });
});
