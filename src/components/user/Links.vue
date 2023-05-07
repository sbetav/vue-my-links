<template>
    <div class="flex flex-col gap-6 max-w-md custom-width">
        <a v-for="link in userData.links" :key="link.id" :href="link.url" target="_blank"
            class="bg-white text-center font-bold text-black text-xl w-full py-2 px-4 rounded-full link-shadow">
            {{ link.title }}
        </a>
    </div>
</template>

<script setup>
const props = defineProps(['userData'])
</script>