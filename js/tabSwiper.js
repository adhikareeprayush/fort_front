document.addEventListener('DOMContentLoaded', function() {
  const tabSwiper = new Swiper(".tabSwiper", {
    slidesPerView: 1,
    spaceBetween: 20,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
    },
    allowTouchMove: true,
    speed: 600,
    effect: 'slide',
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
      const totalSlides = tabSwiper.slides.length;
      const currentIndex = tabSwiper.activeIndex;
      if (currentIndex <= 0) {
        tabSwiper.slideTo(totalSlides - 1); // Go to last slide (fixed: was totalSlides)
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
    if (tabHeaders[index] && index < tabHeaders.length) {
      tabHeaders[index].classList.add("active");
    } else if (tabHeaders.length > 0) {
      tabHeaders[0].classList.add("active");
    }
  }
  
});