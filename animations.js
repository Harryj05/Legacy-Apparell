// Function to check if an element is in the viewport
function isElementInViewport(el) {
  const rect = el.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}

// Add the 'visible' class to elements in the viewport
function handleScroll() {
  const elements = document.querySelectorAll('.animate-on-scroll');
  elements.forEach((el) => {
    if (isElementInViewport(el)) {
      el.classList.add('visible');
    }
  });
}

// Listen to the scroll event
window.addEventListener('scroll', handleScroll);

// Trigger the animation on page load in case the element is already in the viewport
handleScroll();
