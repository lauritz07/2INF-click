let currentIndex = 0; // Current slide index

// Select necessary elements
const carouselImages = document.querySelector('.carousel-images');
const dotsContainer = document.querySelector('.dots-container');
const images = document.querySelectorAll('.carousel-images img');

// Create dots based on the number of images
images.forEach((_, index) => {
  const dot = document.createElement('span');
  dot.className = 'dot';
  if (index === 0) dot.classList.add('active'); // First dot is active by default
  dot.addEventListener('click', () => goToSlide(index)); // Add click functionality
  dotsContainer.appendChild(dot);
});

// Function to go to a specific slide
function goToSlide(index) {
  currentIndex = index; // Update the current index
  carouselImages.style.transform = `translateX(-${currentIndex * 100}%)`; // Slide to the correct image
  updateActiveDot(currentIndex); // Update the active dot
}

// Function to update active dot
function updateActiveDot(index) {
  const dots = document.querySelectorAll('.dot');
  dots.forEach((dot, i) => {
    dot.classList.toggle('active', i === index); // Toggle active class
  });
}

// Function to auto-slide
function rotateImages() {
  currentIndex = (currentIndex + 1) % images.length; // Loop through slides
  carouselImages.style.transform = `translateX(-${currentIndex * 100}%)`; // Slide to the next image
  updateActiveDot(currentIndex); // Update the active dot
}

// Automatically rotate images every 5 seconds
setInterval(rotateImages, 5000);

// Ensure carousel images load properly on DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {
  // Adjust carousel container to match image count
  carouselImages.style.width = `${images.length * 100}%`; // Adjust total width based on images
  images.forEach((img) => {
    img.style.width = `${100 / images.length}%`; // Each image takes up equal width
  });

  // Handle "Add to Cart" functionality
  const addToCartButtons = document.querySelectorAll('.add-to-cart');
  addToCartButtons.forEach((button) => {
    button.addEventListener('click', (e) => {
      const productCard = e.target.closest('.product-card');
      const productName = productCard.querySelector('.details h2').childNodes[0].nodeValue.trim();
      const productPrice = parseFloat(productCard.querySelector('.price').textContent.replace('NOK', '').trim());
      const productImage = productCard.querySelector('.imgbox img').src;

      // Get the existing cart from localStorage
      let cart = JSON.parse(localStorage.getItem('cart')) || [];

      // Check if the item is already in the cart
      const existingItem = cart.find((item) => item.name === productName);

      if (existingItem) {
        existingItem.quantity += 1; // Increment quantity
      } else {
        // Add new item
        cart.push({
          name: productName,
          price: productPrice,
          image: productImage,
          quantity: 1,
        });
      }

      // Save updated cart to localStorage
      localStorage.setItem('cart', JSON.stringify(cart));
      alert(`${productName} has been added to the cart!`);
    });
  });
});
