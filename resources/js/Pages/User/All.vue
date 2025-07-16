<script setup>
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout.vue'
import { ref } from 'vue'

const users = ref([
  {
    id: 1,
    image: '/images/user1.jpg',
    name: 'Albert Flores',
    email: 'Koss@hotmail.com',
    phone: '(907) 555-0101',
    country: 'Saudi Arabia',
    department: 'Manager',
    date: '11 May 2025',
    role: 'Admin',
    status: true,
    showDropdown: false,
  },
  {
    id: 2,
    image: '/images/user2.jpg',
    name: 'Robert Fox',
    email: 'Koss@hotmail.com',
    phone: '(629) 555-0129',
    country: 'South Africa',
    department: 'Management',
    date: '11 May 2025',
    role: 'Super Admin',
    status: true,
    showDropdown: false,
  },
  {
    id: 3,
    image: '/images/user3.jpg',
    name: 'Jenny Wilson',
    email: 'Koss@hotmail.com',
    phone: '(684) 555-0102',
    country: 'Viet Nam',
    department: 'Account',
    date: '11 May 2025',
    role: 'Staff',
    status: true,
    showDropdown: false,
  },
  {
    id: 4,
    image: '/images/user4.jpg',
    name: 'Brooklyn Simmons',
    email: 'Koss@hotmail.com',
    phone: '(208) 555-0112',
    country: 'Bahrain',
    department: 'Developer',
    date: '11 May 2025',
    role: 'HR',
    status: true,
    showDropdown: false,
  },
  {
    id: 5,
    image: '/images/user5.jpg',
    name: 'Bessie Cooper',
    email: 'Koss@hotmail.com',
    phone: '(405) 555-0128',
    country: 'Iceland',
    department: 'Designer',
    date: '11 May 2025',
    role: 'Staff',
    status: true,
    showDropdown: false,
  },
  {
    id: 6,
    image: '/images/user6.jpg',
    name: 'Kristin Watson',
    email: 'Koss@hotmail.com',
    phone: '(308) 555-0121',
    country: 'Algeria',
    department: 'Management',
    date: '11 May 2025',
    role: 'Staff',
    status: false,
    showDropdown: false,
  },
  {
    id: 7,
    image: '/images/user7.jpg',
    name: 'Kathryn Murphy',
    email: 'Koss@hotmail.com',
    phone: '(603) 555-0123',
    country: 'Bahrain',
    department: 'Designer',
    date: '11 May 2025',
    role: 'Staff',
    status: true,
    showDropdown: false,
  },
  {
    id: 8,
    image: '/images/user8.jpg',
    name: 'Theresa Webb',
    email: 'Koss@hotmail.com',
    phone: '(702) 555-0122',
    country: 'Afghanistan',
    department: 'Account',
    date: '11 May 2025',
    role: 'Employee',
    status: true,
    showDropdown: false,
  },
  {
    id: 9,
    image: '/images/user9.jpg',
    name: 'Cameron Williamson',
    email: 'Koss@hotmail.com',
    phone: '(205) 555-0100',
    country: 'Haiti',
    department: 'Designer',
    date: '11 May 2025',
    role: 'Employee',
    status: false,
    showDropdown: false,
  },
  {
    id: 10,
    image: '/images/user10.jpg',
    name: 'Jerome Bell',
    email: 'Koss@hotmail.com',
    phone: '(406) 555-0120',
    country: 'Saint Barthélemy',
    department: 'Designer',
    date: '11 May 2025',
    role: 'Staff',
    status: true,
    showDropdown: false,
  },
])

const toggleStatus = (user) => {
  user.status = !user.status
}

const toggleDropdown = (user) => {
  user.showDropdown = !user.showDropdown
}
</script>

