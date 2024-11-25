// Check if the website is "Legacy Apparell" based on the title
if (document.title.includes("Legacy Apparell")) {
  // Apply a zoom of 50%
  document.body.style.transform = "scale(0.9)";
  document.body.style.transformOrigin = "top left";
  document.body.style.width = "111.11%"; // Adjust the width to fit the scaled content
  document.body.style.height = "111.11%"; // Adjust the height to fit the scaled content
}

// Cart Management
const cartItemsContainer = document.getElementById('cart-items');
const cartTotal = document.getElementById('cart-total');
let total = 0;

// Retrieve the cart from localStorage or initialize it
const cart = JSON.parse(localStorage.getItem('cart')) || [];

// Render the cart
if (cart.length === 0) {
  cartItemsContainer.innerHTML = '<p>Your cart is empty.</p>';
} else {
  cart.forEach((item, index) => {
    // Create a cart item element
    const cartItem = document.createElement('div');
    cartItem.classList.add('cart-item');
    cartItem.innerHTML = `
      <img src="${item.image || 'default-image.jpg'}" alt="${item.name}" class="cart-item-image">
      <div class="cart-item-details">
        <h3>${item.name}</h3>
        <p>₹${item.price}</p>
        <button class="remove-item" data-index="${index}">Remove</button>
      </div>
    `;
    cartItemsContainer.appendChild(cartItem);

    // Calculate total
    const price = parseInt(item.price.replace('₹', '').trim());
    if (!isNaN(price)) {
      total += price;
    }
  });
}

// Update cart total with formatting
cartTotal.innerHTML = `Total: ₹${total.toLocaleString()}`;

// Add "Remove" functionality
document.querySelectorAll('.remove-item').forEach(button => {
  button.addEventListener('click', (e) => {
    const index = e.target.getAttribute('data-index');
    cart.splice(index, 1); // Remove the item
    localStorage.setItem('cart', JSON.stringify(cart)); // Save updated cart
    location.reload(); // Refresh to reflect changes
  });
});
