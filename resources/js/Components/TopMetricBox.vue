<!-- resources/js/Components/TopMetricBox.vue -->
<template>
  <div class="bg-white p-4 rounded shadow-sm">
    <div class="flex items-start justify-between">
      <div>
        <p class="text-sm text-black-sparktro/60 font-semibold">{{ title }}</p>
        <h2 class="text-2xl font-bold text-black-sparktro mt-1">{{ value }}</h2>
        <p v-if="change" :class="['text-xs mt-1', changeColor]">{{ change }}</p>
      </div>
      <div class="p-2 rounded-lg" :class="iconBgColor">
        <component :is="icon" class="w-5 h-5" :class="iconColor" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { 
  UsersIcon, 
  UserGroupIcon, 
  CurrencyDollarIcon, 
  BanknotesIcon,
  CubeIcon,
  ShoppingBagIcon,
  ShoppingCartIcon,
  ArrowPathIcon,
  ChartBarIcon,
  UserPlusIcon
} from '@heroicons/vue/24/outline';

const props = defineProps({
  title: String,
  value: String,
  change: String,
  changeColor: {
    type: String,
    default: 'text-green-600',
  },
  icon: {
    type: Object,
    default: CubeIcon
  },
  iconColor: {
    type: String,
    default: 'text-blue-500'
  },
  iconBgColor: {
    type: String,
    default: 'bg-blue-50'
  }
});
</script>