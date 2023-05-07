<template>
    <div class="border border-gray-300 w-full rounded-lg px-6 py-4">

        <form @submit.prevent="handleAddIcon" class="w-full flex flex-col">
            <div v-if="selectedIcon" class="w-full mb-4">
                <p class="font-bold text-black text-2xl mb-3">Enter {{ selectedIcon }} link:</p>
                <div class="flex items-start justify-center gap-3">
                    <img :src="getIconPath(selectedIcon)" alt="icon" class="w-10 h-10">
                    <Input v-model="iconUrl" placeholder="Enter an url" class="w-full" :errors="v$.iconUrl.$errors" />
                </div>
            </div>

            <div v-else class="mb-5">
                <p class="font-bold text-black text-2xl mb-3">Select an icon:</p>
                <div class="flex gap-2 flex-wrap">
                    <div v-for="icon in icons">
                        <label :for="icon" class="cursor-pointer">
                            <img :src="getIconPath(icon)" alt="icon" class="w-8 h-8">
                        </label>
                        <input v-model="selectedIcon" type="radio" name="icon" :id="icon" :value="icon" class="hidden">
                    </div>
                </div>
            </div>

            <div class="flex flex-col-reverse gap-3 sm:flex-row">
                <button @click="closeAddIcon" class="btn btn-white w-full">Cancel</button>
                <button class="btn btn-black w-full" :disabled="!selectedIcon || !iconUrl || loading">
                    <Loader v-if="loading" color="white" />
                    <span v-else>Add</span>
                </button>
            </div>
        </form>

    </div>
</template>

<script setup>
import { ref } from 'vue';
import Input from '../../Input.vue';
import Loader from '../../Loader.vue';
import useVuelidate from '@vuelidate/core'
import { required, url, helpers } from '@vuelidate/validators'
import { getDatabase, ref as dbRef, update } from "firebase/database";
import { v4 } from 'uuid'

const props = defineProps(['userData'])

const loading = ref(false)


const emit = defineEmits(['closeAddIcon'])
const closeAddIcon = () => {
    emit('closeAddIcon')
}

const icons = ["facebook", "instagram", "linkedin", "tiktok", "twitch", "twitter", "youtube", "whatsapp"]
const getIconPath = (icon) => {
    return new URL(`../../../assets/img/${icon}.svg`, import.meta.url).href
}

const selectedIcon = ref(null)
const iconUrl = ref(null)

// Validations
const rules = {
    iconUrl: {
        required: helpers.withMessage('Please enter an url', required),
        url: helpers.withMessage('Please enter a valid url', url)
    }
}
const v$ = useVuelidate(rules, { iconUrl })

const handleAddIcon = async () => {
    const isValid = await v$.value.$validate()
    if (isValid) {
        loading.value = true
        const db = getDatabase();
        const iconId = v4()
        const newIconRef = dbRef(db, `users/${props.userData.uid}/icons/${iconId}`)
        update(newIconRef, {
            icon: selectedIcon.value,
            url: iconUrl.value,
            id: iconId
        }).then(() => {
            closeAddIcon()
        }).catch((error) => {
            console.log(error)
            loading.value = false
        })
    }
}
</script>