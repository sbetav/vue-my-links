<template>
    <section class="md:ml-52 min-h-screen custom-width w-full flex flex-col items-center justify-center">
        <div class="previewContainer">
            <iframe class="preview" :src="userUrl" frameborder="0"></iframe>
        </div>
        <a :href="userUrl" target="_blank"
            class="text-center text-primary font-bold underline mt-5 bg-white px-4 py-2 border border-gray-300 rounded-xl w-full max-w-xs">
            {{ userUrl }}
        </a>
    </section>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { getUserData } from '../../utils/useFirebase';

const userData = ref(null);
const userUrl = ref(null);

onMounted(async () => {
    userData.value = await getUserData();
    const domain = window.location.origin
    userUrl.value = `${domain}/${userData.value.username}`;
})

</script>