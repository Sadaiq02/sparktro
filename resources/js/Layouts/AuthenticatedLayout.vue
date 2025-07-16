<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue';
import ApplicationLogo from '@/Components/ApplicationLogo.vue';
import Dropdown from '@/Components/Dropdown.vue';
import DropdownLink from '@/Components/DropdownLink.vue';
import NavLink from '@/Components/NavLink.vue';
import ResponsiveNavLink from '@/Components/ResponsiveNavLink.vue';
import { Link } from '@inertiajs/vue3';

const showingNavigationDropdown = ref(false);

// Responsive sidebar state
const sidebarVisible = ref(true);
const isMobile = ref(false);
const isTablet = ref(false);
const isDesktop = ref(false);
const sidebarHovered = ref(false);

// Menu states
const userMenuOpen = ref(false);
const rolePermissionMenuOpen = ref(false);
const profileMenuOpen = ref(false);
const notificationMenuOpen = ref(false);

// Mobile menu state
const mobileMenuOpen = ref(false);

// Check screen size and set responsive behavior
const checkScreenSize = () => {
    const width = window.innerWidth;
    isMobile.value = width < 768;
    isTablet.value = width >= 768 && width < 1024;
    isDesktop.value = width >= 1024;

    // Sidebar always visible but collapsed on mobile
    sidebarVisible.value = true;
};


// Computed sidebar width
const sidebarWidth = computed(() => {
    if (isMobile.value || isTablet.value) {
        return sidebarHovered.value ? 'w-64' : 'w-16';
    }
    return sidebarVisible.value ? 'w-64' : 'w-16';
});


// Computed sidebar content visibility
const showSidebarContent = computed(() => {
    if (isMobile.value || isTablet.value) {
        return sidebarHovered.value;
    }
    return sidebarVisible.value;
});


// Toggle sidebar
function toggleSidebar() {
    if (isDesktop.value) {
        sidebarVisible.value = !sidebarVisible.value;
    }
}

// Toggle mobile menu
function toggleMobileMenu() {
    mobileMenuOpen.value = !mobileMenuOpen.value;
}

// Handle sidebar hover for tablet
const handleSidebarMouseEnter = () => {
    sidebarHovered.value = true;
};

const handleSidebarMouseLeave = () => {
    sidebarHovered.value = false;
};

const handleSidebarTouchStart = () => {
    sidebarHovered.value = !sidebarHovered.value;
};

// Close mobile menu when clicking outside
const closeMobileMenu = () => {
    if (isMobile.value) {
        mobileMenuOpen.value = false;
    }
};


// Lifecycle hooks
onMounted(() => {
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    window.addEventListener('click', handleClickOutside);
});

onUnmounted(() => {
    window.removeEventListener('resize', checkScreenSize);
    window.removeEventListener('click', closeMobileMenu);
});
const handleClickOutside = (e) => {
    const dropdown = document.querySelector('.profile-dropdown-trigger');
    if (dropdown && !dropdown.contains(e.target)) {
        profileMenuOpen.value = false;
    }
};

</script>

