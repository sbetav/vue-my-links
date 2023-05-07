<template>
    <div class="container relative !gap-4">
        <button class="flex items-center gap-1 text-primary font-bold absolute right-7 top-4" @click="handleEdit">
            <PhPencilSimple class="w-5 h-5" weight="bold" />
            <span>Edit</span>
        </button>
        <img :src="userData.profileImg" alt="profile pic" class="rounded-full w-40 h-40 bg-gray-100 object-cover">

        <div class="text-center">
            <h1 class="font-bold text-4xl text-black">{{ userData.username }}</h1>

            <div class="flex gap-1 flex-wrap mt-1">
                <a v-for="icon in userData.icons" :href="icon.url" target="_blank"
                    class="flex items-center justify-center gap-2">
                    <img :src="getIconPath(icon.icon)" alt="icon" class="w-7 h-7">
                </a>
            </div>

            <div v-if="!userData.icons">
                <p class="text-xl">No socials yet</p>
            </div>
        </div>
    </div>
    <EditProfile v-if="editing" :userData="props.userData" @closeEdit="handleEdit" />
</template>

<script setup>
import { ref } from 'vue';
import { PhPencilSimple } from '@phosphor-icons/vue';
import EditProfile from './EditProfile.vue';

const props = defineProps(['userData'])

const editing = ref(false)

const handleEdit = () => {
    editing.value = !editing.value;
}

const getIconPath = (icon) => {
    return new URL(`../../../assets/img/${icon}.svg`, import.meta.url).href
}
</script>