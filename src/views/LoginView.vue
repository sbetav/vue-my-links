<template>
    <section>
        <div class="custom-width min-height flex items-center justify-center">
            <div
                class="container max-w-lg">

                <h1 class=" text-center font-bold text-3xl text-black">Welcome back!</h1>

                <form @submit.prevent="handleLogin" class="flex flex-col w-full gap-3">
                    <div class="flex flex-col gap-4">
                        <Input v-model="loginData.email" placeholder="Email" icon="email" :errors="v$.email.$errors" />
                        <Input v-model="loginData.password" placeholder="Password" type="password" icon="password"
                            :errors="v$.password.$errors" />
                    </div>

                    <p v-if="errorMsg" class="error-msg">
                        {{ errorMsg }}
                    </p>
                    <router-link to="/forgot-password" class="text-primary font-medium text-sm text-right">
                        Forgot password?
                    </router-link>
                    <button type="submit" class="btn btn-black w-full h-10" :disabled="loading">
                        <Loader v-if="loading" color="white" />
                        <span v-else>Login</span>
                    </button>

                </form>
                <div class="flex items-center justify-center w-full">
                    <div class="w-full border-t border-gray-200" />
                    <span class="mx-4 text-colorText">Or</span>
                    <div class="w-full border-t border-gray-200" />
                </div>
                <button @click="googleSignIn"
                    class="flex items-center justify-center border border-gray-200 p-3 w-full rounded-lg gap-4 hover:shadow-sm transition">
                    <img src="../assets/img/google-icon.svg" alt="google-icon" class="w-5 rounded">
                    <p class="font-medium text-colorText">Sign in with Google</p>
                </button>
                <p class="text-center">Don't you have an account? <router-link to="/register"
                        class="text-primary font-medium whitespace-nowrap">Sign
                        up</router-link></p>
            </div>
        </div>
    </section>
</template>

<script setup>
import { ref } from 'vue';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { signInWithGoogle } from '../utils/useFirebase';
import router from '../router';
import Input from '../components/Input.vue';
import Loader from '../components/Loader.vue';
import useVuelidate from '@vuelidate/core'
import { required, email, helpers } from '@vuelidate/validators'

const loading = ref(false);
const errorMsg = ref('');

const loginData = ref({
    email: '',
    password: '',
});

// Validations rules
const rules = {
    email: {
        required: helpers.withMessage('Please enter an email', required),
        email: helpers.withMessage('Please enter a valid email', email),
    },
    password: {
        required: helpers.withMessage('Please enter a password', required),
    },
}

const v$ = useVuelidate(rules, loginData)

const handleLogin = async () => {

    const isValid = await v$.value.$validate()
    // If the form is valid, sign in the user
    if (isValid) {
        loading.value = true;
        signInWithEmailAndPassword(getAuth(), loginData.value.email, loginData.value.password)
            .then(() => {
                router.push('/dashboard');
            })
            .catch((error) => {
                if (error.code === 'auth/user-not-found') {
                    errorMsg.value = "The email address is not registered";
                } else if (error.code === 'auth/wrong-password') {
                    errorMsg.value = "Incorrect email or password";
                } else {
                    errorMsg.value = "Something went wrong";
                }
                loading.value = false;
            })

    }
}

const googleSignIn = () => {
    signInWithGoogle().then(() => {
        router.push('/dashboard');
    })
}
</script>