<script setup>
import { ref } from 'vue';

const orders = ref([
  {
    id: 1,
    image: '/images/iphone-13-pro-max-blue.png',
    customerName: 'iPhone 13 pro max',
    quantity: '01',
    date: '11 May 2025',
    price: '$360.05',
    status: 'Paid',
  },
  {
    id: 2,
    image: '/images/iphone-13-pro-max-green.png',
    customerName: 'iPhone 13 pro max',
    quantity: '01',
    date: '11 May 2025',
    price: '$360.05',
    status: 'Paid',
  },
  {
    id: 3,
    image: '/images/iphone-13-pro-max-dark.png',
    customerName: 'iPhone 13 pro max',
    quantity: '01',
    date: '11 May 2025',
    price: '$360.05',
    status: 'Unpaid',
  },
  {
    id: 4,
    image: '/images/iphone-13-pro-max-orange.png',
    customerName: 'iPhone 13 pro max',
    quantity: '01',
    date: '11 May 2025',
    price: '$360.05',
    status: 'Paid',
  },
  {
    id: 5,
    image: '/images/iphone-13-pro-max-gold.png',
    customerName: 'iPhone 13 pro max',
    quantity: '01',
    date: '11 May 2025',
    price: '$360.05',
    status: 'Unpaid',
  },
]);

const openActionMenuId = ref(null);

const toggleActionMenu = (orderId) => {
  openActionMenuId.value = openActionMenuId.value === orderId ? null : orderId;
};
</script>

<template>
  <div class="table-container h-full">
    <div class="table-wrapper h-full flex flex-col">
      <div class="flex justify-between items-center mb-4">
        <h1 class="text-lg font-semibold text-gray-800">Recent Order</h1>
        <button class="text-gray-500 hover:text-gray-700">
          <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z"></path>
          </svg>
        </button>
      </div>

      <div class="table-responsive flex-1 overflow-auto">
        <table class="w-full">
          <thead>
            <tr>
              <th class="w-10"><input type="checkbox" class="form-checkbox" /></th>
              <th class="w-16">IMAGE</th>
              <th class="min-w-[120px]">CUSTOMER NAME</th>
              <th class="w-16">QTY</th>
              <th class="w-24">DATE</th>
              <th class="w-20">PRICE</th>
              <th class="w-24">STATUS</th>
              <th class="w-16">ACTION</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="order in orders" :key="order.id">
              <td><input type="checkbox" class="form-checkbox" /></td>
              <td>
                <img :src="order.image" alt="Product Image" class="product-image" />
              </td>
              <td class="truncate">{{ order.customerName }}</td>
              <td>{{ order.quantity }}</td>
              <td>{{ order.date }}</td>
              <td>{{ order.price }}</td>
              <td>
                <span :class="['status', order.status === 'Paid' ? 'status-paid' : 'status-unpaid']">
                  {{ order.status }}
                </span>
              </td>
              <td class="relative">
                <button @click="toggleActionMenu(order.id)" class="text-gray-500 hover:text-gray-700">
                  <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z"></path>
                  </svg>
                </button>
                <div v-if="openActionMenuId === order.id" class="action-menu">
                  <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Edit</a>
                  <a href="#" class="block px-4 py-2 text-sm text-red-600 hover:bg-gray-100">Delete</a>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<style scoped>
.table-container {
  @apply w-full;
}

.table-wrapper {
  @apply bg-white rounded-lg shadow-sm border border-gray-200 p-6;
}

h1 {
  @apply text-lg font-semibold text-gray-800;
}

.table-responsive {
  @apply w-full;
}

table {
  @apply border-collapse;
}

th {
  @apply bg-gray-50 text-gray-600 text-xs font-medium uppercase text-left py-3 px-4 border-b border-gray-200 sticky top-0;
}

td {
  @apply py-4 px-4 border-b border-gray-200 text-sm text-gray-700;
}

tr:last-child td {
  @apply border-b-0;
}

.form-checkbox {
  @apply h-4 w-4 text-primary-600 rounded border-gray-300 focus:ring-primary-500;
}

.product-image {
  @apply w-10 h-10 rounded-full object-cover;
}

.status {
  @apply inline-block px-3 py-1 rounded-full text-xs font-medium;
}

.status-paid {
  @apply bg-green-100 text-green-700;
}

.status-unpaid {
  @apply bg-red-100 text-red-700;
}

.action-menu {
  @apply absolute right-0 mt-2 w-36 bg-white rounded-md shadow-lg py-1 z-10 border border-gray-200;
}

@media (max-width: 768px) {
  .table-wrapper {
    @apply p-4;
  }
  
  th, td {
    @apply py-3 px-2;
  }
  
  .product-image {
    @apply w-8 h-8;
  }
}
</style>