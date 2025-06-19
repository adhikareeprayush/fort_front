document.addEventListener("DOMContentLoaded", function () {
  const counters = document.querySelectorAll("h1[id^='count']");
  const options = { threshold: 0.5 }; // Trigger when 50% of the section is visible

  // Store original values for each counter
  const originalValues = new Map();
  counters.forEach((counter) => {
    const value = parseInt(counter.textContent.replace(/,/g, ""), 10);
    originalValues.set(counter, value);
  });

  function animateCounter(counter, maxValue) {
    let start = 0;
    const duration = 1000; // Total animation time in ms
    const increment = maxValue / (duration / 10); // Increment value for each step
    counter.style.visibility = "visible";

    const updateCounter = () => {
      start += increment;
      if (start < maxValue) {
        counter.textContent = Math.ceil(start);
        requestAnimationFrame(updateCounter);
      } else {
        counter.textContent = maxValue; // Final value
      }
    };

    updateCounter();
  }

  function resetCounter(counter) {
    counter.textContent = "0";
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      const counter = entry.target;
      const maxValue = originalValues.get(counter);
      
      if (entry.isIntersecting) {
        // Start animation when element comes into view
        animateCounter(counter, maxValue);
      } else {
        // Reset counter when element goes out of view
        resetCounter(counter);
      }
    });
  }, options);

  counters.forEach((counter) => observer.observe(counter));
});