<template>
    <section v-if="userData" class="w-full my-8 md:ml-52">
        <div class="custom-width max-w-2xl min-h-screen flex flex-col gap-6 justify-center">

            <p
                class="bg-white flex flex-col items-center justify-center rounded-2xl py-4 px-8 shadow text-2xl text-primary font-bold">
                Profile
            </p>
            <Profile :userData="userData" />

            <p
                class="bg-white flex flex-col items-center justify-center rounded-2xl py-4 px-8 shadow text-2xl text-primary font-bold">
                Your links
            </p>
            <Links :userData="userData" />

            <p
                class="bg-white flex flex-col items-center justify-center rounded-2xl py-4 px-8 shadow text-2xl text-primary font-bold">
                Theme
            </p>
            <Theme :userData="userData" />

        </div>
    </section>
    <section v-else class="flex items-center justify-center h-screen bg-gray-50 custom-width w-full">
        <Loader color="black" size="35" />
    </section>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import router from '../../router';
import { getAuth, onAuthStateChanged } from '@firebase/auth';
import { getDatabase, ref as dbRef, onValue } from "firebase/database";
import Loader from '../../components/Loader.vue';
import Profile from '../../components/dashboard/profile/Profile.vue';
import Links from '../../components/dashboard/links/Links.vue';
import Theme from '../../components/dashboard/Theme.vue';

const userData = ref(null);

onMounted(() => {
    onAuthStateChanged(getAuth(), (user) => {
        if (user) {
            const userRef = dbRef(getDatabase(), 'users/' + user.uid);
            onValue(userRef, (snapshot) => {
                const data = snapshot.val();
                if (!data.username) {
                    router.push('/dashboard/set-username');
                }
                userData.value = data;
            }, (error) => {
                console.log('Error:', error.code);
            });
        }
    })
})


</script>