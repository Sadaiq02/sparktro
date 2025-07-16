<script setup>
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
} from "chart.js";
import { Bar } from "vue-chartjs";

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
);

const chartData = {
  labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
  datasets: [
    {
      label: "Revenue",
      backgroundColor: "#2E90FA",
      data: [12000, 15000, 14000, 18000, 16000, 19000],
      borderRadius: 6,
      barPercentage: 0.5,
    },
    {
      label: "Expenses",
      backgroundColor: "#E74694",
      data: [10000, 11000, 9000, 13000, 12500, 14000],
      borderRadius: 6,
      barPercentage: 0.5,
    },
  ],
};

const chartOptions = {
  responsive: true,
  plugins: {
    legend: {
      display: false, // We'll use custom legend
    },
  },
  scales: {
    y: {
      ticks: {
        color: "#64748b",
        font: {
          size: 12,
          family: "Inter, sans-serif",
        },
        callback: (value) => `$${value}`,
      },
      grid: {
        color: "#f1f5f9",
      },
    },
    x: {
      ticks: {
        color: "#64748b",
        font: {
          size: 12,
          family: "Inter, sans-serif",
        },
      },
      grid: {
        display: false,
      },
    },
  },
};
</script>

<template>
  <div class="space-y-4">
    <!-- Chart -->
    <Bar :data="chartData" :options="chartOptions" />
  </div>
</template>
