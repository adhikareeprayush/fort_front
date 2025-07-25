document.addEventListener('DOMContentLoaded', function() {
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
  const nextButton = document.querySelector(".custom-next");
  const prevButton = document.querySelector(".custom-prev");
  
  if (nextButton) {
    nextButton.addEventListener("click", () => {
      const totalSlides = tabSwiper.slides.length;
      const currentIndex = tabSwiper.activeIndex;

      if (currentIndex >= totalSlides - 1) {
        tabSwiper.slideTo(0); // Go to first slide
      } else {
        tabSwiper.slideNext();
      }
    });
  }

  if (prevButton) {
    prevButton.addEventListener("click", () => {
      const currentIndex = tabSwiper.activeIndex;

      if (currentIndex <= 0) {
        tabSwiper.slideTo(tabSwiper.slides.length - 1); // Go to last slide
      } else {
        tabSwiper.slidePrev();
      }
    });
  }

  // Tab click logic
  const tabHeaders = document.querySelectorAll(".tab-header");
  tabHeaders.forEach((tab, index) => {
    tab.addEventListener("click", () => {
      tabSwiper.slideTo(index);
    });
  });

  function activateTab(index) {
    tabHeaders.forEach((tab) => tab.classList.remove("active"));
    if (tabHeaders[index]) {
      tabHeaders[index].classList.add("active");
    }
  }

  // Initialize first tab as active
  activateTab(0);
});
