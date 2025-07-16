<template>
  <div class="bg-white rounded-2xl shadow-md px-6 py-5 flex flex-col justify-between h-full">
    <!-- Header -->
    <div class="flex justify-between items-center mb-6">
      <h3 class="text-sm font-semibold text-gray-800">Task Status</h3>
      <button class="w-8 h-8 rounded hover:bg-gray-100 flex items-center justify-center text-gray-500">
        <!-- vertical dots icon -->
        <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path d="M10 3a1.5 1.5 0 110-3 1.5 1.5 0 010 3zM10 9a1.5 1.5 0 110-3 1.5 1.5 0 010 3zM10 15a1.5 1.5 0 110-3 1.5 1.5 0 010 3z" />
        </svg>
      </button>
    </div>

    <!-- Chart -->
    <div class="relative h-[180px] mb-6">
      <canvas ref="chartCanvas" class="w-full h-full"></canvas>
      <div
        v-if="customTooltip.visible"
        :style="{ left: customTooltip.x + 'px', top: customTooltip.y + 'px' }"
        class="custom-tooltip"
      >
        {{ customTooltip.label }}
      </div>
    </div>

    <!-- Stats -->
    <div class="grid grid-cols-3 text-center border-t pt-5 text-sm font-medium text-gray-800">
      <div class="relative">
        <div class="text-lg font-bold text-[#28C76F]">{{ completeTasks }}</div>
        <div class="text-xs mt-1">Complete Task</div>
        <div class="absolute top-2 right-0 h-4/5 w-[1px] bg-gray-200"></div>
      </div>
      <div class="relative">
        <div class="text-lg font-bold text-[#FF9F43]">{{ pendingTasks }}</div>
        <div class="text-xs mt-1">Pending Task</div>
        <div class="absolute top-2 right-0 h-4/5 w-[1px] bg-gray-200"></div>
      </div>
      <div>
        <div class="text-lg font-bold text-[#EA5455]">{{ dueTasks }}</div>
        <div class="text-xs mt-1">Due Task</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { Chart, registerables } from 'chart.js'

Chart.register(...registerables)

const props = defineProps({
  completeTasks: { type: Number, default: 982 },
  pendingTasks: { type: Number, default: 126 },
  dueTasks: { type: Number, default: 65 },
  chartData: {
    type: Object,
    default: () => ({
      labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      datasets: [
        {
          label: 'Tasks',
          data: [10, 15, 12, 20, 18, 16, 22],
          borderColor: '#28C76F',
          backgroundColor: 'transparent', // will be overridden
          tension: 0.4,
          borderWidth: 2,
          pointRadius: 0,
          pointHoverRadius: 6,
          fill: true, // enable gradient fill
        },
      ],
    }),
  },
})

const chartCanvas = ref(null)
let chartInstance = null

const customTooltip = ref({
  visible: false,
  x: 0,
  y: 0,
  label: '',
})

onMounted(() => {
  renderChart()
})

onBeforeUnmount(() => {
  if (chartInstance) chartInstance.destroy()
})

function renderChart() {
  const ctx = chartCanvas.value.getContext('2d')

  // Create gradient fill under the line
  const gradient = ctx.createLinearGradient(0, 0, 0, chartCanvas.value.height)
  gradient.addColorStop(0, 'rgba(40, 199, 111, 0.4)')
  gradient.addColorStop(1, 'rgba(40, 199, 111, 0)')

  props.chartData.datasets[0].backgroundColor = gradient

  chartInstance = new Chart(ctx, {
    type: 'line',
    data: props.chartData,
    options: {
      responsive: true,
      maintainAspectRatio: false,
      interaction: {
        mode: 'index',
        intersect: false,
      },
      plugins: {
        legend: { display: false },
        tooltip: { enabled: false },
      },
      scales: {
        x: {
          display: false,
          grid: { display: false },
        },
        y: {
          display: false,
          grid: { display: false },
        },
      },
      onHover: (event, elements, chart) => {
        if (elements.length > 0) {
          const element = elements[0]
          const index = element.index
          const dataset = chart.data.datasets[element.datasetIndex]
          const value = dataset.data[index]

          const canvasRect = chartCanvas.value.getBoundingClientRect()
          const x = chart.scales.x.getPixelForValue(index) + canvasRect.left
          const y = chart.scales.y.getPixelForValue(value) + canvasRect.top - 20

          const minutes = value * 10
          const hours = Math.floor(minutes / 60)
          const mins = minutes % 60

          customTooltip.value = {
            visible: true,
            x,
            y,
            label: `${hours} h ${mins.toString().padStart(2, '0')} min`,
          }
        } else {
          customTooltip.value.visible = false
        }
      },
    },
  })
}
</script>

<style scoped>
.custom-tooltip {
  position: fixed;
  background-color: rgba(0, 0, 0, 0.85);
  color: #fff;
  font-size: 12px;
  padding: 5px 10px;
  border-radius: 5px;
  pointer-events: none;
  transform: translate(-50%, -100%);
  z-index: 50;
}
</style>
