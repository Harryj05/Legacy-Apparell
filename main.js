const cartItemsContainer = document.getElementById('cart-items');
const cartTotal = document.getElementById('cart-total');
let total = 0;

// Retrieve the cart from localStorage or initialize it
const cart = JSON.parse(localStorage.getItem('cart')) || [];

// Check if the cart is empty
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
        <button class="remove-item" data-index="${index}">Remove</button> <!-- Add data-index attribute -->
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

// Add event listeners for the "Remove" button
document.querySelectorAll('.remove-item').forEach(button => {
  button.addEventListener('click', (e) => {
    const index = e.target.getAttribute('data-index'); // Get the index of the item to remove
    cart.splice(index, 1); // Remove the item from the cart array

    // Save the updated cart to localStorage
    localStorage.setItem('cart', JSON.stringify(cart));

    // Re-render the cart items
    location.reload(); // Reload to reflect the changes (or you can use a more sophisticated approach without reloading)
  });
});
