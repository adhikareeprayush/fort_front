const tabSwiper = new Swiper(".tabSwiper", {
  loop: false,
  autoHeight: true,
  allowTouchMove: true,
  spaceBetween: 20,
  on: {
    slideChange: () => {
      activateTab(tabSwiper.activeIndex);
    },
  },
  // We'll handle navigation manually
  //   navigation: {
  //     nextEl: ".custom-next",
  //     prevEl: ".custom-prev",
  //   },
});

// Manual looping logic for custom buttons
document.querySelector(".custom-next").addEventListener("click", () => {
  const totalSlides = tabSwiper.slides.length;
  const currentIndex = tabSwiper.activeIndex;

  if (currentIndex >= totalSlides - 1) {
    tabSwiper.slideTo(0); // Go to first slide
  } else {
    tabSwiper.slideNext();
  }
});

document.querySelector(".custom-prev").addEventListener("click", () => {
  const currentIndex = tabSwiper.activeIndex;

  if (currentIndex <= 0) {
    tabSwiper.slideTo(tabSwiper.slides.length - 1); // Go to last slide
  } else {
    tabSwiper.slidePrev();
  }
});

// Tab click logic
const tabHeaders = document.querySelectorAll(".tab-header");
tabHeaders.forEach((tab, index) => {
  tab.addEventListener("click", () => {
    tabSwiper.slideTo(index);
  });
});

function activateTab(index) {
  tabHeaders.forEach((tab) => tab.classList.remove("active"));
  tabHeaders[index].classList.add("active");
}

activateTab(0);
