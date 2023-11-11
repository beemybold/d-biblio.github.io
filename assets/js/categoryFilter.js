const categoryButtons = document.querySelectorAll('.category-filter');

// Add a click event listener to each category button
categoryButtons.forEach(button => {
  button.addEventListener('click', () => {
    const selectedCategory = button.getAttribute('data-category');
    
    // Check if the selected category is "Toutes" (All)
    if (selectedCategory.toLowerCase() === 'all') {
      // Show all products
      addDataToHTML('All');
    } else {
      // Display the filtered products based on the selected category
      addDataToHTML(selectedCategory);
    }
  });
});
