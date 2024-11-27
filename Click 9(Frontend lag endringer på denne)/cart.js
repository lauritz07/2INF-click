document.addEventListener("DOMContentLoaded", () => {
  const cartItemsContainer = document.getElementById("cart-items");
  const cartSubtotalElement = document.getElementById("cart-subtotal");

  // Load cart from localStorage
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  // Function to render cart items
  const renderCartItems = () => {
    cartItemsContainer.innerHTML = ""; // Clear previous cart items

    if (cart.length === 0) {
      cartItemsContainer.innerHTML = "<p>Your cart is empty!</p>";
      cartSubtotalElement.textContent = "0";
      return;
    }

    let subtotal = 0;

    cart.forEach((item, index) => {
      const itemSubtotal = (item.price * item.quantity).toFixed(2);
      subtotal += parseFloat(itemSubtotal);

      const cartItem = document.createElement("div");
      cartItem.classList.add("cart-item");
      cartItem.innerHTML = `
        <div class="cart-item-details">
          <img src="${item.image}" alt="${item.name}">
          <div>
            <h3>${item.name}</h3>
            <p>${item.price.toFixed(2)} NOK</p>
            <input type="number" min="1" value="${item.quantity}" class="quantity-input" data-index="${index}">
          </div>
        </div>
        <div class="cart-item-actions">
          <p>${itemSubtotal} NOK</p>
          <button class="remove-item" data-index="${index}">Remove</button>
        </div>
      `;
      cartItemsContainer.appendChild(cartItem);
    });

    cartSubtotalElement.textContent = subtotal.toFixed(2);
  };

  // Event listener for quantity changes
  cartItemsContainer.addEventListener("input", (e) => {
    if (e.target.classList.contains("quantity-input")) {
      const index = e.target.dataset.index;
      const newQuantity = parseInt(e.target.value);

      if (newQuantity > 0) {
        cart[index].quantity = newQuantity;
        localStorage.setItem("cart", JSON.stringify(cart));
        renderCartItems();
      }
    }
  });

  // Event listener for removing items
  cartItemsContainer.addEventListener("click", (e) => {
    if (e.target.classList.contains("remove-item")) {
      const index = e.target.dataset.index;
      cart.splice(index, 1); // Remove item from cart
      localStorage.setItem("cart", JSON.stringify(cart));
      renderCartItems();
    }
  });

  // Initial render
  renderCartItems();
});
