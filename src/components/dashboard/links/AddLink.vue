<template>
    <div class="backdrop">
        <div class="container custom-width max-w-2xl relative">
            <button @click="closeAddLink" class="absolute right-7 top-4">
                <PhX class="text-primary w-7 h-7" weight="bold" />
            </button>
            <div class="flex flex-col gap-3 w-full">
                <p class="font-bold text-3xl text-black text-center">Add link</p>
                <div class="w-full">
                    <Input v-model="linkData.title" class="mt-4 w-full" placeholder="Link title" icon="star"
                        :errors="v$.title.$errors" />
                    <Input v-model="linkData.url" class="mt-4 w-full" placeholder="Link URL" icon="link"
                        :errors="v$.url.$errors" />
                </div>
                <button @click="addLink" class="btn btn-black w-full mt-4"
                    :disabled="!linkData.title || !linkData.url || loading">
                    <Loader v-if="loading" color="white" />
                    <span v-else>Add</span>
                </button>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { PhX } from '@phosphor-icons/vue';
import Input from '../../Input.vue';
import Loader from '../../Loader.vue';
import { getDatabase, ref as dbRef, update } from "firebase/database";
import { v4 } from 'uuid';
import useVuelidate from '@vuelidate/core'
import { required, url, helpers } from '@vuelidate/validators'

const emit = defineEmits(['close']);
const closeAddLink = () => {
    emit('close');
}

const props = defineProps(['userData']);
const userId = props.userData.uid;
const loading = ref(false);

const linkData = ref({
    title: '',
    url: ''
});

// Validations

const rules = {
    title: {
        required: helpers.withMessage('Title is required', required)
    },
    url: {
        required: helpers.withMessage('URL is required', required),
        url: helpers.withMessage('URL is not valid', url)
    }
}

const v$ = useVuelidate(rules, linkData);

const addLink = async () => {
    const isValid = await v$.value.$validate();
    if (isValid) {
        loading.value = true;
        const db = getDatabase();
        const linkId = v4();
        const linkRef = dbRef(db, `users/${userId}/links/${linkId}`);
        await update(linkRef, {
            title: linkData.value.title,
            url: linkData.value.url,
            id: linkId
        }).then(() => {
            loading.value = false;
            closeAddLink();
        }).catch((error) => {
            loading.value = false;
            console.log(error);
        });
    }
}

</script>