import "../scss/main.scss";

import { Chart, registerables } from "chart.js";
Chart.register(...registerables);
import * as bootstrap from "bootstrap";
import { initCounters } from "./counterModule.js";
import { showPreloader, hidePreloader } from "./preloader.js";

// IIFE to encapsulate the chart setup
(function () {
  // Show the preloader immediately when the script runs
  showPreloader();

  // Wait for the entire page to load
  window.addEventListener("load", () => {
    // Hide the preloader and show the main content
    hidePreloader();
  });

  // counter
  initCounters(".counter-count", 1000);

  // Global
  Chart.defaults.responsive = true;
  Chart.defaults.maintainAspectRatio = false;

  // Layout
  Chart.defaults.layout.padding = 2;

  // Font
  Chart.defaults.font.family = "Hanken Grotesk";
  Chart.defaults.font.size = 12;

  // Chart.defaults.backgroundColor = "#9BD0F5";
  Chart.defaults.borderColor = "#e5e7eb";
  Chart.defaults.color = "#9ca3af";

  // Title
  // Chart.defaults.plugins.title.display = true;

  // Legend
  // Chart.defaults.plugins.legend.display = false;

  // Point
  // Chart.defaults.elements.point.radius = 0;
  // Chart.defaults.elements.point.backgroundColor = "#ff0000";

  // Grid lines
  // Chart.defaults.scale.gridLines.color = "#f4f4f4";
  // Chart.defaults.scale.gridLines.drawBorder = false;
  // Chart.defaults.scale.gridLines.borderDash = [6, 6];
  // Chart.defaults.scale.gridLines.zeroLineColor = "#f4f4f4";

  // Line
  Chart.defaults.elements.line.tension = 0.4;
  Chart.defaults.elements.line.borderWidth = 3;
  Chart.defaults.elements.line.borderColor = "#ff0000";
  Chart.defaults.elements.line.backgroundColor = "transparent";
  Chart.defaults.elements.line.borderCapStyle = "rounded";

  // Elements
  // Chart.defaults.elements.bar.barThickness = 13;

  // Tooltips
  // Chart.defaults.plugins.tooltip.enabled = false;

  const ctx = document.getElementById("visitorsChart").getContext("2d");

  // Create gradient for "Previous Year Visitors" from blue to transparent
  const gradientPreviousYear = ctx.createLinearGradient(0, 0, 0, 400);
  gradientPreviousYear.addColorStop(0, "rgba(60, 113, 253, 0.3)"); // #3C71FD with opacity
  gradientPreviousYear.addColorStop(0.8, "rgba(60, 113, 253, 0)"); // Transparent

  // Create gradient for "This Year Visitors" from green to transparent
  const gradientThisYear = ctx.createLinearGradient(0, 0, 0, 400);
  gradientThisYear.addColorStop(0, "rgba(52, 197, 70, 0.3)"); // #34C546 with opacity
  gradientThisYear.addColorStop(0.8, "rgba(52, 197, 70, 0)"); // Transparent

  // Create the chart
  const visitorsChart = new Chart(ctx, {
    type: "line",
    data: {
      labels: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ], // x-axis labels (months)
      datasets: [
        {
          label: "Previous Year",
          data: [30, 45, 60, 50, 30, 65, 80, 75, 85, 80, 90, 85], // Data for previous year visitors
          borderColor: "rgba(60, 113, 253, 1)", // Line color
          borderWidth: 1.5,
          backgroundColor: gradientPreviousYear, // Gradient fill under the line
          tension: 0.4, // Smooth curves
          fill: true, // Enable fill under the line
        },
        {
          label: "This Year",
          data: [20, 50, 40, 20, 70, 30, 80, 90, 80, 70, 60, 50], // Data for this year visitors
          borderColor: "rgba(52, 197, 70, 1)", // Line color
          borderWidth: 1.5,
          backgroundColor: gradientThisYear, // Gradient fill under the line
          tension: 0.4,
          fill: true, // Enable fill under the line
        },
      ],
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: "top",
          align: "end",
          display: false,
          labels: {
            usePointStyle: true, // Use custom point style instead of box
            pointStyle: "ellipse", // Set point style to ellipse for oval effect
          },
          generateLabels: function (chart) {
            // Generate custom legend labels
            return chart.data.datasets.map((dataset, index) => ({
              text: dataset.label,
              fillStyle: dataset.backgroundColor,
              strokeStyle: dataset.borderColor,
              lineWidth: 2,
              hidden: !chart.isDatasetVisible(index),
              datasetIndex: index,
            }));
          },
        },

        title: {
          display: false,
          text: "This Year vs Previous Year Visitors",
        },
      },
      scales: {
        y: {
          beginAtZero: true, // Ensure y-axis starts at 0
        },
      },
    },
  });

  document.fonts.onloadingdone = () => {
    visitorsChart.update();
  };

  // Generate and inject custom legend into the page
  function generateLegend(chart) {
    let text = [];
    chart.data.datasets.forEach((dataset) => {
      text.push(
        '<li><div class="color-box" style="background-color:' +
          dataset.borderColor +
          '"></div>' +
          "<span>" +
          dataset.label +
          "</span></li>"
      );
    });
    return text.join("");
  }

  document.getElementById("customLegend").innerHTML =
    generateLegend(visitorsChart);
  // Any additional chart logic can be added here
})();
