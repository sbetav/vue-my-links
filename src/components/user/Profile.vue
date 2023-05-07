<template>
    <div class="flex flex-col gap-4 items-center justify-center">
        <img :src="userData.profileImg" alt="Profile Picture" class="w-44 h-44 rounded-full border-8 border-white bg-gray-300 object-cover" />
        <div class="flex flex-col gap-2 items-center justify-center">
            <h1 class="text-3xl font-black text-black bg-white rounded-full py-2 px-8">{{ userData.username }}</h1>
            <div class="flex gap-1">
                <a v-for="icon in userData.icons" :key="icon" :href="icon.url" target="_blank" class="text-3xl invert">
                    <img :src="getIconPath(icon.icon)" alt="icon" class="w-9 h-9" />
                </a>
            </div>
        </div>
    </div>
</template>

<script setup>
const props = defineProps(['userData'])

const getIconPath = (icon) => {
    return new URL(`../../assets/img/${icon}.svg`, import.meta.url).href
}

</script>