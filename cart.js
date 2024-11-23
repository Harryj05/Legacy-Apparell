const cartItemsContainer = document.getElementById('cart-items');
const cartTotal = document.getElementById('cart-total');
let total = 0;

// Retrieve the cart from localStorage or initialize it
const cart = JSON.parse(localStorage.getItem('cart')) || [];

// Check if the cart is empty
if (cart.length === 0) {
  cartItemsContainer.innerHTML = '<p>Your cart is empty.</p>';
} else {
  cart.forEach((item) => {
    // Create a cart item element
    const cartItem = document.createElement('div');
    cartItem.classList.add('cart-item');
    cartItem.innerHTML = `
      <img src="${item.image || 'default-image.jpg'}" alt="${item.name}" class="cart-item-image">
      <div class="cart-item-details">
        <h3>${item.name}</h3>
        <p>₹${item.price}</p>
      </div>
    `;
    cartItemsContainer.appendChild(cartItem);

    // Extract the price and update the total
    const price = parseInt(item.price.replace('₹', '').trim());
    if (!isNaN(price)) {
      total += price;
    }
  });
}

// Format the total to include commas for better readability
const formattedTotal = total.toLocaleString();

// Update the cart total with proper currency display
cartTotal.innerHTML = `Total: ₹${formattedTotal}`;
