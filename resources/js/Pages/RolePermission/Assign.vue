<script setup>
// resources/js/Pages/RolePermission/Assign.vue
import { ref } from 'vue';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout.vue'; // Make sure this import is here

// Define the layout for this specific page if you're not doing it globally in app.js
// If you already modified app.js to apply AuthenticatedLayout globally, you can omit this line.
defineOptions({ layout: AuthenticatedLayout });

const roles = ref([
  { name: 'Admin', checked: false, permissions: ['Full Access', 'View', 'Edit', 'Create', 'Delete'] },
  { name: 'Super Admin', checked: false, permissions: ['Full Access', 'View', 'Edit', 'Create', 'Delete'] },
  { name: 'Team', checked: false, permissions: ['Read', 'Write', 'Edit', 'Delete'] },
  { name: 'Editor', checked: false, permissions: ['Read', 'Write', 'Edit', 'Delete'] },
  { name: 'Viewer', checked: false, permissions: ['Read', 'Write', 'Edit', 'Delete'] },
  { name: 'User', checked: false, permissions: ['Read', 'Write', 'Edit', 'Delete'] },
  { name: 'Manager', checked: false, permissions: ['Read', 'Write', 'Edit', 'Delete'] },
  { name: 'Author', checked: false, permissions: ['Read', 'Write', 'Edit', 'Delete'] },
  { name: 'Contributor', checked: false, permissions: ['Read', 'Write', 'Edit', 'Delete'] },
  { name: 'Subscriber', checked: false, permissions: ['Read', 'Write', 'Edit', 'Delete'] },
  { name: 'Support', checked: false, permissions: ['View', 'Create', 'Edit', 'Delete'] },
  { name: 'Guest', checked: false, permissions: ['View', 'Create', 'Edit', 'Delete'] },
]);
</script>

<template>
    <template>
        <h2 class="font-semibold text-xl text-gray-800 leading-tight">Assign Role & Permissions</h2>
    </template>

    <div class="p-6 bg-white rounded-lg shadow-sm">
        <div class="flex items-center justify-between mb-6">
            <h2 class="text-xl font-semibold text-gray-800">Assign Role & Permission</h2>
            <div class="flex items-center space-x-4">
                <div class="relative">
                    <input
                        type="text"
                        placeholder="User"
                        class="pl-8 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm"
                    />
                    <svg
                        class="w-4 h-4 text-gray-400 absolute left-2.5 top-1/2 transform -translate-y-1/2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M16 7a4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                        ></path>
                    </svg>
                </div>
                <div class="relative">
                    <input
                        type="text"
                        placeholder="Enter Name"
                        class="pl-8 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm"
                    />
                    <svg
                        class="w-4 h-4 text-gray-400 absolute left-2.5 top-1/2 transform -translate-y-1/2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                        ></path>
                    </svg>
                </div>
                <select
                    class="pr-8 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm appearance-none bg-white bg-no-repeat bg-right-center"
                    style="background-image: url('data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 20 20\' fill=\'currentColor\'%3E%3Cpath fill-rule=\'evenodd\' d=\'M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z\' clip-rule=\'evenodd\'/%3E%3C/svg%3E'); background-position: right 0.5rem center; background-size: 1.5em; padding-right: 2.5rem;"
                >
                    <option>Status</option>
                    <option>Active</option>
                    <option>Inactive</option>
                </select>
                <button class="px-5 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 text-sm">
                    Assign
                </button>
            </div>
        </div>

        <div class="overflow-x-auto">
            <table class="min-w-full divide-y divide-gray-200">
                <thead class="bg-gray-50">
                    <tr>
                        <th
                            class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/4"
                        >
                            ROLE
                        </th>
                        <th
                            class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                            colspan="4"
                        >
                            PERMISSIONS
                        </th>
                    </tr>
                </thead>
                <tbody class="bg-white divide-y divide-gray-200">
                    <tr v-for="(role, index) in roles" :key="index">
                        <td class="px-6 py-4 whitespace-nowrap">
                            <div class="flex items-center">
                                <input
                                    type="checkbox"
                                    class="form-checkbox h-4 w-4 text-blue-600 border-gray-300 rounded mr-3"
                                    :checked="role.checked"
                                />
                                <span class="text-sm font-medium text-gray-900">{{ role.name }}</span>
                            </div>
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap">
                            <div class="flex space-x-4">
                                <label v-for="permission in role.permissions" :key="permission" class="flex items-center text-sm text-gray-700">
                                    <input
                                        type="checkbox"
                                        class="form-checkbox h-4 w-4 text-blue-600 border-gray-300 rounded mr-1"
                                        :checked="role.name === 'Guest' && permission === 'View'"
                                    />
                                    {{ permission }}
                                </label>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<style scoped>
/* Add any specific styles here if needed, or rely on Tailwind CSS utilities */
.bg-right-center {
  background-position: right 0.5rem center;
}
.appearance-none {
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
}
</style>