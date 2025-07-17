<script setup>
import { ref, watch, computed } from "vue";
import ApplicationLogo from "@/Components/ApplicationLogo.vue";
import { Link, usePage } from "@inertiajs/vue3";

const page = usePage();

const props = defineProps({
    sidebarVisible: Boolean,
});

const emit = defineEmits(['toggle-sidebar']);

const userMenuOpen = ref(false);
const rolePermissionMenuOpen = ref(false);
const profileMenuOpen = ref(false);
const notificationMenuOpen = ref(false);
const settingsMenuOpen = ref(false);

function toggleSidebar() {
    emit('toggle-sidebar');
}

watch(() => props.sidebarVisible, (newVal) => {
    // When sidebar collapses, close all open menus for a cleaner look
    if (!newVal) {
        userMenuOpen.value = false;
        rolePermissionMenuOpen.value = false;
        profileMenuOpen.value = false;
        notificationMenuOpen.value = false;
        settingsMenuOpen.value = false;
    }
});

// --- Computed properties for active parent menu items ---
// The `route()` function is from Ziggy and should be called directly.
const isDashboardActive = computed(() => route().current('dashboard'));

const isUserManagementActive = computed(() =>
    route().current('users.all') || route().current('users.create')
);

const isRolePermissionActive = computed(() =>
    route().current('role-permission.roles') ||
    route().current('role-permission.assign')
);

const isActivityLogsActive = computed(() =>
    route().current('activity-logs.index')
);

const isProfileManagementActive = computed(() =>
    route().current('profile.edit')
);

const isNotificationsActive = computed(() =>
    route().current('notifications.all')
);

const isSettingsActive = computed(() =>
    route().current('settings')
);

// --- Watch for route changes to automatically open parent menus ---
watch(() => page.url, (newUrl) => {
    // Use startsWith for broader matching of parent routes
    userMenuOpen.value = newUrl.startsWith('/users');
    rolePermissionMenuOpen.value = newUrl.startsWith('/role-permission');
    profileMenuOpen.value = newUrl.startsWith('/profile');
    notificationMenuOpen.value = newUrl.startsWith('/notifications');
    settingsMenuOpen.value = newUrl.startsWith('/settings');
}, { immediate: true });
</script>

