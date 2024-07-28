document.addEventListener('DOMContentLoaded', function () {

    var closeButton = document.querySelector('.closeButton');  // Ensures it targets the right class
    var ctaBox = document.getElementById('cta');  // Ensure 'cta' is the ID of the container to close

    closeButton.addEventListener('click', function() {
        ctaBox.style.display = 'none';  // This will hide the container
    });


    // Get the container that holds all carousel items
    const carouselItemsContainer = document.querySelector('.carousel-items');
    // Retrieve all carousel items
    const items = carouselItemsContainer.querySelectorAll('.carousel-item');
    // Get the navigation container for the dots
    const carouselNav = document.querySelector('.carousel-nav');
    let currentIndex = 0; // Track the current index of the displayed item
    let isAnimating = false;

    // Clear previous dots and setup new ones based on items
    carouselNav.innerHTML = '';
    items.forEach((_, index) => {
        const dot = document.createElement('span');
        dot.className = 'dot'; // Assign class name for styling
        if (index === 0) dot.classList.add('active'); // Set the first dot as active initially
        carouselNav.appendChild(dot); // Append the dot to the navigation container
    });

    const dots = carouselNav.querySelectorAll('.dot'); // Get all dots from the navigation container

    

    function moveTo(index, forward) {
        if (isAnimating) return; // Check if animation is in progress
        isAnimating = true;
        let translateValue;

        // Calculate the translateX value based on the direction
        if (forward) {
            translateValue = -100 * index; // Move forward
        } else {
            // Calculate translateX when moving backwards or wrapping around
            translateValue = currentIndex === 0 ? -100 * (items.length - 1) : -100 * index;
        }

        // Apply the transformation to slide to the new item
        carouselItemsContainer.style.transform = `translateX(${translateValue}%)`;

        // Update the active class for dots
        dots[currentIndex].classList.remove('active');
        if (index >= items.length) {
            index = 0; // Wrap around to the first item
        }
        dots[index].classList.add('active'); // Set the new dot as active
        currentIndex = index; // Update the current index
        
        setTimeout(() => {
            isAnimating = false; // Release lock after animation
        }, 500); // Match timeout to transition time
    }

    // Event listeners for navigation arrows
    document.querySelector('.left-arrow').addEventListener('click', function () {
        // Calculate the index for the previous item, wrap around if necessary
        const nextIndex = currentIndex - 1 < 0 ? items.length - 1 : currentIndex - 1;
        moveTo(nextIndex, false); // Move left (backward)
    });

    document.querySelector('.right-arrow').addEventListener('click', function () {
        // Calculate the index for the next item, wrap around if necessary
        const nextIndex = (currentIndex + 1) % items.length;
        moveTo(nextIndex, true); // Move right (forward)
    });

    // Event listeners for keyboard navigation
    document.addEventListener('keydown', function(event) {
        if (event.key === "ArrowLeft") {  // Left arrow key
            // Calculate the index for the previous item, wrap around if necessary
            const nextIndex = currentIndex - 1 < 0 ? items.length - 1 : currentIndex - 1;
            moveTo(nextIndex, false); // Move left (backward)
        } else if (event.key === "ArrowRight") {  // Right arrow key
            // Calculate the index for the next item, wrap around if necessary
            const nextIndex = (currentIndex + 1) % items.length;
            moveTo(nextIndex, true); // Move right (forward)
        }
    });

    // Event listeners for dots
    dots.forEach((dot, index) => {
        dot.addEventListener('click', function () {
            // Determine the direction based on the dot's index relative to the current index
            const forward = index > currentIndex || (currentIndex === items.length - 1 && index === 0);
            moveTo(index, forward); // Navigate based on the chosen dot
        });
    });
});

let currentStyle = 'default'; 

function switchStyle() {
    const themeStyleLink = document.getElementById('theme-style');
    if (currentStyle === 'default') {
        themeStyleLink.href = './stylesheet/macaron_theme.css';  
        currentStyle = 'macaron';
    } else {
        themeStyleLink.href = './stylesheet/style.css';  
        currentStyle = 'default';
    }
}