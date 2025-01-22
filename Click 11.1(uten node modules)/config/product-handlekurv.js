document.addEventListener('DOMContentLoaded', function() {
    fetch('http://IP-adress:port/products')
      .then(response => response.json())
      .then(data => {
        const productGrid = document.getElementById('productGrid');
        productGrid.innerHTML = '';
        data.forEach(product => {
          const productCard = document.createElement('div');
          productCard.className = 'product-card';
          productCard.innerHTML = `
            <div class="imgbox">
              <img src="${product.image_url}" alt="Product Image">
            </div>
            <div class="details">
              <h2>${product.product_name}<br><span>${product.description}</span></h2>
              <div class="price">NOK ${product.price}</div>
            </div>
            <button onclick="addToCart(${product.id}, '${product.product_name}', ${product.price}, '${product.image_url}', 1)" class="add-to-cart">Add To Cart</button>
          `;
          productGrid.appendChild(productCard);
        });
      })
      .catch(error => console.error('Error fetching products:', error));
  });
  
  function addToCart(productId, name, price, image, quantity) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const existingItem = cart.find(item => item.id === productId);
    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.push({ id: productId, name: name, price: price, image: image, quantity: quantity });
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    alert('Product added to cart');
  }
  