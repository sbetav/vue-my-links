<template>
    <section class="min-height flex flex-col items-center justify-center gap-10 mx-8 py-10 md:flex-row ">
        <div class="flex flex-col items-center justify-center gap-6 md:items-start">
            <h1 class="font-bold text-black text-4xl max-w-md text-center md:text-left sm:text-5xl">All your socials in the same
                <span class="font-black text-primary">
                    place
                </span>
            </h1>
            <div class="flex flex-col justify-center items-center gap-4 md:justify-start sm:flex-row w-5/6">
                <router-link to="/register" class="btn btn-black w-full">Create your own</router-link>
                <router-link to="explore" class="btn btn-white flex items-center justify-center gap-1 w-full">
                    Explore
                    <PhArrowCircleUpRight class="inline-block w-6 h-6" />
                </router-link>
            </div>
        </div>
        <img src="../assets/img/mockup.png" alt="Example image" style="width: 320px; height: 560px;">
    </section>
</template>

<script setup>
import { PhArrowCircleUpRight } from '@phosphor-icons/vue';
</script>