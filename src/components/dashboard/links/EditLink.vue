<template>
    <div class="backdrop">
        <div class="container custom-width max-w-2xl relative">
            <button @click="closeEditLink" class="absolute right-7 top-4">
                <PhX class="text-primary w-7 h-7" weight="bold" />
            </button>

            <div class="flex flex-col gap-4 w-full">
                <p class="font-bold text-3xl text-black text-center">Edit link</p>
                <div class="w-full flex flex-col gap-4">

                    <div class="flex flex-col gap-2">
                        <div
                            class="text-base border border-gray-300 px-3 py-2 rounded-lg flex flex-row items-center justify-between gap-2 bg-white">
                            <PhStar class="w-6 h-6 text-gray-300" />
                            <input v-model="newData.title" type="text" placeholder="Title"
                                class="focus:outline-none w-full disabled:bg-transparent">
                        </div>
                        <span v-for="error in v$.title.$errors" class="text-red-400 text-sm text-left">
                            {{ error.$message }}
                        </span>
                    </div>

                    <div class="flex flex-col gap-2">
                        <div
                            class="text-base border border-gray-300 px-3 py-2 rounded-lg flex flex-row items-center justify-between gap-2 bg-white">
                            <PhLink class="w-6 h-6 text-gray-300" />
                            <input v-model="newData.url" type="text" placeholder="Title"
                                class="focus:outline-none w-full disabled:bg-transparent">
                        </div>
                        <span v-for="error in v$.url.$errors" class="text-red-400 text-sm text-left">
                            {{ error.$message }}
                        </span>
                    </div>

                </div>
                <div class="flex flex-col sm:flex-row mt-2 gap-3">
                    <button @click="updateLink" class="btn btn-black w-full"
                        :disabled="props.linkData.title === newData.title && props.linkData.url === newData.url">
                        <Loader v-if="loading" class="w-5 h-5 text-white" />
                        <span v-else>Save</span>
                    </button>

                    <button v-if="!confirmDelete" @click="() => confirmDelete = !confirmDelete"
                        class="btn btn-white flex gap-1">
                        <PhTrash class="w-5 h-5 text-black" />
                        <span class="w-16">Delete</span>
                    </button>

                    <button v-else @click="deleteLink" class="btn btn-white flex gap-1">
                        <PhCheck v-if="!deleting" class="w-5 h-5 text-black" />
                        <span v-if="!deleting" class="w-16">Confirm</span>
                        <Loader v-else class="w-5 h-5 text-black" />
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { PhX, PhStar, PhLink, PhTrash, PhCheck } from '@phosphor-icons/vue';
import Input from '../../Input.vue';
import Loader from '../../Loader.vue';
import { getDatabase, ref as dbRef, update, set } from "firebase/database";
import { getUserId } from '../../../utils/useFirebase';
import useVuelidate from '@vuelidate/core'
import { required, url, helpers } from '@vuelidate/validators'

const emit = defineEmits(['close']);
const closeEditLink = () => {
    emit('close');
}

const props = defineProps(['linkData']);
const loading = ref(false);
const confirmDelete = ref(false);
const deleting = ref(false);

const newData = ref({
    title: props.linkData.title,
    url: props.linkData.url,
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

const v$ = useVuelidate(rules, newData);

// Update link
const updateLink = async () => {
    const isValid = await v$.value.$validate();
    if (isValid) {
        loading.value = true;
        const db = getDatabase();
        const userId = getUserId();
        const linkRef = dbRef(db, `users/${userId}/links/${props.linkData.id}`);
        await update(linkRef, {
            title: newData.value.title,
            url: newData.value.url,
        }).then(() => {
            closeEditLink();
        }).catch((error) => {
            loading.value = false;
            console.log(error);
        });
    }
}

// Delete link
const deleteLink = async () => {
    deleting.value = true;
    const db = getDatabase();
    const userId = getUserId();
    const linkRef = dbRef(db, `users/${userId}/links/${props.linkData.id}`);
    await set(linkRef, null).then(() => {
        closeEditLink();
    }).catch((error) => {
        loading.value = false;
        console.log(error);
    });
}


</script>