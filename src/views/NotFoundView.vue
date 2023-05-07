<template>
    <Header page="home" />
    <div class="w-full min-height flex flex-col items-center justify-center">
        <p class="font-black text-primary text-6xl">404</p>
        <h1 class="text-2xl">Page not found</h1>
        <router-link to="/" class="btn btn-black mt-5">Go back home</router-link>
    </div>
    <Footer />
</template>


<script setup>
import Header from '../components/Header.vue';
import Footer from '../components/Footer.vue';
</script>