// Auto Carousel for Innovation Practicum
class PracticumCarousel {
  constructor() {
    this.currentSlide = 0;
    this.totalSlides = 2;
    this.autoPlayInterval = 5000; // 5 seconds
    this.autoPlayTimer = null;
    
    this.track = document.getElementById('practicumCarousel');
    this.indicators = document.querySelectorAll('.indicator');
    
    this.init();
  }
  
  init() {
    if (!this.track) return;
    
    // Add click handlers to indicators
    this.indicators.forEach((indicator, index) => {
      indicator.addEventListener('click', () => {
        this.goToSlide(index);
      });
    });
    
    // Start auto play
    this.startAutoPlay();
    
    // Pause on hover
    const carouselContainer = document.querySelector('.auto-carousel-wrapper');
    if (carouselContainer) {
      carouselContainer.addEventListener('mouseenter', () => {
        this.pauseAutoPlay();
      });
      
      carouselContainer.addEventListener('mouseleave', () => {
        this.startAutoPlay();
      });
    }
  }
  
  goToSlide(slideIndex) {
    this.currentSlide = slideIndex;
    const translateX = -slideIndex * 50; // 50% per slide
    
    this.track.style.transform = `translateX(${translateX}%)`;
    
    // Update indicators
    this.indicators.forEach((indicator, index) => {
      indicator.classList.toggle('active', index === slideIndex);
    });
  }
  
  nextSlide() {
    const nextIndex = (this.currentSlide + 1) % this.totalSlides;
    this.goToSlide(nextIndex);
  }
  
  startAutoPlay() {
    this.pauseAutoPlay(); // Clear any existing timer
    this.autoPlayTimer = setInterval(() => {
      this.nextSlide();
    }, this.autoPlayInterval);
  }
  
  pauseAutoPlay() {
    if (this.autoPlayTimer) {
      clearInterval(this.autoPlayTimer);
      this.autoPlayTimer = null;
    }
  }
}

// Initialize carousel when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  new PracticumCarousel();
});
