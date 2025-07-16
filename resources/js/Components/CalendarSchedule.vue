<template>
  <div class="bg-white rounded-lg border border-gray-200 p-5">
    <!-- Top Section with Title and Three-dot Menu -->
    <div class="flex justify-between items-start mb-5">
      <h2 class="text-lg font-semibold text-gray-900">Calendar Schedule</h2>
      <button class="p-1 flex flex-col items-center justify-center rounded-md hover:bg-gray-50 text-gray-500">
        <span class="block w-1 h-1 rounded-full bg-current mb-0.5"></span>
        <span class="block w-1 h-1 rounded-full bg-current mb-0.5"></span>
        <span class="block w-1 h-1 rounded-full bg-current"></span>
      </button>
    </div>

    <!-- Month Navigation -->
    <div class="flex items-center justify-between mb-6">
      <!-- Left arrow at the start -->
      <button
        @click="previousMonth"
        class="p-1.5 rounded-lg hover:bg-gray-50 focus:outline-none border border-gray-200"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-5 w-5 text-gray-500"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M15 19l-7-7 7-7"
          />
        </svg>
      </button>

      <!-- Month title centered -->
      <h2 class="text-lg font-semibold text-gray-900 flex-grow text-center">
        {{ currentMonthName }} {{ currentYear }}
      </h2>

      <!-- Right arrow at the end -->
      <button
        @click="nextMonth"
        class="p-1.5 rounded-lg hover:bg-gray-50 focus:outline-none border border-gray-200"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-5 w-5 text-gray-500"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M9 5l7 7-7 7"
          />
        </svg>
      </button>
    </div>

    <!-- Weekday Headers -->
    <div class="grid grid-cols-7 gap-1 mb-3">
      <div 
        v-for="day in ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa']" 
        :key="day" 
        class="text-center text-xs font-medium text-gray-500 h-8 flex items-center justify-center"
      >
        {{ day }}
      </div>
    </div>

    <!-- Calendar Grid -->
    <div class="grid grid-cols-7 gap-1">
      <div 
        v-for="(day, index) in calendarDays" 
        :key="index"
        class="h-10 flex items-center justify-center text-sm rounded-lg relative"
        :class="{
          'text-gray-400': !day.isCurrentMonth,
          'font-medium text-gray-700': day.isCurrentMonth && !day.isToday,
          'bg-blue-500/20 text-blue-600 font-semibold': day.isToday,
          'hover:bg-gray-50 cursor-pointer': day.isCurrentMonth
        }"
      >
        {{ day.date }}
        <span 
          v-if="day.hasEvent" 
          class="absolute bottom-1 w-1.5 h-1.5 rounded-full bg-blue-500"
        ></span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';

const currentDate = ref(new Date());
const currentMonth = ref(new Date().getMonth());
const currentYear = ref(new Date().getFullYear());

// Computed properties
const currentMonthName = computed(() => {
  return currentDate.value.toLocaleString('default', { month: 'long' });
});

const calendarDays = computed(() => {
  const year = currentYear.value;
  const month = currentMonth.value;
  
  // Get first day of month and total days in month
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  
  // Get days from previous month
  const prevMonthDays = new Date(year, month, 0).getDate();
  const prevMonthDaysToShow = firstDay;
  
  // Get days from next month
  const totalCells = 6 * 7; // 6 rows max
  const nextMonthDaysToShow = totalCells - (daysInMonth + prevMonthDaysToShow);
  
  const days = [];
  
  // Previous month days
  for (let i = prevMonthDaysToShow; i > 0; i--) {
    days.push({
      date: prevMonthDays - i + 1,
      isCurrentMonth: false,
      isToday: false,
      hasEvent: false
    });
  }
  
  // Current month days
  const today = new Date();
  for (let i = 1; i <= daysInMonth; i++) {
    days.push({
      date: i,
      isCurrentMonth: true,
      isToday: today.getDate() === i && 
               today.getMonth() === month && 
               today.getFullYear() === year,
      hasEvent: Math.random() > 0.7 // Random events for demo
    });
  }
  
  // Next month days
  for (let i = 1; i <= nextMonthDaysToShow; i++) {
    days.push({
      date: i,
      isCurrentMonth: false,
      isToday: false,
      hasEvent: false
    });
  }
  
  return days;
});

// Navigation methods
const previousMonth = () => {
  currentMonth.value--;
  if (currentMonth.value < 0) {
    currentMonth.value = 11;
    currentYear.value--;
  }
  updateCurrentDate();
};

const nextMonth = () => {
  currentMonth.value++;
  if (currentMonth.value > 11) {
    currentMonth.value = 0;
    currentYear.value++;
  }
  updateCurrentDate();
};

const updateCurrentDate = () => {
  currentDate.value = new Date(currentYear.value, currentMonth.value, 1);
};

// Initialize with current month/year
onMounted(() => {
  currentMonth.value = currentDate.value.getMonth();
  currentYear.value = currentDate.value.getFullYear();
});
</script>

<style scoped>
/* Custom styles to match Figma exactly */
.border-gray-200 {
  border-color: #E5E7EB;
}
.text-gray-500 {
  color: #6B7280;
}
.text-gray-700 {
  color: #374151;
}
.text-gray-900 {
  color: #111827;
}
.hover\:bg-gray-50:hover {
  background-color: #F9FAFB;
}
.bg-blue-500 {
  background-color: #3E82F7;
}
</style>