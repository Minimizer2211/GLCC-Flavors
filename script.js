document.addEventListener("DOMContentLoaded", function() {
    const html = document.documentElement;
    const frameCounts = { ".bgimg-1": 126, ".bgimg-2": 126, ".bgimg-3": 126, ".bgimg-4": 126 };
    const baseUrls = { ".bgimg-1": "./", ".bgimg-2": "./", ".bgimg-3": "./", ".bgimg-4": "./" };
    const scrollOffsets = { ".bgimg-1": 0, ".bgimg-2": 0, ".bgimg-3": 0, ".bgimg-4": 0 }; // Adjust these values as needed

    const preloadImages = (selector) => {
      const frameCount = frameCounts[selector];
      const baseUrl = baseUrls[selector];
      for (let i = 0; i < frameCount; i++) { // Adjusted loop to start from 0
        const frameSrc = `photos/${i.toString().padStart(4, '0')}.webp`;
        console.log("Preloading image:", frameSrc); // Log the image URL
        const img = new Image();
        img.src = frameSrc;
      }
    };

    const updateImage = (selector, index) => {
      const frameSrc = `photos/${index.toString().padStart(4, '0')}.webp`;
      console.log("Updating image:", frameSrc); // Log the image URL
      const bgImgElement = document.querySelector(selector);
      if (bgImgElement) { // Ensure element exists before updating
          bgImgElement.style.backgroundImage = `url(${frameSrc})`;
      } else {
          console.error("Element not found for selector:", selector);
      }
    };

    // Preload images when the page loads
    for (const selector in frameCounts) {
      preloadImages(selector);
      // Update the background image for each selector immediately after preloading
      updateImage(selector, 0); // Display the first frame
    }

    const onScroll = () => {
      for (const selector in frameCounts) {
        const scrollTop = html.scrollTop;
        const maxScrollTop = html.scrollHeight - window.innerHeight;
        const scrollFraction = (scrollTop / maxScrollTop) - scrollOffsets[selector]; // Adjusted scroll position with offset
        let frameIndex = Math.min(
          Math.ceil(scrollFraction * frameCounts[selector]), // Corrected frame index calculation
          frameCounts[selector] - 1
        );

        // Ensure frame index is at least 0
        frameIndex = Math.max(frameIndex, 0);

        updateImage(selector, frameIndex);
      }
    };

    window.addEventListener('scroll', onScroll);
});
