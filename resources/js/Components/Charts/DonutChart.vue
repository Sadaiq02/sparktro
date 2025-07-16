<template>
  <div class="w-full h-full">
    <Doughnut
      :data="chartData"
      :options="chartOptions"
    />
  </div>
</template>

<script setup>
import { Doughnut } from 'vue-chartjs'
import { Chart as ChartJS, ArcElement, Tooltip } from 'chart.js'

ChartJS.register(ArcElement, Tooltip)

const props = defineProps({
  data: Array,
  labels: Array,
  backgroundColors: Array
})

const chartData = {
  labels: props.labels,
  datasets: [{
    data: props.data,
    backgroundColor: props.backgroundColors,
    borderWidth: 0,
    borderRadius: 4,
    hoverBorderWidth: 2,
    hoverBorderColor: '#fff',
    hoverOffset: 4
  }]
}

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  cutout: '65%',
  plugins: {
    legend: { display: false },
    tooltip: {
      enabled: true,
      backgroundColor: 'rgba(0, 0, 0, 0.8)',
      bodyColor: '#fff',
      displayColors: false,
      callbacks: {
        label: (context) => {
          return `${context.label}: ${context.raw.toLocaleString()}`
        },
        title: () => ''
      }
    }
  }
}
</script>