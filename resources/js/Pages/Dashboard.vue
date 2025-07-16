<script setup>
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout.vue'
import { Head } from '@inertiajs/vue3'
</script>

<template>
  <Head title="Dashboard" />

  <AuthenticatedLayout>
    <template #header>
      <h2 class="text-2xl font-bold text-gray-800">Dashboard</h2>
    </template>

    <section class="py-8">
      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <!-- Dashboard Grid -->
        <div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <!-- Card 1 -->
          <div class="rounded-2xl bg-white p-6 shadow">
            <h3 class="text-lg font-semibold text-gray-700">Welcome</h3>
            <p class="mt-2 text-sm text-gray-500">You're logged in!</p>
          </div>

          <!-- Card 2 (Placeholder) -->
          <div class="rounded-2xl bg-white p-6 shadow">
            <h3 class="text-lg font-semibold text-gray-700">Analytics</h3>
            <p class="mt-2 text-sm text-gray-500">Chart or stats component here</p>
          </div>

          <!-- Card 3 (Placeholder) -->
          <div class="rounded-2xl bg-white p-6 shadow">
            <h3 class="text-lg font-semibold text-gray-700">Recent Activity</h3>
            <p class="mt-2 text-sm text-gray-500">Latest user activity logs</p>
          </div>
        </div>
      </div>
    </section>
  </AuthenticatedLayout>
</template>
