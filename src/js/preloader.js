// preloader.js

// Function to show the preloader
export const showPreloader = () => {
  const preloader = document.createElement("div");
  preloader.id = "preloader";
  preloader.innerHTML = `
    <div class="loader"></div>
  `;
  document.body.appendChild(preloader);
};

// Function to hide the preloader
export const hidePreloader = () => {
  const preloader = document.getElementById("preloader");
  if (preloader) {
    preloader.style.display = "none"; // Hides the preloader
  }

  // Show the main content
  const mainContent = document.getElementById("main-content");
  if (mainContent) {
    mainContent.style.display = "block"; // Shows the main content
  }
};
