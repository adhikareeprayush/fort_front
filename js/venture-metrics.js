document.addEventListener("DOMContentLoaded", function () {
  // Target the specific metric counter IDs used in venture page
  const counterIds = ['count1', 'count2', 'count3', 'count4', 'count5', 'count6'];
  const idCounters = counterIds.map(id => document.getElementById(id)).filter(el => el !== null);
  
  // Target CVS portfolio metric counters using class
  const classCounters = document.querySelectorAll('.metric-counter');
  
  // Combine both sets of counters
  const allCounters = [...idCounters, ...classCounters];
  
  const options = { 
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px"
  }; // Trigger when 10% of the element is visible (more sensitive)

  // Store animation state for each counter
  const animationStates = new Map();
  
  function animateCounter(counter, targetValue, prefix = '', suffix = '') {
    if (animationStates.get(counter)) return; // Prevent multiple animations
    
    animationStates.set(counter, true);
    counter.classList.add('animating');
    
    let currentValue = 0;
    const duration = 2000; // 2 seconds
    const startTime = performance.now();
    
    function updateCounter(timestamp) {
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Easing function for smooth animation (ease-out)
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      currentValue = Math.floor(easeOutQuart * targetValue);
      
      counter.textContent = prefix + currentValue + suffix;
      
      if (progress < 1) {
        requestAnimationFrame(updateCounter);
      } else {
        // Ensure final value is exact
        counter.textContent = prefix + targetValue + suffix;
        counter.classList.remove('animating');
        animationStates.set(counter, false);
      }
    }
    
    requestAnimationFrame(updateCounter);
  }

  function resetCounter(counter, prefix = '', suffix = '') {
    counter.textContent = prefix + "0" + suffix;
    animationStates.set(counter, false);
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      const counter = entry.target;
      
      if (entry.isIntersecting) {
        // For ID-based counters (legacy)
        if (counter.id && counterIds.includes(counter.id)) {
          const targetValue = parseInt(counter.getAttribute('data-original-value'), 10);
          animateCounter(counter, targetValue);
        }
        // For class-based counters (CVS portfolio)
        else if (counter.classList.contains('metric-counter')) {
          const targetValue = parseInt(counter.getAttribute('data-target'), 10);
          const prefix = counter.getAttribute('data-prefix') || '';
          const suffix = counter.getAttribute('data-suffix') || '';
          
          if (targetValue) {
            animateCounter(counter, targetValue, prefix, suffix);
          }
        }
      }
    });
  }, options);

  // Setup ID-based counters (legacy)
  idCounters.forEach((counter) => {
    const originalValue = counter.textContent;
    counter.setAttribute('data-original-value', originalValue);
    counter.textContent = "0";
    observer.observe(counter);
  });

  // Setup class-based counters (CVS portfolio)
  classCounters.forEach((counter) => {
    const prefix = counter.getAttribute('data-prefix') || '';
    const suffix = counter.getAttribute('data-suffix') || '';
    counter.textContent = prefix + "0" + suffix;
    observer.observe(counter);
  });

  // Manual trigger function for Swiper slide changes
  function triggerMetricsAnimation() {
    // Find visible metric counters in the current slide
    const visibleCounters = document.querySelectorAll('.swiper-slide-active .metric-counter');
    visibleCounters.forEach(counter => {
      const targetValue = parseInt(counter.getAttribute('data-target'), 10);
      const prefix = counter.getAttribute('data-prefix') || '';
      const suffix = counter.getAttribute('data-suffix') || '';
      
      if (targetValue && !animationStates.get(counter)) {
        animateCounter(counter, targetValue, prefix, suffix);
      }
    });
  }

  // Listen for custom metric animation events from Swiper
  document.addEventListener('animate-metric', function(event) {
    const { targetValue, prefix, suffix, counter } = event.detail;
    // Reset animation state to allow re-animation
    animationStates.set(counter, false);
    animateCounter(counter, targetValue, prefix, suffix);
  });
  
  // Listen for Swiper slide changes to trigger animations
  document.addEventListener('slidechange', triggerMetricsAnimation);
  
  // Also trigger on page load after a short delay for any visible metrics
  setTimeout(() => {
    // Trigger for regular visible metrics
    triggerMetricsAnimation();
    
    // Specifically trigger for CVS portfolio initial slide
    const initialSlide = document.querySelector('.cvs-portfolio-swiper .swiper-slide-active');
    if (initialSlide) {
      const metrics = initialSlide.querySelectorAll('.metric-counter');
      metrics.forEach(counter => {
        const targetValue = parseInt(counter.getAttribute('data-target'), 10);
        const prefix = counter.getAttribute('data-prefix') || '';
        const suffix = counter.getAttribute('data-suffix') || '';
        
        if (targetValue && !animationStates.get(counter)) {
          animateCounter(counter, targetValue, prefix, suffix);
        }
      });
    }
  }, 1500); // Longer delay to ensure Swiper is fully initialized
});
