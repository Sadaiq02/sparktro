<script setup>
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout.vue';
import { Head, Link, useForm } from '@inertiajs/vue3';

const form = useForm({
  image: null,
  username: '',
  user_id: '',
  email: '',
  phone: '',
  join_date: '',
  country: '',
  department: '',
  designation: '',
  role: '',
  address: '',
  gender: '',
  language: '',
  duty_schedule: '',
  password: '',
});

function onSubmit() {
  form.post('/users/store', {
    preserveScroll: true,
    onSuccess: () => form.reset()
  });
}
</script>

<template>
  <Head title="Create User" />

  <AuthenticatedLayout>
    <div class="p-6">
      <div class="bg-white rounded-xl shadow border border-gray-200 font-sans">
        <!-- Header -->
        <div class="flex items-center justify-between px-6 py-4 border-b bg-gray-sparktro">
          <h2 class="text-lg font-semibold text-black-sparktro">Create New User</h2>
          <Link href="/users/all" class="text-sm text-red-sparktro hover:underline">✕ Cancel</Link>
        </div>

        <!-- Form Body -->
        <form @submit.prevent="onSubmit" class="p-6 grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
          <!-- Left Column -->
          <div class="space-y-4">
            <div>
              <label class="block text-xs font-semibold text-black-sparktro mb-1">User Name</label>
              <input v-model="form.username" type="text" placeholder="Full Name"
                class="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-primary-sparktro" />
            </div>

            <div>
              <label class="block text-xs font-semibold text-black-sparktro mb-1">Phone</label>
              <input v-model="form.phone" type="text" placeholder="Phone Number"
                class="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-primary-sparktro" />
            </div>

            <div>
              <label class="block text-xs font-semibold text-black-sparktro mb-1">Language</label>
              <select v-model="form.language"
                class="w-full px-3 py-2 border border-gray-300 rounded-md bg-white text-sm focus:ring-2 focus:ring-primary-sparktro">
                <option disabled selected>Select Language</option>
                <option>English</option>
                <option>French</option>
              </select>
            </div>

            <div>
              <label class="block text-xs font-semibold text-black-sparktro mb-1">Department</label>
              <select v-model="form.department"
                class="w-full px-3 py-2 border border-gray-300 rounded-md bg-white text-sm focus:ring-2 focus:ring-primary-sparktro">
                <option disabled selected>Select Department</option>
                <option>HR</option>
                <option>Development</option>
              </select>
            </div>

            <div>
              <label class="block text-xs font-semibold text-black-sparktro mb-1">User Image (100px × 100px)</label>
              <input type="file" @change="e => form.image = e.target.files[0]"
                class="w-full file:px-3 file:py-1 file:border file:rounded file:bg-gray-100 file:text-sm file:text-black-sparktro border border-gray-300 rounded-md text-sm" />
            </div>
          </div>

          <!-- Right Column -->
          <div class="space-y-4">
            <div>
              <label class="block text-xs font-semibold text-black-sparktro mb-1">User ID</label>
              <input v-model="form.user_id" type="text" placeholder="User ID"
                class="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-primary-sparktro" />
            </div>

            <div>
              <label class="block text-xs font-semibold text-black-sparktro mb-1">Joining Date</label>
              <input v-model="form.join_date" type="date"
                class="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-primary-sparktro" />
            </div>

            <div>
              <label class="block text-xs font-semibold text-black-sparktro mb-1">Address</label>
              <input v-model="form.address" type="text" placeholder="Address"
                class="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-primary-sparktro" />
            </div>

            <div>
              <label class="block text-xs font-semibold text-black-sparktro mb-1">Designation</label>
              <input v-model="form.designation" type="text" placeholder="e.g. Manager"
                class="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-primary-sparktro" />
            </div>

            <div>
              <label class="block text-xs font-semibold text-black-sparktro mb-1">Duty Schedule</label>
              <input v-model="form.duty_schedule" type="text" placeholder="e.g. 9:00AM - 5:00PM"
                class="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-primary-sparktro" />
            </div>
          </div>

          <!-- Bottom Row -->
          <div class="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label class="block text-xs font-semibold text-black-sparktro mb-1">Email</label>
              <input v-model="form.email" type="email" placeholder="you@example.com"
                class="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-primary-sparktro" />
            </div>

            <div>
              <label class="block text-xs font-semibold text-black-sparktro mb-1">Country</label>
              <select v-model="form.country"
                class="w-full px-3 py-2 border border-gray-300 rounded-md bg-white text-sm focus:ring-2 focus:ring-primary-sparktro">
                <option disabled selected>Select Country</option>
                <option>Nigeria</option>
                <option>USA</option>
                <option>India</option>
              </select>
            </div>

            <div>
              <label class="block text-xs font-semibold text-black-sparktro mb-1">Gender</label>
              <select v-model="form.gender"
                class="w-full px-3 py-2 border border-gray-300 rounded-md bg-white text-sm focus:ring-2 focus:ring-primary-sparktro">
                <option disabled selected>Select Gender</option>
                <option>Male</option>
                <option>Female</option>
              </select>
            </div>

            <div>
              <label class="block text-xs font-semibold text-black-sparktro mb-1">Role</label>
              <select v-model="form.role"
                class="w-full px-3 py-2 border border-gray-300 rounded-md bg-white text-sm focus:ring-2 focus:ring-primary-sparktro">
                <option disabled selected>Select Role</option>
                <option>Admin</option>
                <option>Staff</option>
                <option>Employee</option>
              </select>
            </div>

            <div>
              <label class="block text-xs font-semibold text-black-sparktro mb-1">Password</label>
              <input v-model="form.password" type="password" placeholder="********"
                class="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-primary-sparktro" />
            </div>
          </div>

          <!-- Submit Button -->
          <div class="md:col-span-2 pt-4">
            <button type="submit"
              class="bg-primary-sparktro text-white px-6 py-2 rounded-lg hover:bg-opacity-90 transition">
              Create User
            </button>
          </div>
        </form>
      </div>
    </div>
  </AuthenticatedLayout>
</template>
