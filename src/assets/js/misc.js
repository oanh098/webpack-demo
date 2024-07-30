import Isotope from 'isotope-layout';

(function() {
    // Add a body class once page has loaded
    // Used to add CSS transitions to elems
    // and avoids content shifting during page load
    window.addEventListener('load', function() {
        document.body.classList.add('page-loaded');
    });


    /**
   * Menu isotope and filter
   */
    window.addEventListener('load', () => {
      let menuContainer = document.querySelector('.menu-container');
      if (menuContainer) {
          let menuIsotope = new Isotope(menuContainer, {
              itemSelector: '.menu-item',
              layoutMode: 'fitRows'
          });
  
          // Select all li elements inside #menu-filters
          let menuFilters = document.querySelectorAll('#menu-filters li');
  
          // Add event listener to each li element
          menuFilters.forEach(function(filter) {
              filter.addEventListener('click', function(e) {
                  console.log('clicked');
                  e.preventDefault();
  
                  // Remove 'filter-active' class from all filter elements
                  menuFilters.forEach(function(el) {
                      el.classList.remove('filter-active');
                  });
  
                  // Add 'filter-active' class to the clicked filter
                  this.classList.add('filter-active');
  
                  // Apply the filter using Isotope
                  menuIsotope.arrange({
                      filter: this.getAttribute('data-filter')
                  });
              }, true);
          });
      }
  });
  

})();
