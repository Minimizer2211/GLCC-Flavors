const html = document.documentElement;
const frameCounts = { ".bgimg-1": 126, ".bgimg-2": 126, ".bgimg-3": 126, ".bgimg-4": 126 };
const baseUrls = { ".bgimg-1": "./", ".bgimg-2": "./", ".bgimg-3": "./", ".bgimg-4": "./" };
const scrollOffsets = { ".bgimg-1": 0, ".bgimg-2": 0, ".bgimg-3": 0, ".bgimg-4": 0 }; // Adjust these values as needed

const preloadImages = (selector) => {
  const frameCount = frameCounts[selector];
  const baseUrl = baseUrls[selector];
  for (let i = 1; i < frameCount; i++) {
    const frameSrc = `photos/${i.toString().padStart(4, '0')}.webp`;
    const img = new Image();
    img.src = frameSrc;
  }
};

const updateImage = (selector, index) => {
  const frameCount = frameCounts[selector];
  const baseUrl = baseUrls[selector];
  const frameSrc = `photos/${i.toString().padStart(4, '0')}.webp`;
  const bgImgElement = document.querySelector(selector);
  bgImgElement.style.backgroundImage = `url(/photos/${frameSrc})`;
};

const onScroll = () => {
  for (const selector in frameCounts) {
    const scrollTop = html.scrollTop;
    const maxScrollTop = html.scrollHeight - window.innerHeight;
    const scrollFraction = (scrollTop / maxScrollTop) - scrollOffsets[selector]; // Adjusted scroll position with offset
    let frameIndex = Math.min(
      frameCounts[selector] - 1,
      Math.ceil(scrollFraction * frameCounts[selector])
    );

    // Starting from the second frame
    frameIndex = Math.max(frameIndex, 1);

    updateImage(selector, frameIndex);
  }
};

window.addEventListener('scroll', onScroll);

for (const selector in frameCounts) {
  preloadImages(selector);
}
