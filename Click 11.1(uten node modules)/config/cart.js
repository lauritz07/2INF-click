document.addEventListener('DOMContentLoaded', function() {
    updateCart();
  });
  
  function updateCart() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartItemsContainer = document.getElementById('cartItems');
    cartItemsContainer.innerHTML = '';
    let subtotal = 0;
  
    cart.forEach(item => {
      const itemSubtotal = item.price * item.quantity;
      subtotal += itemSubtotal;
  
      const cartItem = document.createElement('div');
      cartItem.className = 'cart-item';
      cartItem.innerHTML = `
        <img src="${item.image}" alt="${item.name}">
        <div>
          <h3>${item.name}</h3>
          <p>NOK ${item.price}</p>
        </div>
        <select class="quantity" onchange="changeQuantity(${item.id}, this.value)">
          ${[1, 2, 3].map(q => `<option value="${q}" ${q === item.quantity ? 'selected' : ''}>${q}</option>`).join('')}
        </select>
        <p class="subtotal">NOK ${itemSubtotal}</p>
        <button onclick="removeFromCart(${item.id})">Remove</button>
      `;
      cartItemsContainer.appendChild(cartItem);
    });
  
    document.querySelector('.cart-subtotal').innerText = `NOK ${subtotal}`;
    document.querySelector('.cart-total').innerText = `NOK ${subtotal}`;
  }
  
  function changeQuantity(id, newQuantity) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const item = cart.find(item => item.id === id);
    if (item) {
      item.quantity = parseInt(newQuantity);
      localStorage.setItem('cart', JSON.stringify(cart));
      updateCart();
    }
  }
  
  function removeFromCart(id) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart = cart.filter(item => item.id !== id);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCart();
  }
  