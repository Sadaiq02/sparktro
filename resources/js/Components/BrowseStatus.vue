<template>
  <div class="bg-white rounded-xl p-4 shadow-sm flex flex-col h-full">
    <div class="flex justify-between items-start mb-6">
      <h2 class="text-lg font-semibold text-gray-800">Browse Status</h2>
      <button class="p-1 flex flex-col items-center justify-center rounded-md hover:bg-gray-50 text-gray-500">
        <span class="block w-1 h-1 rounded-full bg-current mb-0.5"></span>
        <span class="block w-1 h-1 rounded-full bg-current mb-0.5"></span>
        <span class="block w-1 h-1 rounded-full bg-current"></span>
      </button>
    </div>

    <div class="relative mb-1 flex-1 flex items-center justify-center">
      <DonutChart
        :data="browsers.map(b => b.value)"
        :labels="browsers.map(b => b.name)"
        :background-colors="browsers.map(b => b.color)"
        @hover="handleHover"
      />
    </div>

    <div class="text-center h-8 flex items-center justify-center mb-1">
      <div v-if="hoveredItem" class="transition-all duration-200">
        <p class="text-sm font-medium text-gray-800 leading-tight">{{ hoveredItem.value.toLocaleString() }}</p>
        <p class="text-xs text-gray-500 leading-tight">{{ hoveredItem.name }}</p>
      </div>
    </div>

    <div class="flex flex-wrap justify-center gap-x-4 gap-y-1 text-xs">
      <div
        v-for="(browser, index) in browsers"
        :key="index"
        class="flex items-center cursor-pointer px-1"
        @mouseenter="hoveredItem = browser"
        @mouseleave="hoveredItem = null"
      >
        <span class="w-2 h-2 rounded-full mr-1" :style="{ backgroundColor: browser.color }"></span>
        <span class="text-gray-600">{{ browser.name }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import DonutChart from './Charts/DonutChart.vue'

const browsers = [
  { name: 'Firefox', value: 24687285, color: '#453d81' },
  { name: 'Google Chrome', value: 13456211, color: '#b0c5e7' },
  { name: 'Microsoft Edge', value: 8347622, color: '#a7d4c6' },
  { name: 'Opera', value: 4928321, color: '#bfcaf2' }
]

const hoveredItem = ref(null)

function handleHover(index) {
  hoveredItem.value = index !== null ? browsers[index] : null
}
</script>