// cart.js

let iconCart = document.querySelector('.icon-cart');
let closeCart = document.querySelector('.close');
let body = document.querySelector('body');
let listProductHTML = document.querySelector('.listProduct');
let listCartHTML = document.querySelector('.listCart');
let iconCartSpan = document.querySelector('.cart-quantity');

let listProducts = [];
let carts = [];

iconCart.addEventListener('click', () => {
  body.classList.toggle('showCart')
});
closeCart.addEventListener('click', () => {
  body.classList.toggle('showCart')
});

// This function will run when the page is loaded
window.addEventListener('load', () => {
  // Add a slight delay to ensure that other content is ready
  setTimeout(() => {
    // Show all products by default
    addDataToHTML('All');
  }, 100); // You can adjust the delay in milliseconds as needed
});


const addDataToHTML = (category) => {
  const articlesCountElement = document.getElementById("articles-count");
  listProductHTML.innerHTML = '';

  const filteredProducts = (category === 'All')
    ? listProducts
    : listProducts.filter(product => product.category === category);

  if (filteredProducts.length > 0) {
    filteredProducts.forEach(product => {
      let newProduct = document.createElement('div');
      newProduct.classList.add('item');
      newProduct.dataset.id = product.id;
      newProduct.innerHTML = `
        <div class="w3-display-container book-display">
        <img src="Book_Cover/${product.cover || 'default.png'}" alt="Couverture" onclick="openModal(${product.id}, '${product.title}', '${product.author}', '${product.description}', '${product.cover}')">

          <span class="w3-tag w3-display-topleft">${product.label || ''}</span>
        </div>
        <h2 class="product-title">${product.title || 'Product Title'}</h2>
        <strong class="book-author">Auteur(e): ${product.author || 'Inconnu(e)'}</strong><br>
        <p class="book-description" id="description-${product.id}" style="display: none;">${product.description ? product.description : 'No description available.'}</p>
        <strong class="book-category">Catégories: </strong>
        <a href="#"><span class="category-name">${product.category || 'Catégorie non définie'}</span></a>
        <div class="old-price">${(product['old-price'] || 'N/A') + ' G'}</div>
        <div class="new-price">${(product['new-price'] || 'N/A') + ' G'}</div>
        <button class="addCart fa fa-shopping-cart"> Ajouter au panier</button>
      `;
      listProductHTML.appendChild(newProduct);
    });
    articlesCountElement.textContent = `${filteredProducts.length} articles`;
  } else {
    articlesCountElement.textContent = `Aucun livre n'est actuellement disponible dans cette catégorie. Veuillez choisir une autre catégorie.`;
  }
};

listProductHTML.addEventListener('click', (event) => {
  let positionClick = event.target;
  if(positionClick.classList.contains('addCart')){
    let product_id = positionClick.parentElement.dataset.id;
    addToCart(product_id);
  }
});


const addToCart = (product_id) => {
  let positionThisProductInCart = carts.findIndex((value) => value.product_id == product_id);
  if(carts.length <= 0){
    carts = [{
      product_id: product_id,
      quantity: 1
    }]
  }else if(positionThisProductInCart < 0){
    carts.push({
      product_id: product_id,
      quantity: 1
    });
  }else{
    carts[positionThisProductInCart].quantity = carts[positionThisProductInCart].quantity + 1;
  }
  addCartToHTML();
  addCartToMemory();
}

const addCartToMemory = () => {
  localStorage.setItem('cart', JSON.stringify(carts));
}

