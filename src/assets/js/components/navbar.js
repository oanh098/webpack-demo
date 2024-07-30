// Import the Bootstrap Navbar component
import { Navbar } from 'bootstrap';

// Self-executing anonymous function to scope your code
(function () {
  // Find the toggle button
  const toggleButton = document.querySelector('.navbar-toggler');

  // Scroll event handling in vanilla JavaScript
  window.addEventListener('scroll', () => {
    const navbar = document.querySelector('#navbar');
  
      if (navbar) {
        console.log('d-none');
        // navbar.classList.toggle('d-none', window.scrollY > 50);
      }
      
  });
  
  // To ensure the navbar classes are updated on resize
  window.addEventListener('resize', () => {
    const navbar = document.querySelector('#navbar');
    const navbarTop = document.querySelector('#navbarTop');
  
      // Remove classes if the screen size is below large
      if (navbar) {
        // navbar.classList.remove('d-none');
      }
      
  });
  

  // Function to handle toggle action
  const customToggleFunction = () => {
    const navbarCollapse = document.querySelector('#navbarCollapse');
    const isExpanded = toggleButton.getAttribute('aria-expanded') === 'true';

    // Log custom message to console
    console.log('Toggle button clicked!');

    // Toggle the aria-expanded attribute
    toggleButton.setAttribute('aria-expanded', !isExpanded);

    // Collapse or expand the navbar
    // if (isExpanded) {
    //   navbarCollapse.classList.remove('flex-grow-1');
    // } else {
    //   navbarCollapse.classList.add('flex-grow-1');
    // }
  };

  // Attach event listener to the toggle button
  toggleButton.addEventListener('click', customToggleFunction);
})();
