<template>
    <div class="relative border border-gray-300 rounded-lg text-center hover:shadow transition text-lg">
        <a :href="link.url" target="_blank" class="font-bold text-black w-full">
            <p class="w-full px-4 py-2 ">{{ link.title }}</p>
        </a>
        <button @click="handleShowEditLink" class="absolute -top-4 -right-4 rounded-full bg-primary p-1">
            <PhPencilSimple class=" text-white w-6 h-6" weight="bold" />
        </button>
        <EditLink v-if="showEditLink" @close="handleShowEditLink" :linkData="link" />
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { PhPencilSimple } from '@phosphor-icons/vue';
import EditLink from './EditLink.vue';

const props = defineProps(['link']);

const showEditLink = ref(false);
const handleShowEditLink = () => {
    showEditLink.value = !showEditLink.value;
}

</script>