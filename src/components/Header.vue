<template>
    <header v-if="page == 'home'" class="w-full py-3 shadow bg-white sticky top-0 !font-bold">
        <div class="custom-width flex items-center justify-between ">
            <router-link to="/" class="!font-black text-2xl py-2 !text-black">
                My<span class="text-primary">Links</span>
            </router-link>
            <div v-if="showHomeButtons" class="flex gap-3">
                <router-link to="/login" class="btn">Login</router-link>
                <router-link to="/register" class="btn btn-black">Sign up</router-link>
            </div>
        </div>
    </header>

    <header v-if="page == 'dashboard'" class="w-full py-3 shadow bg-white sticky top-0">
        <div class="custom-width flex items-center justify-between ">
            <router-link to="/dashboard" class="font-black text-2xl py-2 text-black">
                My<span class="text-primary">Links</span>
            </router-link>
        </div>
    </header>
</template>

<script setup>
defineProps({
    showHomeButtons: {
        type: Boolean,
        default: false,
    },
    page: {
        type: String,
        default: '',
    },
})
</script>