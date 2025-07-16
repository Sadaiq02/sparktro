<script setup>
import { ref } from "vue";
import ApplicationLogo from "@/Components/ApplicationLogo.vue";
import RevenueChart from "@/Components/Charts/RevenueChart.vue";
import SalesChart from "@/Components/Charts/SalesChart.vue";
import CalendarSchedule from "@/Components/CalendarSchedule.vue";
import BrowseStatus from "@/Components/BrowseStatus.vue";

import Dropdown from "@/Components/Dropdown.vue";
import DropdownLink from "@/Components/DropdownLink.vue";
import NavLink from "@/Components/NavLink.vue";
import ResponsiveNavLink from "@/Components/ResponsiveNavLink.vue";
import { Link } from "@inertiajs/vue3";
import TopMetrics from "@/Components/TopMetrics.vue";

const showingNavigationDropdown = ref(false);

const sidebarVisible = ref(true);
function toggleSidebar() {
  sidebarVisible.value = !sidebarVisible.value;
}

const userMenuOpen = ref(false);
const rolePermissionMenuOpen = ref(false);
const profileMenuOpen = ref(false);
const notificationMenuOpen = ref(false);
</script>

<template>
  <div class="bg-gray-sparktro min-h-screen flex relative">
    <!-- Sidebar -->
    <aside
      :class="sidebarVisible ? 'w-[316px]' : 'w-12'"
      class="bg-white h-[1611px] border-r border-gray-sparktro p-0 transition-all duration-300 relative overflow-hidden"
    >
      <!-- Logo area -->
      <div
        class="logo-area flex items-center justify-between h-[68px] px-6 py-2.5 border-b border-gray-sparktro"
      >
        <div v-if="sidebarVisible" class="text-xl font-bold">
          <div class="flex shrink-0 items-center">
            <Link :href="route('dashboard')">
              <ApplicationLogo
                class="block h-12 w-auto max-w-[130px] fill-current"
              />
            </Link>
          </div>
        </div>

        <!-- Toggle button with right margin when collapsed -->
        <button
          @click="toggleSidebar"
          :class="{ 'mr-2': !sidebarVisible }"
          class="bg-white border rounded-full p-1 shadow hover:bg-gray-sparktro"
        >
          <svg
            v-if="sidebarVisible"
            xmlns="http://www.w3.org/2000/svg"
            class="h-4 w-4 text-black-sparktro/60"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fill-rule="evenodd"
              d="M5 10a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1z"
              clip-rule="evenodd"
            />
          </svg>
          <svg
            v-else
            xmlns="http://www.w3.org/2000/svg"
            class="h-4 w-4 text-black-sparktro/60"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fill-rule="evenodd"
              d="M5 10a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1z"
              clip-rule="evenodd"
            />
          </svg>
        </button>
      </div>

      <!-- Sidebar content -->
      <div v-if="sidebarVisible" class="mt-6 px-6">
        <ul class="space-y-1">
          <!-- Dashboard -->
          <li>
            <a
              href="#"
              class="py-2 px-3 flex items-center justify-between font-bold text-sm text-black-sparktro hover:text-primary-sparktro hover:bg-primary-sparktro/10 rounded transition-colors duration-200"
            >
              <span class="flex items-center">
                <i class="material-icons-outlined mr-2">grid_view</i>
                Dashboard
              </span>
              <svg
                class="w-4 h-4 transform transition-transform duration-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </a>
          </li>

          <!-- User Management -->
          <li>
            <div
              @click="userMenuOpen = !userMenuOpen"
              class="cursor-pointer py-2 px-3 text-sm font-bold flex justify-between items-center text-black-sparktro hover:text-primary-sparktro hover:bg-primary-sparktro/10 rounded transition-colors duration-200"
            >
              <span class="flex items-center mr-2">
                <i class="material-icons-outlined mr-2">group</i>
                User Management
              </span>
              <svg
                class="w-4 h-4 transform transition-transform duration-300"
                :class="{ 'rotate-90': userMenuOpen }"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </div>

            <transition
              enter-active-class="transition duration-300 ease-out"
              enter-from-class="opacity-0 max-h-0"
              enter-to-class="opacity-100 max-h-40"
              leave-active-class="transition duration-300 ease-in"
              leave-from-class="opacity-100 max-h-40"
              leave-to-class="opacity-0 max-h-0"
            >
              <ul
                v-show="userMenuOpen"
                class="ml-5 mt-0 space-y-1 overflow-hidden"
              >
                <li class="py-2">
                  <a
                    href="#"
                    class="block text-xs font-bold text-black-sparktro/80 hover:text-primary-sparktro"
                    >- User List</a
                  >
                </li>
                <li class="py-1">
                  <a
                    href="#"
                    class="block text-xs font-bold text-black-sparktro/80 hover:text-primary-sparktro"
                    >- Create New User</a
                  >
                </li>
              </ul>
            </transition>
          </li>

          <!-- Roles & Permissions -->
          <li>
            <div
              @click="rolePermissionMenuOpen = !rolePermissionMenuOpen"
              class="cursor-pointer py-2 px-3 text-sm font-bold flex justify-between items-center text-black-sparktro hover:text-primary-sparktro hover:bg-primary-sparktro/10 rounded transition-colors duration-200"
            >
              <span class="flex items-center mr-2">
                <i class="material-icons-outlined mr-2">manage_accounts</i>
                Role & Permission
              </span>
              <svg
                class="w-4 h-4 transform transition-transform duration-300"
                :class="{ 'rotate-90': rolePermissionMenuOpen }"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </div>

            <transition
              enter-active-class="transition duration-300 ease-out"
              enter-from-class="opacity-0 max-h-0"
              enter-to-class="opacity-100 max-h-40"
              leave-active-class="transition duration-300 ease-in"
              leave-from-class="opacity-100 max-h-40"
              leave-to-class="opacity-0 max-h-0"
            >
              <ul
                v-show="rolePermissionMenuOpen"
                class="ml-5 mt-0 space-y-1 overflow-hidden"
              >
                <li class="py-2">
                  <a
                    href="#"
                    class="block text-xs font-bold text-black-sparktro/80 hover:text-primary-sparktro"
                    >- Role</a
                  >
                </li>
                <li class="py-1">
                  <a
                    href="#"
                    class="block text-xs font-bold text-black-sparktro/80 hover:text-primary-sparktro"
                    >- Assign Role & Permissions</a
                  >
                </li>
              </ul>
            </transition>
          </li>
        </ul>
      </div>
    </aside>

    <!-- Main Content -->
    <div class="flex-1 flex flex-col">
      <!-- Top bar -->
      <header
        class="bg-white shadow-sm h-[68px] px-6 py-2.5 flex justify-between items-center border-b border-gray-sparktro"
      >
        <!-- Search Input -->
        <div class="flex items-center relative w-[300px] gap-[10px]">
          <svg
            class="absolute left-4 w-4 h-4 text-black-sparktro/50 pointer-events-none"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 104.35 4.35a7.5 7.5 0 0012.3 12.3z"
            />
          </svg>
          <input
            type="text"
            placeholder="Search..."
            class="w-full h-[40px] py-[12px] pr-[16px] pl-[40px] border border-gray-sparktro rounded-[8px] focus:outline-none focus:ring-1 focus:ring-primary-sparktro focus:border-primary-sparktro"
          />
        </div>

        <!-- Right Actions -->
        <div class="flex items-center space-x-4 ml-4">
          <!-- Language Selector -->
          <div class="relative">
            <select
              class="appearance-none border-0 rounded px-3 py-1 text-sm focus:outline-none pr-7 bg-white [&::-ms-expand]:hidden"
            >
              <option value="en">English</option>
              <option value="bd">Bangla</option>
            </select>
          </div>

          <!-- Notification Icon -->
          <button class="relative text-black-sparktro">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a2 2 0 002-2H8a2 2 0 002 2z"
              />
            </svg>
            <span
              class="absolute top-0 right-0 inline-block w-2 h-2 bg-red-sparktro rounded-full"
            ></span>
          </button>

          <!-- User Avatar -->
          <div class="relative group">
            <div
              class="w-8 h-8 rounded-full bg-primary-sparktro flex items-center justify-center text-white font-bold cursor-pointer"
            >
              JD
            </div>
            <div
              class="absolute right-0 mt-2 w-40 bg-white border border-gray-sparktro rounded shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-50"
            >
              <div class="p-2 text-sm">
                <p class="font-semibold text-black-sparktro">John Doe</p>
                <p class="text-black-sparktro/60">john@example.com</p>
              </div>
              <div class="border-t border-gray-sparktro">
                <a
                  href="#"
                  class="block px-3 py-2 text-sm hover:bg-gray-sparktro"
                  >Profile</a
                >
                <a
                  href="#"
                  class="block px-3 py-2 text-sm hover:bg-gray-sparktro"
                  >Logout</a
                >
              </div>
            </div>
          </div>
        </div>
      </header>

      <!-- Main Section -->
      <main class="p-6 bg-gray-sparktro">
        <!-- Top Metrics Section -->
        <TopMetrics />
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          <!-- Revenue -->
          <RevenueChart />

          <!-- Sales -->
          <SalesChart />

          <!-- Calendar Schedule -->
           <CalendarSchedule />

           <!-- Browse Status -->
           <BrowseStatus />
        </div>
      </main>
    </div>
  </div>
</template>
