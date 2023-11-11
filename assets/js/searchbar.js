// Get references to the search bar and the container where you want to display search results.
const searchBar = document.getElementById('search_bar');
const searchResultsContainer = document.getElementById('search-results');

// Load product data from the JSON file.
fetch('products.json')
    .then(response => response.json())
    .then(data => {
        const products = data.products; // Assuming your JSON structure has a "products" key.

        // Function to perform the search and display results.
        function searchProducts() {
            const searchTerm = searchBar.value.toLowerCase();

            // Clear the previous search results.
            searchResultsContainer.innerHTML = '';

            // Filter products based on the search term.
            const filteredProducts = products.filter(product => product.name.toLowerCase().includes(searchTerm));

            // Display search results.
            filteredProducts.forEach(product => {
                const resultItem = document.createElement('div');
                resultItem.textContent = product.name;
                searchResultsContainer.appendChild(resultItem);
            });
        }

        // Add an event listener to the search bar.
        searchBar.addEventListener('input', searchProducts);
    })
    .catch(error => console.error('Error loading product data:', error));
