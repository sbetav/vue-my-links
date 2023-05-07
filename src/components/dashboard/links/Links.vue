<template>
    <div class="container">
        <div v-if="userData.links" class="flex flex-col w-full gap-5">
            <Link v-for="link in userData.links" :key="link.$uid" :link="link" />
        </div>
        <div v-else>
            <p class="text-center text-2xl text-gray-400">You don't have any links yet.</p>
        </div>
        <button @click="handleShowAddLink" class="btn btn-black w-full">
            <PhPlus class="text-white w-8 h-8" />
        </button>
    </div>
    <AddLink v-if="showAddLink" @close="handleShowAddLink" :userData="userData" />
</template>

<script setup>
import { ref } from 'vue';
import { PhPlus } from '@phosphor-icons/vue';
import AddLink from './AddLink.vue';
import Link from './Link.vue';

const props = defineProps(['userData'])

const showAddLink = ref(false);
const showEditLink = ref(false);

const handleShowAddLink = () => {
    showAddLink.value = !showAddLink.value;
}

const handleShowEditLink = () => {
    showEditLink.value = !showEditLink.value;
}

</script>