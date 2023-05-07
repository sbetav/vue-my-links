<template>
    <div class="backdrop w-full h-screen">
        <div class="container custom-width max-w-2xl relative !gap-4">
            <button @click="closeEdit" class="absolute right-7 top-4 disabled:cursor-not-allowed" :disabled="imgLoading">
                <PhX class="w-7 h-7 text-primary" weight="bold" />
            </button>
            <div class="relative">
                <img v-if="imgPreview" :src="imgPreview" alt="profile pic" class="rounded-full w-40 h-40 bg-gray-100 object-cover">
                <img v-else :src="userData.profileImg" alt="profile pic" class="rounded-full w-40 h-40 bg-gray-100 object-cover">
                <label for="profile-img"
                    class="absolute right-0 top-0 w-10 h-10 bg-primary rounded-full grid place-items-center cursor-pointer z-10">
                    <PhPencilSimple class="w-6 h-6 text-white" weight="bold" />
                </label>
                <div v-if="imgLoading"
                    class="absolute top-0 w-full h-full flex items-center justify-center bg-black rounded-full bg-opacity-60">
                    <Loader color="white" size="25" />
                </div>
                <input type="file" ref="profileImg" @change="onFileSelected" id="profile-img" class="hidden"
                    accept="image/*">
            </div>


            <div class="flex flex-col items-center justify-center gap-2 w-full">
                <h1 to="/dashboard/set-username"
                    class="flex items-center justify-center text-3xl font-bold text-black -ml-3 relative">
                    <PhAt class="w-7 h-7 text-primary mt-1" weight="bold" />{{ userData.username }}

                    <router-link to="/dashboard/set-username" class="cursor-pointer">
                        <PhPencilSimple class="w-5 h-5 text-primary absolute -right-5 -top-1" weight="bold" />
                    </router-link>
                </h1>
                <div v-if="userData.icons" class="flex flex-col w-full">
                    <div class="flex flex-wrap gap-1 items-center justify-center">
                        <a v-for="icon in userData.icons" :href="icon.url" target="_blank">
                            <img :src="getIconPath(icon.icon)" alt="icon" class="w-7 h-7">
                        </a>
                    </div>
                    <button v-if="!showEditIcons" @click="handleShowEditIcons" class="text-sm underline">
                        Edit icons
                    </button>
                    <div v-else class="border border-gray-300 rounded-lg py-4 px-6 pb-6 flex flex-col gap-6 mt-4">
                        <div class="text-center">
                            <p class="font-bold text-2xl text-black">Your icons:</p>
                            <p class="text-sm ">You can have up to 3 icons</p>
                        </div>

                        <div v-for="icon in userData.icons" class="flex gap-3 w-full items-center justify-between">
                            <img :src="getIconPath(icon.icon)" alt="icon" class="w-10 h-10">
                            <p class="border border-gray-300 w-full px-4 rounded-lg line-clamp-1 leading-10">{{ icon.url }}
                            </p>

                            <button @click="deleteIcon(icon.id)">
                                <PhTrash class="w-8 h-8 text-red-400" />
                            </button>
                        </div>
                        <div class="flex flex-col-reverse gap-3 sm:flex-row">
                            <button @click="handleShowEditIcons" class="btn btn-white w-full">Cancel</button>
                            <button @click="handleShowAddIcon" class="btn btn-black w-full" :disabled="iconsLength() == 3">Add
                                icon</button>
                        </div>
                    </div>

                </div>

                <div v-else>
                    <button
                        class="text-sm border border-gray-300 flex items-center justify-center gap-1 px-3 py-1 rounded-lg"
                        @click="handleShowAddIcon">
                        Add icons
                        <PhPlusCircle class="w-5 h-5 text-gray-400" />
                    </button>
                </div>

            </div>
            <AddIcon :userData="props.userData" v-if="showAddIcon" @closeAddIcon="handleShowAddIcon" />
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { PhX, PhAt, PhPlusCircle, PhPencilSimple, PhTrash } from '@phosphor-icons/vue';
import { uploadProfileImg } from "../../../utils/useFirebase"
import Loader from '../../Loader.vue';
import Input from '../../Input.vue';
import AddIcon from './AddIcon.vue';
import { getDatabase, ref as dbRef, set } from "firebase/database";

const props = defineProps(['userData'])
const emit = defineEmits(['closeEdit'])

const closeEdit = () => {
    emit('closeEdit')
}

// Icons

const getIconPath = (icon) => {
    return new URL(`../../../assets/img/${icon}.svg`, import.meta.url).href
}

const iconsLength = () => {
    if (props.userData.icons) {
        return Object.keys(props.userData.icons).length
    }
    return 0
}
const showAddIcon = ref(false)
const showEditIcons = ref(false)

const handleShowAddIcon = () => {
    showAddIcon.value = !showAddIcon.value
    showEditIcons.value = false
}

const handleShowEditIcons = () => {
    showEditIcons.value = !showEditIcons.value
}

const deleteIcon = async (icon) => {
    const db = getDatabase()
    const userRef = dbRef(db, `users/${props.userData.uid}/icons/${icon}`)
    await set(userRef, null)
}


// Profile Image

const selectedImg = ref(null)
const imgPreview = ref(null)
const imgLoading = ref(false)

function onFileSelected(event) {
    selectedImg.value = event.target.files[0]
    imgPreview.value = URL.createObjectURL(selectedImg.value)

    if (selectedImg.value) {
        imgLoading.value = true
        uploadProfileImg(selectedImg.value).then(() => {
            setTimeout(() => {
                imgLoading.value = false
                selectedImg.value = null
            }, 1000)
        })
    }
}

</script>