<template>
    <aside
        :class="props.sidebarVisible ? 'w-[280px]' : 'w-[72px]'"
        class="bg-white border-r border-gray-sparktro transition-all duration-300 relative overflow-hidden flex flex-col"
    >
        <div
            class="logo-area flex items-center justify-between h-[68px] px-4 py-2.5 border-b border-gray-sparktro"
        >
            <div v-if="props.sidebarVisible" class="flex shrink-0 items-center">
                <Link :href="route('dashboard')">
                    <ApplicationLogo
                        class="block h-8 w-auto fill-current text-primary-600"
                    />
                </Link>
            </div>

            <button
                @click="toggleSidebar"
                :class="{'justify-center w-full': !props.sidebarVisible, 'ml-auto': props.sidebarVisible}"
                class="sidebar-toggle-btn p-1 rounded-full text-gray-500 hover:bg-gray-100 flex items-center"
            >
                <svg
                    :class="{'rotate-180': props.sidebarVisible}"
                    class="h-5 w-5 transition-transform duration-300"
                    fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"
                >
                    <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" />
                </svg>
            </button>
        </div>

        <div class="flex-1 overflow-y-auto mt-6 px-4 pb-4 custom-scrollbar">
            <ul class="space-y-1">
                <li>
                    <Link
                        :href="route('dashboard')"
                        :class="{ 'sidebar-active-link': isDashboardActive, 'justify-center': !props.sidebarVisible }"
                        class="sidebar-link group"
                    >
                        <span class="flex items-center" :class="{'w-full justify-center': !props.sidebarVisible}">
                            <i class="material-icons text-xl mr-2" :class="{'!mr-0': !props.sidebarVisible}">grid_view</i>
                            <span v-if="props.sidebarVisible">Dashboard</span>
                        </span>
                        <span v-if="!props.sidebarVisible" class="sidebar-tooltip">Dashboard</span>
                    </Link>
                </li>

                <li>
                    <div
                        @click="userMenuOpen = !userMenuOpen"
                        :class="{ 'sidebar-active-link': isUserManagementActive, 'justify-center': !props.sidebarVisible }"
                        class="sidebar-link group cursor-pointer"
                    >
                        <span class="flex items-center" :class="{'w-full justify-center': !props.sidebarVisible}">
                            <i class="material-icons text-xl mr-2" :class="{'!mr-0': !props.sidebarVisible}">group</i>
                            <span v-if="props.sidebarVisible">User Management</span>
                        </span>
                        <svg
                            v-if="props.sidebarVisible"
                            class="w-4 h-4 transform transition-transform duration-300 sidebar-arrow"
                            :class="{ 'rotate-90': userMenuOpen }"
                            fill="none" stroke="currentColor" viewBox="0 0 24 24"
                        >
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                        </svg>
                        <span v-if="!props.sidebarVisible" class="sidebar-tooltip">User Management</span>
                    </div>

                    <transition
                        enter-active-class="transition duration-300 ease-out"
                        enter-from-class="opacity-0 max-h-0"
                        enter-to-class="opacity-100 max-h-[500px]" leave-active-class="transition duration-300 ease-in"
                        leave-from-class="opacity-100 max-h-[500px]" leave-to-class="opacity-0 max-h-0"
                    >
                        <ul v-show="userMenuOpen && props.sidebarVisible" class="ml-5 mt-0 space-y-1 overflow-hidden">
                            <li class="py-2">
                                <Link
                                    :href="route('users.all')"
                                    :class="{ 'sidebar-active-link': route().current('users.all') }"
                                    class="block text-sm font-medium text-gray-700 hover:text-primary-sparktro"
                                >
                                    - User List
                                </Link>
                            </li>
                            <li class="py-1">
                                <Link
                                    :href="route('users.create')"
                                    :class="{ 'sidebar-active-link': route().current('users.create') }"
                                    class="block text-sm font-medium text-gray-700 hover:text-primary-sparktro"
                                >
                                    - Create New User
                                </Link>
                            </li>
                        </ul>
                    </transition>
                </li>

                <li>
                    <div
                        @click="rolePermissionMenuOpen = !rolePermissionMenuOpen"
                        :class="{ 'sidebar-active-link': isRolePermissionActive, 'justify-center': !props.sidebarVisible }"
                        class="sidebar-link group cursor-pointer"
                    >
                        <span class="flex items-center" :class="{'w-full justify-center': !props.sidebarVisible}">
                            <i class="material-icons text-xl mr-2" :class="{'!mr-0': !props.sidebarVisible}">manage_accounts</i>
                            <span v-if="props.sidebarVisible">Role & Permission</span>
                        </span>
                        <svg
                            v-if="props.sidebarVisible"
                            class="w-4 h-4 transform transition-transform duration-300 sidebar-arrow"
                            :class="{ 'rotate-90': rolePermissionMenuOpen }"
                            fill="none" stroke="currentColor" viewBox="0 0 24 24"
                        >
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                        </svg>
                        <span v-if="!props.sidebarVisible" class="sidebar-tooltip">Role & Permission</span>
                    </div>

                    <transition
                        enter-active-class="transition duration-300 ease-out"
                        enter-from-class="opacity-0 max-h-0"
                        enter-to-class="opacity-100 max-h-[500px]" leave-active-class="transition duration-300 ease-in"
                        leave-from-class="opacity-100 max-h-[500px]" leave-to-class="opacity-0 max-h-0"
                    >
                        <ul v-show="rolePermissionMenuOpen && props.sidebarVisible" class="ml-5 mt-0 space-y-1 overflow-hidden">
                            <li class="py-2">
                                <Link
                                    :href="route('role-permission.roles')"
                                    :class="{ 'sidebar-active-link': route().current('role-permission.roles') }"
                                    class="block text-sm font-medium text-gray-700 hover:text-primary-sparktro"
                                >
                                    - Role
                                </Link>
                            </li>
                            <li class="py-1">
                                <Link
                                    :href="route('role-permission.assign')"
                                    :class="{ 'sidebar-active-link': route().current('role-permission.assign') }"
                                    class="block text-sm font-medium text-gray-700 hover:text-primary-sparktro"
                                >
                                    - Assign Role & Permissions
                                </Link>
                            </li>
                        </ul>
                    </transition>
                </li>

                <li>
                    <Link
                        :href="route('activity-logs.index')"
                        :class="{ 'sidebar-active-link': isActivityLogsActive, 'justify-center': !props.sidebarVisible }"
                        class="sidebar-link group"
                    >
                        <span class="flex items-center" :class="{'w-full justify-center': !props.sidebarVisible}">
                            <i class="material-icons text-xl mr-2" :class="{'!mr-0': !props.sidebarVisible}">history</i>
                            <span v-if="props.sidebarVisible">Activity Logs</span>
                        </span>
                        <span v-if="!props.sidebarVisible" class="sidebar-tooltip">Activity Logs</span>
                    </Link>
                </li>

                <li>
                    <div
                        @click="profileMenuOpen = !profileMenuOpen"
                        :class="{ 'sidebar-active-link': isProfileManagementActive, 'justify-center': !props.sidebarVisible }"
                        class="sidebar-link group cursor-pointer"
                    >
                        <span class="flex items-center" :class="{'w-full justify-center': !props.sidebarVisible}">
                            <i class="material-icons text-xl mr-2" :class="{'!mr-0': !props.sidebarVisible}">person</i>
                            <span v-if="props.sidebarVisible">Profile Management</span>
                        </span>
                        <svg
                            v-if="props.sidebarVisible"
                            class="w-4 h-4 transform transition-transform duration-300 sidebar-arrow"
                            :class="{ 'rotate-90': profileMenuOpen }"
                            fill="none" stroke="currentColor" viewBox="0 0 24 24"
                        >
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                        </svg>
                        <span v-if="!props.sidebarVisible" class="sidebar-tooltip">Profile Management</span>
                    </div>
                    <transition
                        enter-active-class="transition duration-300 ease-out"
                        enter-from-class="opacity-0 max-h-0"
                        enter-to-class="opacity-100 max-h-[500px]" leave-active-class="transition duration-300 ease-in"
                        leave-from-class="opacity-100 max-h-[500px]" leave-to-class="opacity-0 max-h-0"
                    >
                        <ul v-show="profileMenuOpen && props.sidebarVisible" class="ml-5 mt-0 space-y-1 overflow-hidden">
                            <li class="py-2">
                                <Link
                                    :href="route('profile.edit')"
                                    :class="{ 'sidebar-active-link': route().current('profile.edit') }"
                                    class="block text-sm font-medium text-gray-700 hover:text-primary-sparktro"
                                >
                                    - My Profile
                                </Link>
                            </li>
                        </ul>
                    </transition>
                </li>

                <li>
                    <div
                        @click="notificationMenuOpen = !notificationMenuOpen"
                        :class="{ 'sidebar-active-link': isNotificationsActive, 'justify-center': !props.sidebarVisible }"
                        class="sidebar-link group cursor-pointer"
                    >
                        <span class="flex items-center" :class="{'w-full justify-center': !props.sidebarVisible}">
                            <i class="material-icons text-xl mr-2" :class="{'!mr-0': !props.sidebarVisible}">notifications</i>
                            <span v-if="props.sidebarVisible">Notifications</span>
                        </span>
                        <svg
                            v-if="props.sidebarVisible"
                            class="w-4 h-4 transform transition-transform duration-300 sidebar-arrow"
                            :class="{ 'rotate-90': notificationMenuOpen }"
                            fill="none" stroke="currentColor" viewBox="0 0 24 24"
                        >
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                        </svg>
                        <span v-if="!props.sidebarVisible" class="sidebar-tooltip">Notifications</span>
                    </div>
                    <transition
                        enter-active-class="transition duration-300 ease-out"
                        enter-from-class="opacity-0 max-h-0"
                        enter-to-class="opacity-100 max-h-[500px]" leave-active-class="transition duration-300 ease-in"
                        leave-from-class="opacity-100 max-h-[500px]" leave-to-class="opacity-0 max-h-0"
                    >
                        <ul v-show="notificationMenuOpen && props.sidebarVisible" class="ml-5 mt-0 space-y-1 overflow-hidden">
                            <li class="py-2">
                                <Link
                                    :href="route('notifications.all')"
                                    :class="{ 'sidebar-active-link': route().current('notifications.all') }"
                                    class="block text-sm font-medium text-gray-700 hover:text-primary-sparktro"
                                >
                                    - All Notifications
                                </Link>
                            </li>
                        </ul>
                    </transition>
                </li>

                <li>
                    <div
                        @click="settingsMenuOpen = !settingsMenuOpen"
                        :class="{ 'sidebar-active-link': isSettingsActive, 'justify-center': !props.sidebarVisible }"
                        class="sidebar-link group cursor-pointer"
                    >
                        <span class="flex items-center" :class="{'w-full justify-center': !props.sidebarVisible}">
                            <i class="material-icons text-xl mr-2" :class="{'!mr-0': !props.sidebarVisible}">settings</i>
                            <span v-if="props.sidebarVisible">Settings</span>
                        </span>
                        <svg
                            v-if="props.sidebarVisible"
                            class="w-4 h-4 transform transition-transform duration-300 sidebar-arrow"
                            :class="{ 'rotate-90': settingsMenuOpen }"
                            fill="none" stroke="currentColor" viewBox="0 0 24 24"
                        >
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                        </svg>
                        <span v-if="!props.sidebarVisible" class="sidebar-tooltip">Settings</span>
                    </div>
                    <transition
                        enter-active-class="transition duration-300 ease-out"
                        enter-from-class="opacity-0 max-h-0"
                        enter-to-class="opacity-100 max-h-[500px]" leave-active-class="transition duration-300 ease-in"
                        leave-from-class="opacity-100 max-h-[500px]" leave-to-class="opacity-0 max-h-0"
                    >
                        <ul v-show="settingsMenuOpen && props.sidebarVisible" class="ml-5 mt-0 space-y-1 overflow-hidden">
                            <li class="py-2">
                                <Link
                                    :href="route('settings')"
                                    :class="{ 'sidebar-active-link': route().current('settings') }"
                                    class="block text-sm font-medium text-gray-700 hover:text-primary-sparktro"
                                >
                                    - General Settings
                                </Link>
                            </li>
                        </ul>
                    </transition>
                </li>

                <li class="mt-auto pt-4">
                    <Link
                        :href="route('logout')" method="post" as="button"
                        :class="{'justify-center': !props.sidebarVisible}"
                        class="sidebar-link group w-full text-left"
                    >
                        <span class="flex items-center" :class="{'w-full justify-center': !props.sidebarVisible}">
                            <i class="material-icons text-xl mr-2" :class="{'!mr-0': !props.sidebarVisible}">logout</i>
                            <span v-if="props.sidebarVisible">Logout</span>
                        </span>
                        <span v-if="!props.sidebarVisible" class="sidebar-tooltip">Logout</span>
                    </Link>
                </li>
            </ul>
        </div>
    </aside>
