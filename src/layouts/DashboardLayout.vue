<template>
    <main class="flex flex-col w-full md:flex-row">
        <Sidebar />
        <router-view></router-view>
    </main>
</template>

<script setup>
import Sidebar from '../components/dashboard/Sidebar.vue';
</script>