<template>
    <section v-if="userData">
        <div class="custom-width min-height flex items-center justify-center">
            <form @submit.prevent="handleCreateUser" class="container max-w-lg">
                <div class="text-center">
                    <h1 v-if="userData.username" class="text-3xl font-bold text-center text-black">Change Username</h1>
                    <h1 v-else class="text-3xl font-bold text-center text-black">Create username</h1>
                    <p class="text-sm mt-1">This will be unique and will be in your personal url</p>
                </div>
                <Input v-model="data.username" type="text" placeholder="username" class="w-full" icon="@"
                    :errors="v$.username.$errors" />
                <p v-if="errorMsg" class="error-msg">
                    {{ errorMsg }}
                </p>
                <div class="flex flex-col-reverse items-center justify-center gap-3 w-full sm:flex-row sm:gap-4">
                    <router-link v-if="userData.username" to="/dashboard" class="btn btn-white w-full">
                        <span class="flex items-center justify-center gap-2">
                            <PhArrowLeft class="w-5 h-5" />
                            Go back
                        </span>
                    </router-link>
                    <button class="btn btn-black w-full" :disabled="loading">
                        <Loader v-if="loading" color="white" size="20" />
                        <span v-else class="flex items-center justify-center gap-2">
                            Continue
                            <PhArrowRight class="w-5 h-5" v-if="!userData.username" />
                        </span>
                    </button>

                </div>
            </form>
        </div>
    </section>
    <section v-else class="flex items-center justify-center min-height bg-gray-50">
        <Loader color="black" size="35" />
    </section>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import router from '../../router';
import Input from '../../components/Input.vue';
import Loader from '../../components/Loader.vue';
import { PhArrowRight, PhArrowLeft } from '@phosphor-icons/vue';
import useVuelidate from '@vuelidate/core'
import { required, minLength, maxLength, helpers } from '@vuelidate/validators'
import { ref as dbRef, update } from "firebase/database";
import { db, getUserId, getAllUsers, getUserData } from "../../utils/useFirebase"

const loading = ref(false);
const errorMsg = ref(null);

const userId = getUserId();
const userData = ref(null);
const usernames = ref([]);

onMounted(async () => {
    // Get all usernames so we can check if the username is already taken
    const users = await getAllUsers();
    users.forEach((user) => {
        usernames.value.push(user.username);
    });

    // Get user data
    const user = await getUserData(userId);
    userData.value = user;
})

// Form data
const data = ref({
    username: '',
});

// Validations rules
const rules = {
    username: {
        required: helpers.withMessage('Please enter a username', required),
        minLength: helpers.withMessage('Username must be at least 3 characters', minLength(3)),
        maxLength: helpers.withMessage('Username must be at most 15 characters', maxLength(15)),
    },
}

const v$ = useVuelidate(rules, data)


// Set username in database
const handleCreateUser = async () => {
    const isValid = await v$.value.$validate()
    if (isValid) {
        loading.value = true;
        errorMsg.value = null;
        const updateUsername = () => {
            const updates = {};
            // Check if username is already taken
            if (userData.value.username === data.value.username) {
                // Username is the same
                return Promise.resolve();
            } else if (usernames.value.includes(data.value.username)) {
                errorMsg.value = 'Username already taken';
                return Promise.reject();
            } else {
                // Update username
                updates['/users/' + userId + '/username'] = data.value.username;
                return update(dbRef(db), updates);
            }
        }
        await updateUsername().then(() => {
            router.push("/dashboard");
        }).catch(() => {
            loading.value = false;
        })
    }
}

</script>