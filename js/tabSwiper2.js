const tabSwiper2 = new Swiper(".tabSwiper2", {
  loop: false,
  autoHeight: true,
  allowTouchMove: true,
  spaceBetween: 20,
  on: {
    slideChange: () => {
      activateTab2(tabSwiper2.activeIndex);
    },
  },
});

// Manual looping logic for custom buttons
document.querySelector(".custom-next2").addEventListener("click", () => {
  const totalSlides = tabSwiper2.slides.length;
  const currentIndex = tabSwiper2.activeIndex;

  if (currentIndex >= totalSlides - 1) {
    tabSwiper2.slideTo(0); // Go to first slide
  } else {
    tabSwiper2.slideNext();
  }
});

document.querySelector(".custom-prev2").addEventListener("click", () => {
  const currentIndex = tabSwiper2.activeIndex;

  if (currentIndex <= 0) {
    tabSwiper2.slideTo(tabSwiper2.slides.length - 1); // Go to last slide
  } else {
    tabSwiper2.slidePrev();
  }
});

// Tab click logic
const tabHeaders2 = document.querySelectorAll(".tab-header2");
tabHeaders2.forEach((tab, index) => {
  tab.addEventListener("click", () => {
    tabSwiper2.slideTo(index);
  });
});

function activateTab2(index) {
  tabHeaders2.forEach((tab) => tab.classList.remove("active"));
  tabHeaders2[index].classList.add("active");
}

activateTab2(0);
