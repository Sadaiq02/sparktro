<script setup>
import { ref, watch } from 'vue';

const props = defineProps({
  user: {
    type: Object,
    default: null,
  },
  show: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(['close', 'update']);

const form = ref({});

// Dropdown options
const countries = ['United States', 'Canada', 'United Kingdom', 'Australia', 'Nigeria', 'Bahrain', 'Iceland', 'Algeria', 'Afghanistan', 'Haiti', 'Saint Barthélemy'];
const languages = ['English', 'Spanish', 'French', 'German', 'Bangla'];
const genders = ['Male', 'Female', 'Other'];
const departments = ['Accounting', 'Sales', 'Marketing', 'IT', 'HR', 'Management', 'Developer', 'Designer', 'Account'];
const designations = ['Manager', 'Staff', 'Senior Staff', 'Team Lead', 'Admin', 'Super Admin', 'HR', 'Employee'];
const roles = ['HR', 'Admin', 'Super Admin', 'Employee', 'Staff'];

watch(() => props.user, (newUser) => {
  if (newUser) {
    form.value = { ...newUser };
    // Format date if needed
    if (form.value.joiningDate && !form.value.joiningDate.includes('-')) {
      const [day, month, year] = form.value.joiningDate.split('-');
      form.value.joiningDate = `${year}-${month}-${day}`;
    }
  } else {
    form.value = {};
  }
}, { immediate: true });

const handleImageUpload = (event) => {
  const file = event.target.files[0];
  if (file) {
    form.value.userImage = file.name;
    form.value.imageFile = file;
  }
};

const handleSubmit = () => {
  emit('update', form.value);
  emit('close');
};

const handleCancel = () => {
  emit('close');
};
</script>

<template>
  <div v-if="show" class="fixed inset-0 z-50 overflow-y-auto">
    <div class="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
      <!-- Background overlay -->
      <div class="fixed inset-0 transition-opacity" aria-hidden="true">
        <div class="absolute inset-0 bg-gray-500 opacity-75"></div>
      </div>

      <!-- Modal container -->
      <div class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-4xl sm:w-full">
        <div class="bg-white px-6 py-4">
          <div class="flex justify-between items-center border-b border-gray-200 pb-4">
            <h3 class="text-lg font-medium text-gray-900">Edit User</h3>
            <button @click="handleCancel" class="text-gray-400 hover:text-gray-500">
              <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div class="mt-6">
            <form @submit.prevent="handleSubmit">
              <!-- First Row -->
              <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">User Name</label>
                  <input v-model="form.name" type="text" class="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500">
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">User ID</label>
                  <input v-model="form.userId" type="text" readonly class="w-full border border-gray-300 rounded-md px-3 py-2 bg-gray-100 focus:outline-none">
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input v-model="form.email" type="email" class="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500">
                </div>
              </div>

              <!-- Second Row -->
              <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                  <input v-model="form.phone" type="text" class="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500">
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">Joining Date</label>
                  <div class="relative">
                    <input v-model="form.joiningDate" type="date" class="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500">
                    <div class="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                      <svg class="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                  </div>
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">Country</label>
                  <select v-model="form.country" class="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500">
                    <option value="">Select Country</option>
                    <option v-for="country in countries" :key="country" :value="country">{{ country }}</option>
                  </select>
                </div>
              </div>

              <!-- Third Row -->
              <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">Language</label>
                  <select v-model="form.language" class="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500">
                    <option value="">Select Language</option>
                    <option v-for="language in languages" :key="language" :value="language">{{ language }}</option>
                  </select>
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">Address</label>
                  <input v-model="form.address" type="text" class="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500">
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">Gender</label>
                  <select v-model="form.gender" class="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500">
                    <option value="">Select Gender</option>
                    <option v-for="gender in genders" :key="gender" :value="gender">{{ gender }}</option>
                  </select>
                </div>
              </div>

              <!-- Fourth Row -->
              <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">Department</label>
                  <select v-model="form.department" class="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500">
                    <option value="">Select Department</option>
                    <option v-for="department in departments" :key="department" :value="department">{{ department }}</option>
                  </select>
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">Designation</label>
                  <select v-model="form.designation" class="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500">
                    <option value="">Select Designation</option>
                    <option v-for="designation in designations" :key="designation" :value="designation">{{ designation }}</option>
                  </select>
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">Role</label>
                  <select v-model="form.role" class="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500">
                    <option value="">Select Role</option>
                    <option v-for="role in roles" :key="role" :value="role">{{ role }}</option>
                  </select>
                </div>
              </div>

              <!-- Fifth Row -->
              <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">User Image (100px*100px)</label>
                  <div class="flex items-center">
                    <label class="bg-white border border-gray-300 rounded-md px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 cursor-pointer">
                      Browse...
                      <input type="file" class="hidden" @change="handleImageUpload" accept="image/*">
                    </label>
                    <span class="ml-2 text-sm text-gray-500 truncate max-w-xs">{{ form.userImage || 'No file selected' }}</span>
                  </div>
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">Duty Schedule</label>
                  <div class="relative">
                    <input v-model="form.dutySchedule" type="text" class="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500">
                    <div class="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                      <svg class="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                  </div>
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">Password</label>
                  <input v-model="form.password" type="password" class="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500">
                </div>
              </div>

              <!-- Submit Button -->
              <div class="mt-8 border-t border-gray-200 pt-4">
                <button type="submit" class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                  Update
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>