const addCartToHTML = () => {
  listCartHTML.innerHTML = '';
  let totalQuantity = 0;
  let totalCartPrice = 0; // Initialize the total cart price

  if (carts.length > 0) {
    carts.forEach(cartItem => {
      const positionProduct = listProducts.findIndex(value => value.id == cartItem.product_id);

      // Check if the product still exists in your product list
      if (positionProduct !== -1) {
        const info = listProducts[positionProduct];
        let totalPrice = cartItem.quantity * (info['new-price'] || 0);
      
        // Use toFixed(2) to limit prices to two decimal places
        let formattedPrice = totalPrice.toFixed(2);

        totalCartPrice += totalPrice; // Update the total cart price

        totalQuantity += cartItem.quantity;

        let newCart = document.createElement('div');
        newCart.classList.add('item');
        newCart.dataset.id = cartItem.product_id;

        newCart.innerHTML = `
          <div class="image">
            <img src="Book_Cover/${info.cover || 'default.jpg'}" alt="">
          </div>
          <div class="name">${info.title || 'titre du livre'}</div>
          <div class="totalPrice">${formattedPrice + ' G'}</div>
          <div class="quantity">
            <span class="minus"><</span>
            <span>${cartItem.quantity || 1}</span>
            <span class="plus">></span>
          </div>
        `;

        listCartHTML.appendChild(newCart);
      }
    });

    iconCartSpan.innerText = totalQuantity;
  }

  // Use toFixed(2) for the total cart price to limit it to two decimal places
  const formattedTotalCartPrice = totalCartPrice.toFixed(2);

  // Update the total price container
  const totalPriceContainer = document.querySelector('.total-price-container');
  totalPriceContainer.innerHTML = `<strong>Total:</strong> <span class="total-price">${formattedTotalCartPrice + ' G'}</span>`;
};



listCartHTML.addEventListener('click', (event) => {
  let positionClick = event.target;
  if (positionClick.classList.contains('minus')) {
    let product_id = positionClick.parentElement.parentElement.dataset.id;
    changeQuantityCart(product_id, 'minus'); // Call the changeQuantityCart function with 'minus'
  } else if (positionClick.classList.contains('plus')) {
    let product_id = positionClick.parentElement.parentElement.dataset.id;
    changeQuantityCart(product_id, 'plus'); // Call the changeQuantityCart function with 'plus'
  }
});

document.querySelector('.checkOut').addEventListener('click', () => {
  redirectToCheckOut();
});

const changeQuantityCart = (product_id, type) => {
  let positionItemInCart = carts.findIndex((value) => value.product_id == product_id);
  if (positionItemInCart >= 0) {
    switch (type) {
      case 'plus':
        carts[positionItemInCart].quantity = carts[positionItemInCart].quantity + 1;
        break;

      default:
        let changeQuantity = carts[positionItemInCart].quantity - 1;
        if (changeQuantity > 0) {
          carts[positionItemInCart].quantity = changeQuantity;
        } else {
          carts.splice(positionItemInCart, 1);
        }
        break;
    }
  }
  addCartToHTML();
  addCartToMemory();
}


function redirectToCheckOut() {
  const checkOutPageURL = "../checkOut.html"; // Replace with the actual URL of your checkout page

  // Calculate the total cart price
  let totalCartPrice = 0;
  if (carts.length > 0) {
    carts.forEach(cartItem => {
      const positionProduct = listProducts.findIndex(value => value.id == cartItem.product_id);
      const info = listProducts[positionProduct];
      const totalPrice = cartItem.quantity * (info['new-price'] || 0);
      totalCartPrice += totalPrice;
    });
  }

  // Check if the total price is 0
  if (totalCartPrice === 0) {
    // Display an alert if the cart is empty
    alert("The cart is empty. Please add items to the cart.");
  } else {
    // Redirect to the checkout page with cart data
    const cartData = carts.map(cartItem => {
      const positionProduct = listProducts.findIndex(value => value.id == cartItem.product_id);
      const info = listProducts[positionProduct];
      const totalPrice = cartItem.quantity * (info['new-price'] || 0);
      const formattedPrice = totalPrice.toFixed(2);
      return {
        image: info.cover || 'default.jpg',
        title: info.title || 'Product Title',
        price: formattedPrice + ' G',
        quantity: cartItem.quantity || 1,
      };
    });
    const queryParameters = encodeURIComponent(JSON.stringify(cartData));
    window.location.href = `${checkOutPageURL}?cart=${queryParameters}`;
  }
}


const initApp = () => {
  fetch('products.json')
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      listProducts = data;
      addDataToHTML();

      // Attempt to load cart data from local storage
      try {
        if (localStorage.getItem('cart')) {
          carts = JSON.parse(localStorage.getItem('cart'));
          addCartToHTML();
        }
      } catch (error) {
        console.error('Error loading cart data from local storage:', error);
      }
    })
    .catch(error => {
      console.error('Error fetching product data:', error);
    });
};

// Call initApp to start the application
initApp();
