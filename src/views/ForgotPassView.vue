<template>
    <section>
        <div class="custom-width min-height flex items-center justify-center">
            <form @submit.prevent="handleResetPassword"
                class="container max-w-lg">
                <div>
                    <h1 class="text-3xl font-bold text-center text-black">Reset Password</h1>
                    <p class="text-center text-sm mt-1">You'll receive a link to reset your password via email.</p>
                </div>

                <Input v-model="data.email" placeholder="Email" icon="email" :errors="v$.email.$errors" class="w-full" :key="successMsg"/>

                <p v-if="errorMsg"
                    class="font-medium border bg-red-50 border-red-400 rounded-lg py-1 text-red-400 text-sm text-center w-full">
                    {{ errorMsg }}
                </p>
                <p v-if="successMsg"
                    class="font-medium border bg-green-50 border-green-400 rounded-lg py-1 text-green-400 text-sm text-center w-full">
                    {{ successMsg }}
                </p>
                <div class="flex flex-col-reverse items-center justify-center gap-3 w-full sm:flex-row sm:gap-4">
                    <router-link to="/login" class="btn btn-white w-full flex items-center justify-center gap-2">
                        <PhArrowLeft class="w-5 h-5" />
                        Go back
                    </router-link>
                    <button class="btn btn-black w-full" :disabled="loading">
                        <Loader v-if="loading" color="white"/>
                        <span v-else>Send recovery email</span>
                    </button>
                </div>

            </form>
        </div>
    </section>
</template>

<script setup>
import { ref } from "vue";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import Input from '../components/Input.vue';
import Loader from "../components/Loader.vue";
import { PhArrowLeft } from '@phosphor-icons/vue';
import useVuelidate from '@vuelidate/core'
import { required, email, helpers } from '@vuelidate/validators'

const loading = ref(false);
const errorMsg = ref('');
const successMsg = ref('');

const data = ref({
    email: '',
});

// Validations rules
const rules = {
    email: {
        required: helpers.withMessage('Please enter an email', required),
        email: helpers.withMessage('Please enter a valid email', email),
    },
}

const v$ = useVuelidate(rules, data)

const handleResetPassword = async () => {
    successMsg.value = '';
    const isValid = await v$.value.$validate()
    if (isValid) {
        loading.value = true;
        const auth = getAuth();
        sendPasswordResetEmail(auth, data.value.email)
            .then(() => {
                loading.value = false;
                v$.value.$reset()
                data.value.email = '';
                errorMsg.value = '';
                successMsg.value = 'Email sent successfully';
            })
            .catch((error) => {
                loading.value = false;
                if (error.code === 'auth/user-not-found') {
                    errorMsg.value = 'The email address is not registered';
                } else {
                    errorMsg.value = 'Something went wrong, please try again.';
                }
            });
    }
}
</script>