</template>

<style scoped>
/* Custom Sparktro Colors (add these to your Tailwind config or here for demo) */
.text-black-sparktro { color: #333333; }
.text-primary-sparktro { color: #667EEA; } /* Example primary color */
.bg-primary-sparktro\/10 { background-color: rgba(102, 126, 234, 0.1); }
.border-gray-sparktro { border-color: #E5E7EB; } /* A light gray for borders */
.bg-gray-sparktro { background-color: #F8F9FA; } /* The light background color */
.bg-red-sparktro { background-color: #EF4444; }

/* Base link styles for sidebar items */
.sidebar-link {
    @apply py-2 px-3 flex items-center text-sm font-bold text-gray-700 hover:text-primary-sparktro hover:bg-primary-sparktro/10 rounded transition-colors duration-200;
}

/* Active link styles (adjust colors to match Figma exactly) */
.sidebar-active-link {
    /* This uses a light primary background and primary text color as seen in the image for "Dashboard" */
    @apply bg-primary-sparktro/10 text-primary-sparktro;
}

.sidebar-active-link .sidebar-arrow {
    @apply text-primary-sparktro; /* Arrow color for active link */
}

/* Specific styling for Material Icons within sidebar links */
.sidebar-link .material-icons {
    @apply text-lg; /* Default icon size */
    transition: all 0.2s ease-in-out; /* Smooth transition for icon changes */
    line-height: 1; /* Helps with vertical alignment of icons */
}

/* Adjust icon color based on link state */
.sidebar-link:hover .material-icons,
.sidebar-active-link .material-icons {
    @apply text-primary-sparktro; /* Icon color on hover/active */
}

/* Collapsed Sidebar Tooltip */
.sidebar-tooltip {
    @apply absolute left-full ml-4 px-3 py-1 bg-gray-800 text-white text-xs rounded-md shadow-lg
           opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200
           whitespace-nowrap z-50;
}

/* Custom Scrollbar for better appearance (optional, requires more setup for cross-browser) */
.custom-scrollbar::-webkit-scrollbar {
    width: 6px;
}

.custom-scrollbar::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 10px;
}

.custom-scrollbar::-webkit-scrollbar-thumb {
    background: #888;
    border-radius: 10px;
}

.custom-scrollbar::-webkit-scrollbar-thumb:hover {
    background: #555;
}

/* Optional: Hide scrollbar in Firefox for cleaner look */
.custom-scrollbar {
    scrollbar-width: thin; /* "auto" or "thin" */
    scrollbar-color: #888 #f1f1f1; /* thumb and track color */
}
</style>