document.addEventListener("DOMContentLoaded", function () {
  // Target the specific metric counter IDs used in venture page
  const counterIds = ['count1', 'count2', 'count3', 'count4', 'count5', 'count6'];
  const counters = counterIds.map(id => document.getElementById(id)).filter(el => el !== null);
  
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
      
      counter.textContent = currentValue;
      
      if (progress < 1) {
        requestAnimationFrame(updateCounter);
      } else {
        // Ensure final value is exact
        counter.textContent = targetValue;
        counter.classList.remove('animating');
        animationStates.set(counter, false);
      }
    }
    
    requestAnimationFrame(updateCounter);
  }

  function resetCounter(counter) {
    counter.textContent = "0";
    animationStates.set(counter, false);
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      const counter = entry.target;
      const targetValue = parseInt(counter.getAttribute('data-original-value'), 10);
      
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
    // Store the original target value
    const originalValue = counter.textContent;
    counter.setAttribute('data-original-value', originalValue);
    
    // Initialize with 0
    counter.textContent = "0";
    
    observer.observe(counter);
  });
});
