document.addEventListener("DOMContentLoaded", () => {
    function detectDevice() {
      const width = window.innerWidth;
  
      if (width > 1200) {
        return "PC/Desktop";
      } else if (width <= 1200 && width > 768) {
        return "Laptop/iPad Pro";
      } else if (width <= 768 && width > 480) {
        return "Tablet";
      } else {
        return "Phone";
      }
    }
  
    // Detect the device
    const deviceType = detectDevice();
    console.log(`Device detected: ${deviceType}`);
  
    // Redirect to the loading screen if not a PC
    if (deviceType !== "PC/Desktop") {
      window.location.href = "loading.html"; // Replace with your actual loading page URL
    }
  });
  