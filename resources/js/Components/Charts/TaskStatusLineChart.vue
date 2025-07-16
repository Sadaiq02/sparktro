<template>
  <div class="chart-container">
    <div class="chart-header">
      <h3 class="chart-title">Task Progress</h3>
      <div class="time-period">This Week</div>
    </div>
    <div class="chart-wrapper">
      <canvas ref="chartCanvas"></canvas>
    </div>
  </div>
</template>

<script>
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

export default {
  name: 'TaskStatusLineChart',
  props: {
    chartData: {
      type: Object,
      default: () => ({
        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        datasets: [
          {
            label: 'Completed',
            data: [12, 19, 15, 27, 22, 18, 24],
            borderColor: '#4CAF50',
            backgroundColor: 'rgba(76, 175, 80, 0.1)',
            tension: 0.4,
            fill: true
          },
          {
            label: 'Pending',
            data: [8, 12, 10, 15, 13, 9, 11],
            borderColor: '#FF9800',
            backgroundColor: 'rgba(255, 152, 0, 0.1)',
            tension: 0.4,
            fill: true
          }
        ]
      })
    }
  },
  data() {
    return {
      chart: null
    }
  },
  mounted() {
    this.renderChart();
  },
  beforeUnmount() {
    if (this.chart) {
      this.chart.destroy();
    }
  },
  methods: {
    renderChart() {
      const ctx = this.$refs.chartCanvas.getContext('2d');
      this.chart = new Chart(ctx, {
        type: 'line',
        data: this.chartData,
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              position: 'top',
              align: 'end',
              labels: {
                usePointStyle: true,
                padding: 20
              }
            },
            tooltip: {
              mode: 'index',
              intersect: false
            }
          },
          scales: {
            x: {
              grid: {
                display: false
              }
            },
            y: {
              beginAtZero: true,
              grid: {
                drawBorder: false
              },
              ticks: {
                stepSize: 10
              }
            }
          },
          elements: {
            point: {
              radius: 0,
              hoverRadius: 6
            }
          }
        }
      });
    }
  }
}
</script>

<style scoped>
.chart-container {
  background: #FFFFFF;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  font-family: 'Inter', sans-serif;
}

.chart-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.chart-title {
  font-size: 16px;
  font-weight: 600;
  color: #333;
  margin: 0;
}

.time-period {
  font-size: 13px;
  color: #666;
  background: #F5F5F5;
  padding: 4px 8px;
  border-radius: 4px;
}

.chart-wrapper {
  position: relative;
  height: 250px;
  width: 100%;
}
</style>