<template>
    <div class="bg-gray-sparktro min-h-screen flex relative">
        <!-- Mobile Overlay -->
        <div v-if="isMobile && mobileMenuOpen" 
             class="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
             @click="closeMobileMenu"></div>

        <!-- Sidebar -->
        <aside :class="[
            sidebarWidth,
            'bg-white border-r border-gray-sparktro transition-all duration-300 ease-in-out relative z-50',
            // Remove h-screen from here, let flex handle its height
            // Also remove overflow-hidden from here, as the inner div handles scrolling
            isMobile ? 'fixed left-0 top-0 h-screen' : 'flex flex-col' // For desktop, make it a flex column
        
        ]"
        @mouseenter="handleSidebarMouseEnter"
        @mouseleave="handleSidebarMouseLeave"
        @touchstart="handleSidebarTouchStart">

            <!-- Logo area -->
            <div class="logo-area flex items-center justify-between h-[68px] px-4 py-2.5 border-b border-gray-sparktro">
                <div v-if="showSidebarContent" class="text-xl font-bold flex-1">
                    <div class="flex shrink-0 items-center">
                        <Link :href="route('dashboard')">
                            <ApplicationLogo class="block h-8 w-auto max-w-[120px] fill-current" />
                        </Link>
                    </div>
                </div>

                <!-- Toggle button -->
                <button @click="isMobile ? toggleMobileMenu() : toggleSidebar()" 
                        :class="{ 'ml-auto': !showSidebarContent }"
                        class="bg-white border rounded-full p-1.5 shadow hover:bg-gray-sparktro transition-colors duration-200">
                    <svg v-if="isMobile" xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-black-sparktro/60"
                        viewBox="0 0 20 20" fill="currentColor">
                        <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
                    </svg>
                    <svg v-else-if="showSidebarContent" xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-black-sparktro/60"
                        viewBox="0 0 20 20" fill="currentColor">
                        <path fill-rule="evenodd" d="M5 10a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1z" clip-rule="evenodd" />
                    </svg>
                    <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-black-sparktro/60" viewBox="0 0 20 20"
                        fill="currentColor">
                        <path fill-rule="evenodd" d="M5 10a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1z" clip-rule="evenodd" />
                    </svg>
                </button>
            </div>

            <!-- Sidebar content -->
            <div v-if="showSidebarContent" class="mt-6 px-4 overflow-y-auto h-[calc(100vh-68px)]">
                <ul class="space-y-1">
                    <!-- Dashboard -->
                    <li>
                        <a href="#"
                            class="py-2.5 px-3 flex items-center justify-between font-bold text-sm text-black-sparktro hover:text-primary-sparktro hover:bg-primary-sparktro/10 rounded-lg transition-all duration-200">
                            <span class="flex items-center">
                                <i class="material-icons-outlined mr-3 text-lg">grid_view</i>
                                <span class="whitespace-nowrap">Dashboard</span>
                            </span>
                            <svg class="w-4 h-4 transform transition-transform duration-300" fill="none"
                                stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M9 5l7 7-7 7" />
                            </svg>
                        </a>
                    </li>

                    <!-- User Management -->
                    <li>
                        <div @click="userMenuOpen = !userMenuOpen"
                            class="cursor-pointer py-2.5 px-3 text-sm font-bold flex justify-between items-center text-black-sparktro hover:text-primary-sparktro hover:bg-primary-sparktro/10 rounded-lg transition-all duration-200">
                            <span class="flex items-center mr-2">
                                <i class="material-icons-outlined mr-3 text-lg">group</i>
                                <span class="whitespace-nowrap">User Management</span>
                            </span>
                            <svg class="w-4 h-4 transform transition-transform duration-300"
                                :class="{ 'rotate-90': userMenuOpen }" fill="none" stroke="currentColor"
                                viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M9 5l7 7-7 7" />
                            </svg>
                        </div>

                        <transition enter-active-class="transition duration-300 ease-out"
                            enter-from-class="opacity-0 max-h-0" enter-to-class="opacity-100 max-h-40"
                            leave-active-class="transition duration-300 ease-in" leave-from-class="opacity-100 max-h-40"
                            leave-to-class="opacity-0 max-h-0">
                            <ul v-show="userMenuOpen" class="ml-8 mt-2 space-y-1 overflow-hidden">
                                <li class="py-1.5">
                                     <Link href="/users/all" class="block text-xs font-bold text-black-sparktro/80 hover:text-primary-sparktro transition-colors duration-200">- User List</Link>
                                </li>
                                <li class="py-1.5">
                                    <Link href="/users/create" class="block text-xs font-bold text-black-sparktro/80 hover:text-primary-sparktro transition-colors duration-200">- Create New User</Link>
                                </li>
                            </ul>
                        </transition>
                    </li>

                    <!-- Roles & Permissions -->
                    <li>
                        <div @click="rolePermissionMenuOpen = !rolePermissionMenuOpen"
                            class="cursor-pointer py-2.5 px-3 text-sm font-bold flex justify-between items-center text-black-sparktro hover:text-primary-sparktro hover:bg-primary-sparktro/10 rounded-lg transition-all duration-200">
                            <span class="flex items-center mr-2">
                                <i class="material-icons-outlined mr-3 text-lg">manage_accounts</i>
                                <span class="whitespace-nowrap">Role & Permission</span>
                            </span>
                            <svg class="w-4 h-4 transform transition-transform duration-300"
                                :class="{ 'rotate-90': rolePermissionMenuOpen }" fill="none" stroke="currentColor"
                                viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M9 5l7 7-7 7" />
                            </svg>
                        </div>

                        <transition enter-active-class="transition duration-300 ease-out"
                            enter-from-class="opacity-0 max-h-0" enter-to-class="opacity-100 max-h-40"
                            leave-active-class="transition duration-300 ease-in" leave-from-class="opacity-100 max-h-40"
                            leave-to-class="opacity-0 max-h-0">
                            <ul v-show="rolePermissionMenuOpen" class="ml-8 mt-2 space-y-1 overflow-hidden">
                                <li class="py-1.5">
                                    <a href="#" class="block text-xs font-bold text-black-sparktro/80 hover:text-primary-sparktro transition-colors duration-200">- Role</a>
                                </li>
                                <li class="py-1.5">
                                    <a href="#" class="block text-xs font-bold text-black-sparktro/80 hover:text-primary-sparktro transition-colors duration-200">- Assign Role & Permissions</a>
                                </li>
                            </ul>
                        </transition>
                    </li>

                    <!-- Activity Logs -->
                    <li>
                        <a href="#"
                            class="py-2.5 px-3 flex items-center justify-between font-bold text-sm text-black-sparktro hover:text-primary-sparktro hover:bg-primary-sparktro/10 rounded-lg transition-all duration-200">
                            <span class="flex items-center">
                                <i class="material-icons-outlined mr-3 text-lg">bar_chart</i>
                                <span class="whitespace-nowrap">Activity Logs</span>
                            </span>
                            <svg class="w-4 h-4 transform transition-transform duration-300" fill="none"
                                stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M9 5l7 7-7 7" />
                            </svg>
                        </a>
                    </li>

                    <!-- Profile Management -->
                    <li>
                        <a href="#"
                            class="py-2.5 px-3 flex items-center justify-between font-bold text-sm text-black-sparktro hover:text-primary-sparktro hover:bg-primary-sparktro/10 rounded-lg transition-all duration-200">
                            <span class="flex items-center">
                                <i class="material-icons-outlined mr-3 text-lg">person</i>
                                <span class="whitespace-nowrap">Profile Management</span>
                            </span>
                            <svg class="w-4 h-4 transform transition-transform duration-300" fill="none"
                                stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M9 5l7 7-7 7" />
                            </svg>
                        </a>
                    </li>

                    <!-- Notifications -->
                    <li>
                        <a href="#"
                            class="py-2.5 px-3 flex items-center justify-between font-bold text-sm text-black-sparktro hover:text-primary-sparktro hover:bg-primary-sparktro/10 rounded-lg transition-all duration-200">
                            <span class="flex items-center">
                                <i class="material-icons-outlined mr-3 text-lg">notifications</i>
                                <span class="whitespace-nowrap">Notifications</span>
                            </span>
                            <svg class="w-4 h-4 transform transition-transform duration-300" fill="none"
                                stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M9 5l7 7-7 7" />
                            </svg>
                        </a>
                    </li>

                    <!-- Settings -->
                    <li>
                        <a href="#"
                            class="py-2.5 px-3 flex items-center justify-between font-bold text-sm text-black-sparktro hover:text-primary-sparktro hover:bg-primary-sparktro/10 rounded-lg transition-all duration-200">
                            <span class="flex items-center">
                                <i class="material-icons-outlined mr-3 text-lg">settings</i>
                                <span class="whitespace-nowrap">Settings</span>
                            </span>
                            <svg class="w-4 h-4 transform transition-transform duration-300" fill="none"
                                stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M9 5l7 7-7 7" />
                            </svg>
                        </a>
                    </li>

                    <!-- Logout -->
                    <li class="mt-8">
                        <a href="#"
                            class="py-2.5 px-3 flex items-center justify-between font-bold text-sm text-black-sparktro hover:text-primary-sparktro hover:bg-primary-sparktro/10 rounded-lg transition-all duration-200">
                            <span class="flex items-center">
                                <i class="material-icons-outlined mr-3 text-lg">logout</i>
                                <span class="whitespace-nowrap">Logout</span>
                            </span>
                            <svg class="w-4 h-4 transform transition-transform duration-300" fill="none"
                                stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M9 5l7 7-7 7" />
                            </svg>
                        </a>
                    </li>
                </ul>
            </div>

            <!-- Icon-only sidebar for tablet/desktop collapsed state -->
            <div v-if="!showSidebarContent && !isMobile" class="mt-6 px-2 overflow-y-auto h-[calc(100vh-68px)]">
                <ul class="space-y-2">
                    <li>
                        <a href="#" class="p-2 flex items-center justify-center text-black-sparktro hover:text-primary-sparktro hover:bg-primary-sparktro/10 rounded-lg transition-all duration-200" title="Dashboard">
                            <i class="material-icons-outlined text-lg">grid_view</i>
                        </a>
                    </li>
                    <li>
                        <a href="#" class="p-2 flex items-center justify-center text-black-sparktro hover:text-primary-sparktro hover:bg-primary-sparktro/10 rounded-lg transition-all duration-200" title="User Management">
                            <i class="material-icons-outlined text-lg">group</i>
                        </a>
                    </li>
                    <li>
                        <a href="#" class="p-2 flex items-center justify-center text-black-sparktro hover:text-primary-sparktro hover:bg-primary-sparktro/10 rounded-lg transition-all duration-200" title="Role & Permission">
                            <i class="material-icons-outlined text-lg">manage_accounts</i>
                        </a>
                    </li>
                    <li>
                        <a href="#" class="p-2 flex items-center justify-center text-black-sparktro hover:text-primary-sparktro hover:bg-primary-sparktro/10 rounded-lg transition-all duration-200" title="Activity Logs">
                            <i class="material-icons-outlined text-lg">bar_chart</i>
                        </a>
                    </li>
                    <li>
                        <a href="#" class="p-2 flex items-center justify-center text-black-sparktro hover:text-primary-sparktro hover:bg-primary-sparktro/10 rounded-lg transition-all duration-200" title="Profile Management">
                            <i class="material-icons-outlined text-lg">person</i>
                        </a>
                    </li>
                    <li>
                        <a href="#" class="p-2 flex items-center justify-center text-black-sparktro hover:text-primary-sparktro hover:bg-primary-sparktro/10 rounded-lg transition-all duration-200" title="Notifications">
                            <i class="material-icons-outlined text-lg">notifications</i>
                        </a>
                    </li>
                    <li>
                        <a href="#" class="p-2 flex items-center justify-center text-black-sparktro hover:text-primary-sparktro hover:bg-primary-sparktro/10 rounded-lg transition-all duration-200" title="Settings">
                            <i class="material-icons-outlined text-lg">settings</i>
                        </a>
                    </li>
                    <li class="mt-8">
                        <a href="#" class="p-2 flex items-center justify-center text-black-sparktro hover:text-primary-sparktro hover:bg-primary-sparktro/10 rounded-lg transition-all duration-200" title="Logout">
                            <i class="material-icons-outlined text-lg">logout</i>
                        </a>
                    </li>
                </ul>
            </div>
        </aside>

        <!-- Main Content -->
        <div class="flex-1 flex flex-col min-w-0">
            <header class="bg-white shadow-sm h-[68px] px-4 lg:px-6 py-2.5 flex justify-between items-center border-b border-gray-sparktro sticky top-0 z-30">
               <!-- Mobile Menu Button -->
                <!-- Search Input -->
                <div class="flex items-center relative flex-1 max-w-[300px] mx-4">
                    <svg class="absolute left-3 w-4 h-4 text-black-sparktro/50 pointer-events-none" fill="none"
                        stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round"
                            d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 104.35 4.35a7.5 7.5 0 0012.3 12.3z" />
                    </svg>
                    <input type="text" placeholder="Search..."
                        class="w-full h-[40px] py-[12px] pr-[16px] pl-[40px] border border-gray-sparktro rounded-[8px] focus:outline-none focus:ring-1 focus:ring-primary-sparktro focus:border-primary-sparktro text-sm">
                </div>

                <!-- Right Actions -->
                <div class="flex items-center space-x-2 lg:space-x-4">
                    <!-- Language Selector -->
                    <div class="relative hidden sm:block">
                        <select
                            class="appearance-none border-0 rounded px-3 py-1 text-sm focus:outline-none pr-7 bg-white [&::-ms-expand]:hidden cursor-pointer">
                            <option value="en">English</option>
                            <option value="bd">Bangla</option>
                        </select>
                        <svg class="absolute right-2 top-1/2 transform -translate-y-1/2 w-3 h-3 text-black-sparktro/60 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                               </svg>
                    </div>

                    <!-- Notification Icon -->
                    <button class="relative text-black-sparktro p-2 rounded-lg hover:bg-gray-sparktro transition-colors duration-200">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path
                                d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a2 2 0 002-2H8a2 2 0 002 2z" />
                        </svg>
                        <span class="absolute top-1 right-1 inline-block w-2 h-2 bg-red-sparktro rounded-full"></span>
                    </button>

                    <!-- User Avatar -->
                    <div class="relative group">
                        <div
    class="w-8 h-8 rounded-full bg-primary-sparktro flex items-center justify-center text-white font-bold cursor-pointer hover:bg-primary-sparktro/90 transition-colors duration-200 profile-dropdown-trigger"
    @click.stop="profileMenuOpen = !profileMenuOpen"
