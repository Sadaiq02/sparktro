<template>
  <div class="bg-white p-6 rounded-lg shadow-sm border border-gray-sparktro flex flex-col h-full">
    <div class="flex justify-between items-center mb-4">
      <div class="flex items-center space-x-6">
        <h2 class="text-lg font-semibold text-black-sparktro">Revenue</h2>
        <div class="flex items-center space-x-4">
          <div
            v-for="(seriesItem, index) in series"
            :key="seriesItem.name"
            class="flex items-center cursor-pointer"
            @click="toggleSeries(index)"
          >
            <span
              class="w-3 h-3 rounded-full mr-2"
              :style="{ backgroundColor: chartOptions.colors[index], opacity: chart && chart.series && chart.series[index] && chart.series[index].hidden ? 0.5 : 1 }"
            ></span>
            <span
              class="text-sm text-gray-700"
              :class="{ 'opacity-50 line-through': chart && chart.series && chart.series[index] && chart.series[index].hidden }"
            >
              {{ seriesItem.name }}
            </span>
          </div>
        </div>
      </div>

      <div class="relative">
        <select
          class="appearance-none text-sm border border-gray-300 rounded px-3 py-1 pr-8 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option>May 2025</option>
        </select>
        <div class="pointer-events-none absolute inset-y-0 right-2 flex items-center text-gray-500">
          <svg
            class="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </div>
      </div>
    </div>

    <apexchart
      type="area"
      :options="chartOptions"
      :series="series"
      ref="chart"
      class="flex-1"
    />
  </div>
</template>

<script setup>
import { ref } from "vue"; // No need for onMounted if not manipulating legend DOM directly
import VueApexCharts from "vue3-apexcharts";

defineOptions({ components: { apexchart: VueApexCharts } });

const chart = ref(null);

const series = ref([
  {
    name: "Revenue",
    data: [0.2, 0.3, 0.35, 0.4, 0.6, 0.78, 0.85, 0.9, 0.88, 0.92, 0.87, 0.89],
  },
  {
    name: "Expenses",
    data: [
      0.18, 0.22, 0.26, 0.3, 0.42, 0.55, 0.61, 0.68, 0.7, 0.74, 0.76, 0.78,
    ],
  },
]);

const chartOptions = ref({
  chart: {
    toolbar: { show: false },
    zoom: { enabled: false },
    height: '100%', // Crucial: Make chart fill 100% of its container's height
    events: {}, // No manual legend manipulation
  },
  colors: ["#3E82F7", "#28C76F"], // Figma colors
  dataLabels: { enabled: false },
  stroke: {
    curve: "smooth",
    width: 2,
  },
  fill: {
    type: "gradient",
    gradient: {
      shadeIntensity: 1,
      opacityFrom: 0.4,
      opacityTo: 0.1,
      stops: [0, 90, 100],
    },
  },
  xaxis: {
    categories: [
      "Jan", "Feb", "Mar", "Apr", "May", "Jun",
      "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
    ],
  },
  yaxis: {
    labels: {
      formatter: (val) => `$${val.toFixed(2)}`,
    },
  },
  tooltip: {
    y: {
      formatter: (val) => `$${(val * 10000).toFixed(2)}`,
    },
  },
  legend: {
    show: false, // Crucial: Disable ApexCharts' internal legend
  },
});

// Function to toggle series visibility from custom legend
const toggleSeries = (seriesIndex) => {
  if (chart.value) {
    chart.value.toggleSeries(series.value[seriesIndex].name);
  }
};
</script>

<style scoped>
/* No custom ApexCharts legend styles needed anymore */
</style>