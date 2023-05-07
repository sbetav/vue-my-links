<template>
    <div class="animate-spin inline-block border-[3px] border-current border-t-transparent rounded-full"
        :class="`text-${color}`" :style="`width: ${size}px; height: ${size}px;`" role="status" aria-label="loading">
        <span class="sr-only">Loading...</span>
    </div>
</template>

<script setup>
defineProps({
    color: {
        type: String,
        default: 'black'
    },
    size: {
        type: String,
        default: '20'
    }
});
</script>