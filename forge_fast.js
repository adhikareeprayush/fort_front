//Clientele Swiper
$(document).ready(function () {
  const industrySwiper = new Swiper(".clientele-swiper", {
    slidesPerView: 1,
    spaceBetween: 20,
    loop: true,
    autoplay: {
      delay: 3000,
      disableOnInteraction: false,
    },
    pagination: {
      el: ".clientele-swiper .swiper-pagination",
      clickable: true,
      dynamicBullets: true,
    },
    breakpoints: {
      640: { slidesPerView: 2 },
      768: { slidesPerView: 3 },
      1024: { slidesPerView: 4 },
    },
  });
});

//value-creation-programs
$(document).ready(function () {
  const value_creation_swiper = new Swiper(".value-creation-swiper", {
    slidesPerView: 1,
    // spaceBetween: 80,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
    },
    pagination: {
      el: ".value-creation-swiper .swiper-pagination",
      clickable: true,
      dynamicBullets: true,
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
  });
});

$(document).ready(function () {
  const cvs_portfolio = new Swiper(".cvs-portfolio-swiper", {
    slidesPerView: 1,
    // spaceBetween: 80,
    loop: true,
    // autoplay: {
    //   delay: 5000,
    //   disableOnInteraction: false,
    // },
    pagination: {
      el: ".cvs-portfolio-swiper .swiper-pagination",
      clickable: true,
      dynamicBullets: true,
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
  });
});

$(document).ready(function () {
  const value_creation_swiper = new Swiper(".header-swiper", {
    slidesPerView: 1,
    spaceBetween: 80,
    loop: true,
    autoplay: {
      delay: 4000,
      disableOnInteraction: false,
    },
    pagination: {
      el: ".header-swiper .swiper-pagination",
      clickable: true,
      dynamicBullets: true,
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const image = document.getElementById("mainImage");
  const layers = document.querySelectorAll(".layer");

  image.addEventListener("mousemove", (e) => {
    const bounds = image.getBoundingClientRect();
    const x = e.clientX - bounds.left;
    const y = e.clientY - bounds.top;

    layers.forEach((layer) => {
      const layerBounds = layer.getBoundingClientRect();
      const layerX = layerBounds.left + layerBounds.width / 2;
      const layerY = layerBounds.top + layerBounds.height / 2;
      const distance = Math.sqrt((x - layerX) ** 2 + (y - layerY) ** 2);

      // Adjust opacity based on distance
      if (distance < 150) {
        layer.style.opacity = 1;
      } else {
        layer.style.opacity = 0;
      }
    });
  });
});
