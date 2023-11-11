// Get the query parameter from the URL
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const cartDataString = urlParams.get('cart');

if (cartDataString) {
  // Parse the JSON string into an array of cart items
  const cartData = JSON.parse(decodeURIComponent(cartDataString));

  // Now, you can loop through the cart data and populate the checkout page elements
  const list = document.querySelector('.list');
  const totalQuantityElement = document.querySelector('.totalQuantity');
  const totalPriceElement = document.querySelector('.totalPrice');

  list.innerHTML = ''; // Clear any existing content

  let totalQuantity = 0;
  let totalCartPrice = 0;

  cartData.forEach(cartItem => {
    const newCart = document.createElement('div');
    newCart.classList.add('item');

    newCart.innerHTML = `
      <img src="Book_Cover/${cartItem.image}">
      <div class="info">
        <div class="title">${cartItem.title}</div>
        <div class="price">${cartItem.price}</div>
      </div>
      <div class="quantity">${cartItem.quantity}</div>
      <div class="returnPrice">${cartItem.price}</div>
    `;

    list.appendChild(newCart);

    totalQuantity += cartItem.quantity;
    totalCartPrice += parseFloat(cartItem.price);
  });

  totalQuantityElement.textContent = totalQuantity;
  totalPriceElement.textContent = totalCartPrice.toFixed(2) + ' G';
}
