<template>
    <main v-if="userData" class=" flex flex-col gap-10 items-center justify-center py-10 min-h-screen" :class="`${userData.theme}Theme`">
        <div class="relative max-w-sm w-full">
            <button @click="copyUrl" class=" bg-white rounded-full p-3 absolute right-0 shadow mr-5">
                <PhShareNetwork class="w-7 h-7" style="color: var(--primary);"/>
            </button>
            <span v-if="copied"
                class="absolute text-sm bg-black text-white top-16 right-3.5 py-1 px-2 rounded-lg">Copied!</span>
        </div>
        <Profile :userData="userData" />
        <Links :userData="userData" />

        <div class="flex flex-col items-center justify-center mt-5">
            <router-link to="/" class="font-black text-black text-xl ">
                My<span>Links</span>
            </router-link>
            <p class="text-black opacity-90 text-sm">Made with ❤️ by
                <a href="https://www.linkedin.com/in/santiago-betancur/" class="underline" target="_blank">
                    sbetav
                </a>
            </p>
        </div>
    </main>
    <div v-else class="h-screen w-full grid place-content-center">
        <Loader size="40" />
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import router from '../router';
import { getAllUsers } from '../utils/useFirebase';
import Profile from '../components/user/Profile.vue';
import Links from '../components/user/Links.vue';
import Loader from '../components/Loader.vue';
import { PhShareNetwork } from '@phosphor-icons/vue';

const props = defineProps({
    username: String,
    required: true
})

const getUserData = async () => {
    const users = await getAllUsers();
    const user = users.find(user => user.username.toLowerCase() === props.username.toLowerCase());
    if (!user) {
        router.push('/not-found');
        return;
    }
    return user;
}

const userData = ref(null);

const copied = ref(false);

const copyUrl = () => {
    const url = window.location.href;
    navigator.clipboard.writeText(url);
    copied.value = true;
    setTimeout(() => {
        copied.value = false;
    }, 2000);
}

onMounted(async () => {
    userData.value = await getUserData();
})


</script>