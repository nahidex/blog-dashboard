// Function to update the counter for a specific element
const updateCounter = (element, target, suffix, duration) => {
  let count = 0;
  const interval = 10; // Adjust for smoother animation
  const increment = target / (duration / interval);

  // Function to format the number based on whether it is an integer
  const formatNumber = (num) => {
    // Check if number is an integer
    if (Number.isInteger(num)) {
      // Format as integer with commas only
      return num.toLocaleString();
    } else {
      // Format with up to two decimal places
      return num.toLocaleString(undefined, {
        minimumFractionDigits: 0,
        maximumFractionDigits: 2,
      });
    }
  };

  // Animate the counter
  const animate = () => {
    count += increment;
    if (count < target) {
      // Format and update the count
      element.textContent = `${formatNumber(count)}${suffix}`;
      setTimeout(animate, interval);
    } else {
      // Ensure the final count is correctly formatted
      element.textContent = `${formatNumber(target)}${suffix}`;
    }
  };

  animate();
};

// Function to initialize counters for all elements with the specified class
const initCounters = (selector, duration = 4000) => {
  const elements = document.querySelectorAll(selector);

  elements.forEach((element) => {
    // Extract numeric value and suffix (if any)
    const textContent = element.textContent.trim();
    // Remove commas before processing
    const cleanedText = textContent.replace(/,/g, "");
    // Match numeric value (including decimals) and optional suffix
    const match = cleanedText.match(/^([\d.]+)([Kk]?)$/);

    if (match) {
      const target = parseFloat(match[1]); // Numeric part with decimals
      const suffix = match[2].toUpperCase(); // Standardize suffix to uppercase (e.g., "K")

      // Run the counter animation
      updateCounter(element, target, suffix, duration);
    }
  });
};

// Export the initCounters function to be used in other files
export { initCounters };
