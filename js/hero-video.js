// Hero Video Background Handler
document.addEventListener("DOMContentLoaded", () => {
  const heroVideos = document.querySelectorAll('.hero-video, .tech-hero-video, .venture-hero-video');
  
  heroVideos.forEach(video => {
    // Handle video load errors
    video.addEventListener('error', () => {
      console.warn('Hero video failed to load, falling back to background image');
      const videoContainer = video.closest('.hero-video-container, .tech-hero-video-container, .venture-hero-video-container');
      if (videoContainer) {
        videoContainer.style.display = 'none';
      }
    });
    
    // Ensure video plays properly
    video.addEventListener('loadedmetadata', () => {
      video.play().catch(e => {
        console.warn('Video autoplay prevented:', e);
        // Video will show as static image if autoplay fails
      });
    });
    
    // Handle video playback issues
    video.addEventListener('stalled', () => {
      console.warn('Video playback stalled');
    });
    
    video.addEventListener('suspend', () => {
      console.warn('Video loading suspended');
    });
  });
  
  // Lazy load video when in viewport (performance optimization)
  const observerOptions = {
    root: null,
    rootMargin: '50px',
    threshold: 0.1
  };
  
  const videoObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const video = entry.target;
        if (!video.src && video.dataset.src) {
          video.src = video.dataset.src;
        }
        videoObserver.unobserve(video);
      }
    });
  }, observerOptions);
  
  heroVideos.forEach(video => {
    videoObserver.observe(video);
  });
});
