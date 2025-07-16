<template>
  <div class="flex min-h-screen bg-gray-100 text-gray-900">
    <!-- Sidebar -->
    <aside class="w-64 bg-white shadow-md">
      <div class="p-4 font-bold text-lg border-b">SPARKTRO</div>
      <nav class="p-4 space-y-2">
        <Link href="/dashboard" class="block p-2 rounded hover:bg-gray-200">Dashboard</Link>
        <Link href="/users/all" class="block p-2 rounded hover:bg-gray-200">Users</Link>
        <!-- Add more menu items as needed -->
      </nav>
    </aside>

    <!-- Main Content Area -->
    <div class="flex-1 flex flex-col">
      <!-- Topbar -->
      <header class="p-4 bg-white shadow flex justify-between items-center">
        <h1 class="text-xl font-semibold">{{ title }}</h1>
        <!-- User / Settings Icon -->
        <div>
          <Link href="/profile" class="hover:underline">Profile</Link>
        </div>
      </header>

      <!-- Page Content -->
      <main class="p-6">
        <slot />
      </main>
    </div>
  </div>
</template>

<script setup>
import { Link } from '@inertiajs/vue3'
defineProps({ title: String })
</script>
