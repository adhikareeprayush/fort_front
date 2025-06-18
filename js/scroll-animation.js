document.addEventListener("DOMContentLoaded", function () {
  const counters = document.querySelectorAll("h1[id^='count']");
  const options = { threshold: 0.5 }; // Trigger when 50% of the section is visible

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

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const counter = entry.target;
        const maxValue = parseInt(counter.textContent.replace(/,/g, ""), 10);
        animateCounter(counter, maxValue);
        observer.unobserve(counter); // Stop observing after animation
      }
    });
  }, options);

  counters.forEach((counter) => observer.observe(counter));
});