<template>
  <AuthenticatedLayout>
    <div class="p-6">
      <!-- Header -->
      <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <h1 class="text-[20px] font-semibold text-gray-900">Customer List</h1>

        <div class="flex flex-wrap sm:flex-nowrap gap-3 items-center">
          <div class="flex items-center gap-2">
            <label for="show" class="text-sm text-gray-500">Show</label>
            <select id="show" class="border border-gray-300 rounded-md px-2 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-primary">
              <option>10</option>
              <option>20</option>
              <option>50</option>
            </select>
          </div>

          <div class="relative w-full sm:w-auto">
            <input
              type="text"
              placeholder="Search"
              class="border border-gray-300 rounded-md px-3 py-2 text-sm w-full sm:w-52 focus:outline-none focus:ring-1 focus:ring-primary"
            />
            <svg
              class="w-4 h-4 text-gray-400 absolute right-3 top-1/2 transform -translate-y-1/2"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              viewBox="0 0 24 24"
            >
              <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 1110.5 3a7.5 7.5 0 016.15 13.65z" />
            </svg>
          </div>

          <button class="bg-[#0A97B0] text-white px-4 py-2 rounded-md font-medium hover:bg-[#0A97B0]-700 transition">
            + Add User
          </button>
        </div>
      </div>

      <!-- Table -->
      <div class="overflow-x-auto bg-white rounded-lg shadow">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50 text-gray-600 text-xs font-medium uppercase">
            <tr>
              <th class="p-4"><input type="checkbox" /></th>
              <th class="px-4 py-3 text-left">Image</th>
              <th class="px-4 py-3 text-left">Customer Name</th>
              <th class="px-4 py-3 text-left">Phone</th>
              <th class="px-4 py-3 text-left">Country</th>
              <th class="px-4 py-3 text-left">Department</th>
              <th class="px-4 py-3 text-left">Date</th>
              <th class="px-4 py-3 text-left">Role</th>
              <th class="px-4 py-3 text-left">Status</th>
              <th class="px-4 py-3 text-left">Action</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-200">
            <tr v-for="user in users" :key="user.id" class="hover:bg-gray-50">
              <td class="p-4"><input type="checkbox" /></td>
              <td class="px-4 py-2">
                <img :src="user.image" alt="" class="w-10 h-10 rounded-full object-cover" />
              </td>
              <td class="px-4 py-2">
                <div class="font-medium text-gray-900">{{ user.name }}</div>
                <div class="text-gray-500 text-xs">{{ user.email }}</div>
              </td>
              <td class="px-4 py-2 text-gray-700">{{ user.phone }}</td>
              <td class="px-4 py-2 text-gray-700">{{ user.country }}</td>
              <td class="px-4 py-2 text-gray-700">{{ user.department }}</td>
              <td class="px-4 py-2 text-gray-700">{{ user.date }}</td>
              <td class="px-4 py-2 text-gray-700">{{ user.role }}</td>
              <td class="px-4 py-2">
                <button
                  class="w-10 h-5 flex items-center bg-[#0A97B0] rounded-full p-1 transition"
                  :class="user.status ? 'bg-[#0A97B0]' : 'bg-[#0A97B0]'"
                  @click="toggleStatus(user)"
                >
                  <div
                    class="bg-white w-4 h-4 rounded-full shadow transform transition"
                    :class="user.status ? 'translate-x-5' : ''"
                  ></div>
                </button>
              </td>
              <td class="px-4 py-2 relative">
                <div class="relative">
                  <button @click="toggleDropdown(user)" class="text-gray-500 hover:text-gray-700">⋮</button>
                  <div
                    v-if="user.showDropdown"
                    class="absolute right-0 mt-2 w-24 bg-white border border-gray-200 rounded shadow z-10"
                  >
                    <button class="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100">Edit</button>
                    <button class="block w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-gray-100">Delete</button>
                  </div>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Pagination -->
      <div class="flex justify-between items-center mt-4 text-sm text-gray-500">
        <p>Show 10 out of 50</p>
        <div class="flex items-center space-x-2">
          <button class="hover:text-gray-700">Prev</button>
          <button class="font-medium text-gray-900">1</button>
          <button class="hover:text-gray-700">2</button>
          <button class="hover:text-gray-700">3</button>
          <button class="hover:text-gray-700">Next</button>
        </div>
      </div>
    </div>
  </AuthenticatedLayout>
</template>

<style scoped>
/* Optional: Tailwind handles most styling, can add more global overrides here if needed */
</style>