>
    JD
</div>

                        <div
                            class="absolute right-0 mt-2 w-48 bg-white border border-gray-sparktro rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-25">
                            <div class="p-3 border-b border-gray-sparktro">
                                <p class="font-semibold text-black-sparktro text-sm">John Doe</p>
                                <p class="text-black-sparktro/60 text-xs">john@example.com</p>
                            </div>
                            <div class="py-1">
                                <a href="#" class="block px-3 py-2 text-sm hover:bg-gray-sparktro transition-colors duration-200">Profile</a>
                                <a href="#" class="block px-3 py-2 text-sm hover:bg-gray-sparktro transition-colors duration-200">Settings</a>
                                <a href="#" class="block px-3 py-2 text-sm hover:bg-gray-sparktro transition-colors duration-200">Logout</a>
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            <!-- Main Section -->
            <main class="p-4 lg:p-6 bg-gray-sparktro flex-1 overflow-auto">
                <slot />
            </main>
        </div>
    </div>
</template>

<style scoped>
/* Custom scrollbar for sidebar */
.overflow-y-auto::-webkit-scrollbar {
    width: 4px;
}

.overflow-y-auto::-webkit-scrollbar-track {
    background: transparent;
}

.overflow-y-auto::-webkit-scrollbar-thumb {
    background: rgba(0, 0, 0, 0.1);
    border-radius: 2px;
}

.overflow-y-auto::-webkit-scrollbar-thumb:hover {
    background: rgba(0, 0, 0, 0.2);
}

/* Smooth transitions */
.transition-all {
    transition-property: all;
    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
}

/* Ensure proper z-index stacking */
.z-50 {
    z-index: 50;
}

.z-40 {
    z-index: 40;
}
</style> 