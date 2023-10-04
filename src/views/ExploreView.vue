<template>
    <main v-if="users" class="min-height custom-width flex flex-col items-center justify-center gap-7 py-14">
        <h1 class="text-4xl font-bold text-black text-center">People using
            <span class="font-black">
                My<span class="text-primary">links</span>
            </span>
        </h1>

        <div class="w-full flex flex-col gap-4 items-center justify-center">
            <router-link to="/" class="underline mb-2">Go back</router-link>
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 w-full gap-4">
                <a v-for="user in users" :href="getUserUrl(user.username)" target="_blank"
                    class="flex items-center bg-white shadow p-3 rounded-full w-full">
                    <div class="flex items-center gap-4">
                        <img :src="user.profileImg" alt="profile img" class="w-14 h-14 rounded-full bg-gray-200">
                        <p class="font-bold text-black text-3xl line-clamp-1">{{ user.username }}</p>
                    </div>
                    <PhArrowUpRight class="ml-auto w-7 h-7 text-primary mr-3" weight="bold" />
                </a>
                <router-link to="/dashboard" class="flex items-center bg-black py-3 px-6 rounded-full w-full">
                    <p class="font-bold text-white text-xl line-clamp-1">Get yours</p>
                    <PhArrowUpRight class="ml-auto w-7 h-7 text-white" weight="bold" />
                </router-link>
            </div>
        </div>
    </main>

    <main v-else class="min-height w-full grid place-items-center">
        <Loader color="black" size="40" />
    </main>
</template>


<script setup>
import { ref } from 'vue';
import { getAllUsers } from '../utils/useFirebase';
import { PhArrowUpRight } from '@phosphor-icons/vue';
import Loader from '../components/Loader.vue';

const users = ref(null);

getAllUsers().then((res) => {
    users.value = res;
});

const getUserUrl = (username) => {
    const domain = window.location.origin;
    return `${domain}/${username}`;
};

</script>