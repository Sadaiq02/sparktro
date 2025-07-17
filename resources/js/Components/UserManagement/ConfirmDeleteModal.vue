<template>
  <Transition name="fade">
    <div v-if="show" class="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div class="absolute inset-0 bg-black/50" @click="cancel"></div>

      <div class="relative bg-white rounded-lg shadow-lg w-full max-w-md mx-auto">
        <div class="p-6 text-center">
          <div class="mb-2">
            <div class="text-lg font-bold text-gray-900">{{ userId }}</div>
            <div class="text-md font-medium text-gray-700">{{ userName }}</div>
          </div>

          <div class="border-t border-gray-200 my-4"></div>

          <div class="mb-6">
            <h3 class="text-lg font-bold text-gray-900 mb-1">Are You Sure?</h3>
            <p class="text-sm text-gray-500">You want to delete this user?</p>
          </div>

          <div class="flex justify-center space-x-3">
            <button
              @click="cancel"
              class="px-5 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              @click="confirm"
              class="px-5 py-2 border border-transparent rounded-md text-sm font-medium text-white bg-red-600 hover:bg-red-700 transition-colors"
            >
              Yes, Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup>
defineProps({
  show: {
    type: Boolean,
    default: false
  },
  userId: { // Assuming you want to display the actual user ID from your data
    type: [String, Number], // Can be string or number
    default: ''
  },
  userName: {
    type: String,
    default: ''
  }
});

const emit = defineEmits(['confirm', 'cancel']);

const confirm = () => {
  emit('confirm');
};

const cancel = () => {
  emit('cancel');
};
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>