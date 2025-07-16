<script setup>
import { ref, onMounted } from 'vue';
import VueApexCharts from 'vue3-apexcharts';

const selectedMonth = ref('May 2025');

const series = ref([
  {
    name: 'Sales',
    data: [0.1, 0.3, 0.5, 0.7, 0.6, 0.8, 0.9, 0.7, 0.5, 0.3, 0.2, 0.1],
  },
  {
    name: 'Order',
    data: [0.2, 0.4, 0.6, 0.8, 0.7, 0.9, 0.8, 0.6, 0.4, 0.3, 0.2, 0.1],
  },
]);

const chartOptions = ref({
  chart: {
    type: 'bar',
    height: 350,
    toolbar: { show: false },
    events: {
      mounted: (chartContext, config) => {
        updateCustomLegend(chartContext, config);
      },
      updated: (chartContext, config) => {
        updateCustomLegend(chartContext, config);
      },
      legendClick: (chartContext, seriesIndex, config) => {
        // Prevent default legend click behavior
        return false;
      }
    }
  },
  colors: ['#34C759', '#A6C7FF'], // Figma green & light blue
  plotOptions: {
    bar: {
      horizontal: false,
      columnWidth: '65%',
      borderRadius: 6,
    },
  },
  dataLabels: {
    enabled: false,
  },
  legend: {
    show: false, // We'll use custom legend
  },
  stroke: {
    show: true,
    width: 2,
    colors: ['transparent'],
  },
  xaxis: {
    categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    labels: {
      style: {
        fontSize: '12px',
        colors: '#6B7280',
      },
    },
    axisBorder: {
      show: false,
    },
    axisTicks: {
      show: false,
    },
  },
  yaxis: {
    labels: {
      style: {
        fontSize: '12px',
        colors: '#6B7280',
      },
      formatter: (val) => `$${val.toFixed(1)}`,
    },
    min: 0,
    max: 1,
    tickAmount: 5,
  },
  grid: {
    borderColor: '#F3F4F6',
    strokeDashArray: 4,
    padding: {
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
    },
  },
  fill: {
    opacity: 1,
  },
  tooltip: {
    y: {
      formatter: (val) => `$${(val * 1000).toFixed(2)}`,
    },
  },
});

const updateCustomLegend = (chartContext, config) => {
  const legendContainer = document.getElementById('custom-legend-sales');
  if (!legendContainer) return;

  legendContainer.innerHTML = '';

  config.config.series.forEach((series, index) => {
    const color = config.config.colors[index];
    const isActive = series.data && series.data.length > 0;

    const legendItem = document.createElement('div');
    legendItem.className = 'flex items-center cursor-pointer';
    legendItem.style.opacity = isActive ? '1' : '0.5';
    legendItem.onclick = () => {
      chart.value.toggleSeries(series.name);
    };

    const legendMarker = document.createElement('div');
    legendMarker.className = 'w-3 h-3 rounded-full mr-2';
    legendMarker.style.backgroundColor = color;

    const legendLabel = document.createElement('span');
    legendLabel.className = 'text-sm text-gray-700';
    legendLabel.textContent = series.name;

    legendItem.appendChild(legendMarker);
    legendItem.appendChild(legendLabel);
    legendContainer.appendChild(legendItem);
  });
};

const chart = ref(null);

onMounted(() => {
  if (chart.value) {
    updateCustomLegend(chart.value.chart, { config: { series: series.value, colors: chartOptions.value.colors } });
  }
});
</script>

<template>
  <div class="bg-white p-6 rounded-lg shadow-sm border border-gray-sparktro">
    <!-- Title + Legend + Dropdown Row -->
    <div class="flex flex-wrap justify-between items-center mb-4">
      <!-- Left: Title -->
      <h2 class="text-lg font-semibold text-black-sparktro">Sales</h2>

      <!-- Right: Legend + Dropdown -->
      <div class="flex items-center gap-4">
        <div id="custom-legend-sales" class="flex items-center gap-4"></div>
        
        <div class="relative">
          <select
            v-model="selectedMonth"
            class="appearance-none text-sm border border-gray-300 rounded px-3 py-1 pr-8 text-black-sparktro bg-white focus:outline-none"
          >
            <option>May 2025</option>
            <option>April 2025</option>
            <option>March 2025</option>
          </select>
          <div class="pointer-events-none absolute inset-y-0 right-2 flex items-center text-gray-500">
            <svg
              class="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
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
    </div>

    <!-- Chart -->
    <apexchart
      type="bar"
      height="350"
      :options="chartOptions"
      :series="series"
      ref="chart"
    />

    <!-- Bottom labels -->
    <div class="flex justify-between items-center mt-2 text-sm text-gray-500">
      <span>$329.96.36</span>
      <span>$3.23</span>
    </div>
  </div>
</template>

<style scoped>
/* Remove default arrow on select in some browsers */
select::-ms-expand {
  display: none;
}
</style>