document.addEventListener("DOMContentLoaded", function () {
  const counters = document.querySelectorAll(".metric-counter");
  const options = { 
    threshold: 0.3,
    rootMargin: "0px 0px -100px 0px"
  }; // Trigger when 30% of the element is visible

  // Store animation state for each counter
  const animationStates = new Map();
  
  function animateCounter(counter, targetValue) {
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
      
      // Format number with leading zero if original had it and value < 10
      const originalText = counter.getAttribute('data-target');
      if (originalText.length === 2 && originalText.startsWith('0') && currentValue < 10) {
        counter.textContent = '0' + currentValue;
      } else {
        counter.textContent = currentValue;
      }
      
      if (progress < 1) {
        requestAnimationFrame(updateCounter);
      } else {
        // Ensure final value is exact
        if (originalText.length === 2 && originalText.startsWith('0') && targetValue < 10) {
          counter.textContent = '0' + targetValue;
        } else {
          counter.textContent = targetValue;
        }
        counter.classList.remove('animating');
        animationStates.set(counter, false);
      }
    }
    
    requestAnimationFrame(updateCounter);
  }

  function resetCounter(counter) {
    const originalText = counter.getAttribute('data-target');
    if (originalText.length === 2 && originalText.startsWith('0')) {
      counter.textContent = "00";
    } else {
      counter.textContent = "0";
    }
    animationStates.set(counter, false);
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      const counter = entry.target;
      const targetValue = parseInt(counter.getAttribute('data-target'), 10);
      
      if (entry.isIntersecting) {
        // Start animation when element comes into view
        animateCounter(counter, targetValue);
      } else {
        // Reset counter when element goes out of view (optional)
        // Uncomment the line below if you want counters to reset when out of view
        // resetCounter(counter);
      }
    });
  }, options);

  // Observe all metric counters
  counters.forEach((counter) => {
    // Initialize with 0 or 00 based on original format
    const originalText = counter.getAttribute('data-target');
    if (originalText.length === 2 && originalText.startsWith('0')) {
      counter.textContent = "00";
    } else {
      counter.textContent = "0";
    }
    
    observer.observe(counter);
  });
});
