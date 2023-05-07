<template>
    <div id="sidebar" class="fixed top-0 bg-white h-screen flex items-center justify-center shadow z-30 w-full animate-slideIn md:flex md:w-auto md:animate-none"
        :class="isOpen ? 'flex' : 'hidden'">

        <div class="flex flex-col justify-center gap-60 h-full py-10 pl-12 pr-16">
            <router-link to="/dashboard" class="text-2xl py-2 !text-black !font-black ">
                My<span class="text-primary">Links</span>
            </router-link>
            <button @click="closeSidebar" class="md:hidden absolute top-6 left-6">
                <PhX class="w-8 h-8 text-lg " />
            </button>
            <div class="flex flex-col gap-5">
                <router-link @click="closeSidebar" to="/dashboard" class="flex items-center gap-2 text-lg hover:text-slate-600 transition">
                    <PhUserCircle class="w-6 h-6" />Profile
                </router-link>
                <router-link @click="closeSidebar" to="/dashboard/preview" class="flex items-center gap-2 text-lg">
                    <PhEye class="w-6 h-6" />Preview
                </router-link>
            </div>

            <button class="flex items-center gap-2" @click="handleSignOut">
                <PhSignOut class="w-6 h-6 text-lg" />Log out
            </button>
        </div>

    </div>

    <button @click="openSidebar" class="fixed top-4 left-4 bg-white shadow p-2 rounded-full md:hidden">
        <PhList class="w-8 h-8 text-lg" />
    </button>
</template>

<script setup>
import { ref } from 'vue';
import router from '../../router';
import { PhUserCircle, PhEye, PhSignOut, PhList, PhX } from '@phosphor-icons/vue';
import { signOut, getAuth } from '@firebase/auth';


const handleSignOut = () => {
    signOut(getAuth())
        .then(() => {
            router.push('/');
        })
        .catch((error) => {
            console.log("Error", error);
        })
}


const isOpen = ref(false);

const openSidebar = () => {
    isOpen.value = true;
}

const closeSidebar = () => {
    const sidebar = document.getElementById('sidebar');
    sidebar.classList.add('animate-slideOut');
    setTimeout(() => {
        sidebar.classList.remove('animate-slideOut');
        isOpen.value = false;
    }, 300);
}

</script>