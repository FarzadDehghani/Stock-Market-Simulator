let stockChart;
let priceData = [100]; // Initial stock price
let labels = [new Date().toLocaleTimeString()]; // Time labels
let simulationInterval;
let maxDataPoints = 20; // Max number of data points to show

const ctx = document.getElementById("stockChart").getContext("2d");

// Initialize chart with Chart.js
function initializeChart() {
  stockChart = new Chart(ctx, {
    type: "line",
    data: {
      labels: labels,
      datasets: [
        {
          label: "Stock Price",
          data: priceData,
          borderColor: "rgba(75, 192, 192, 1)",
          backgroundColor: "rgba(75, 192, 192, 0.2)",
          fill: true,
          tension: 0.4,
        },
      ],
    },
    options: {
      responsive: true,
      scales: {
        x: {
          type: "category", // Use category scale for string labels
        },
        y: {
          beginAtZero: false,
        },
      },
    },
  });
}

// Function to generate random price data
function generateRandomPrice() {
  const lastPrice = priceData[priceData.length - 1];
  const volatility = 1; // Price fluctuation
  const change = (Math.random() - 0.5) * volatility;
  return Math.max(0, lastPrice + change);
}

// Update chart function
function updateChart() {
  const newPrice = generateRandomPrice();
  priceData.push(newPrice);
  labels.push(new Date().toLocaleTimeString());

  // Keep the number of data points to a maximum of 20
  if (priceData.length > maxDataPoints) {
    priceData = priceData.slice(priceData.length - maxDataPoints); // Keep only the last 20 points
    labels = labels.slice(labels.length - maxDataPoints); // Keep only the last 20 labels
  }

  // Update the chart data directly
  stockChart.data.labels = labels;
  stockChart.data.datasets[0].data = priceData;

  // Trigger the chart update
  stockChart.update();
}

// Start simulation
function startSimulation() {
  simulationInterval = setInterval(updateChart, 1000);
}

// Stop simulation
function stopSimulation() {
  clearInterval(simulationInterval);
}

// HTML elements and event listeners
document.getElementById("start-btn").addEventListener("click", startSimulation);
document.getElementById("stop-btn").addEventListener("click", stopSimulation);

// Display initial chart
initializeChart();
