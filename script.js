// script.js
document.addEventListener("DOMContentLoaded", function() {
  const html = document.documentElement;
  const frameCounts = { ".bgimg-1": 126, ".bgimg-2": 126, ".bgimg-3": 126, ".bgimg-4": 126 };
  const baseUrls = { ".bgimg-1": "./", ".bgimg-2": "./", ".bgimg-3": "./", ".bgimg-4": "./" };
  const scrollOffsets = { ".bgimg-1": 0, ".bgimg-2": 0, ".bgimg-3": 0, ".bgimg-4": 0 };

  const preloadImages = (selector) => {
    const frameCount = frameCounts[selector];
    for (let i = 0; i < frameCount; i++) {
      const frameSrc = `photos/${i.toString().padStart(4, '0')}.webp`;
      const img = new Image();
      img.src = frameSrc;
    }
  };

  const updateImage = (selector, index) => {
    const frameSrc = `photos/${index.toString().padStart(4, '0')}.webp`;
    const bgImgElement = document.querySelector(selector);
    if (bgImgElement) {
      bgImgElement.style.backgroundImage = `url(${frameSrc})`;
    }
  };

  // Preload images when the page loads
  for (const selector in frameCounts) {
    preloadImages(selector);
    updateImage(selector, 0); // Display the first frame
  }

  const onScroll = () => {
    for (const selector in frameCounts) {
      const scrollTop = html.scrollTop;
      const maxScrollTop = html.scrollHeight - window.innerHeight;
      const scrollFraction = (scrollTop / maxScrollTop) - scrollOffsets[selector];
      let frameIndex = Math.min(Math.ceil(scrollFraction * frameCounts[selector]), frameCounts[selector] - 1);
      frameIndex = Math.max(frameIndex, 0);
      updateImage(selector, frameIndex);
    }
  };

  window.addEventListener('scroll', onScroll);

  // Initial image update
  onScroll();
});
