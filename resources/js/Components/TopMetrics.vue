<!-- resources/js/Components/Charts/TopMetrics.vue -->
<template>
  <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 mb-6">
    <TopMetricBox 
      title="Total Employees" 
      value="18" 
      change="+6.08%" 
      changeColor="text-green-600"
      :icon="UsersIcon"
      iconColor="text-blue-500"
      iconBgColor="bg-blue-50"
    />
    <TopMetricBox 
      title="Total Seller" 
      value="04" 
      change="-0.03%" 
      changeColor="text-red-600"
      :icon="UserGroupIcon"
      iconColor="text-purple-500"
      iconBgColor="bg-purple-50"
    />
    <TopMetricBox 
      title="Total Expenses" 
      value="$365.54" 
      change="+6.08%" 
      changeColor="text-green-600"
      :icon="CurrencyDollarIcon"
      iconColor="text-red-500"
      iconBgColor="bg-red-50"
    />
    <TopMetricBox 
      title="Total Deposits" 
      value="$0.00" 
      change="+6.08%" 
      changeColor="text-green-600"
      :icon="BanknotesIcon"
      iconColor="text-green-500"
      iconBgColor="bg-green-50"
    />
    <TopMetricBox 
      title="Total Product" 
      value="9587"
      :icon="CubeIcon"
      iconColor="text-yellow-500"
      iconBgColor="bg-yellow-50"
    />
    <TopMetricBox 
      title="Total Tasks" 
      value="12"
      :icon="ClipboardDocumentIcon"
      iconColor="text-indigo-500"
      iconBgColor="bg-indigo-50"
    />
    <TopMetricBox 
      title="Total Order" 
      value="64" 
      change="+6.08%" 
      changeColor="text-green-600"
      :icon="ShoppingBagIcon"
      iconColor="text-pink-500"
      iconBgColor="bg-pink-50"
    />
    <TopMetricBox 
      title="Total Sale" 
      value="$654.57" 
      change="+6.08%" 
      changeColor="text-green-600"
      :icon="ShoppingCartIcon"
      iconColor="text-teal-500"
      iconBgColor="bg-teal-50"
    />
    <TopMetricBox 
      title="Total Refunded" 
      value="$9124.25" 
      change="-0.03%" 
      changeColor="text-red-600"
      :icon="ArrowPathIcon"
      iconColor="text-orange-500"
      iconBgColor="bg-orange-50"
    />
    <TopMetricBox 
      title="Total Revenue" 
      value="$265.35" 
      change="+6.08%" 
      changeColor="text-green-600"
      :icon="ChartBarIcon"
      iconColor="text-blue-500"
      iconBgColor="bg-blue-50"
    />
    <TopMetricBox 
      title="New Customer" 
      value="842"
      :icon="UserPlusIcon"
      iconColor="text-green-500"
      iconBgColor="bg-green-50"
    />
    <TopMetricBox 
      title="Pending Order" 
      value="64"
      :icon="ClockIcon"
      iconColor="text-amber-500"
      iconBgColor="bg-amber-50"
    />
  </div>
</template>

<script setup>
import TopMetricBox from '@/Components/TopMetricBox.vue';
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
  UserPlusIcon,
  ClipboardDocumentIcon,
  ClockIcon
} from '@heroicons/vue/24/outline';
</script>