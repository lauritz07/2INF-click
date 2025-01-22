let currentIndex = 0; // Nåværende slideindeks

// Velg nødvendige elementer
const carouselImages = document.querySelector('.carousel-images');
const dotsContainer = document.querySelector('.dots-container');
const images = document.querySelectorAll('.carousel-images img');

// Lag prikker basert på antall bilder
images.forEach((_, index) => {
  const dot = document.createElement('span');
  dot.className = 'dot';
  if (index === 0) dot.classList.add('active'); // Første prikk er aktiv som standard
  dot.addEventListener('click', () => goToSlide(index)); // Legg til klikk-funksjonalitet
  dotsContainer.appendChild(dot);
});

// Funksjon for å gå til en spesifikk slide
function goToSlide(index) {
  currentIndex = index; // Oppdater nåværende indeks
  carouselImages.style.transform = `translateX(-${currentIndex * 100}%)`; // Slide til riktig bilde
  updateActiveDot(currentIndex); // Oppdater aktiv prikk
}

// Funksjon for å oppdatere aktiv prikk
function updateActiveDot(index) {
  const dots = document.querySelectorAll('.dot');
  dots.forEach((dot, i) => {
    dot.classList.toggle('active', i === index); // Toggle aktiv klasse
  });
}

// Funksjon for å auto-slide
function rotateImages() {
  currentIndex = (currentIndex + 1) % images.length; // Loop gjennom slides
  carouselImages.style.transform = `translateX(-${currentIndex * 100}%)`; // Slide til neste bilde
  updateActiveDot(currentIndex); // Oppdater aktiv prikk
  console.log(`Image rotated to index: ${currentIndex}`); // Feilsøkingsmelding
}

// Last inn bilder og start karusellen
document.addEventListener('DOMContentLoaded', () => {
  let loadedImagesCount = 0;

  images.forEach((img) => {
    img.addEventListener('load', () => {
      loadedImagesCount++;
      if (loadedImagesCount === images.length) {
        carouselImages.style.width = `${images.length * 100}%`; // Juster total bredde basert på bilder
        images.forEach((img) => {
          img.style.width = `${100 / images.length}%`; // Hvert bilde tar opp lik bredde
        });
        console.log('All images loaded. Starting carousel rotation.'); // Feilsøkingsmelding
        setInterval(rotateImages, 5000); // Start bildekarrusell rotasjon hvert 5. sekund
      }
    });
  });
});
