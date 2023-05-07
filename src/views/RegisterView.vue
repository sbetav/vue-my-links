<template>
    <section>
        <div class="custom-width min-height flex items-center justify-center">
            <div class="container max-w-lg">

                <h1 class=" text-center font-bold text-3xl text-black">Sign up</h1>

                <form @submit.prevent="handleRegister" class="flex flex-col w-full gap-5">
                    <div class="flex flex-col gap-4">
                        <Input v-model="registerData.email" placeholder="Email" icon="email" :errors="v$.email.$errors" />
                        <Input v-model="registerData.password" placeholder="Password" type="password" icon="password"
                            :errors="v$.password.$errors" />
                    </div>
                    <p v-if="errorMsg" class="error-msg">
                        {{ errorMsg }}
                    </p>
                    <button type="submit" class="btn btn-black w-full h-10" :disabled="loading">
                        <Loader v-if="loading" color="white" />
                        <span v-else>Create account</span>
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
                <p class="text-center">Already have an account?
                    <router-link to="/login" class="text-primary font-medium whitespace-nowrap">
                        Sign in
                    </router-link>
                </p>
            </div>

        </div>

    </section>
</template>

<script setup>
import { ref } from 'vue';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { signInWithGoogle, createDbUser } from '../utils/useFirebase';
import router from '../router';
import Input from '../components/Input.vue';
import Loader from '../components/Loader.vue';
import useVuelidate from '@vuelidate/core'
import { required, email, minLength, helpers } from '@vuelidate/validators'


const loading = ref(false);
const errorMsg = ref('');

const registerData = ref({
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
        minLength: helpers.withMessage('Password must be at least 6 characters', minLength(6)),
    },
}

const v$ = useVuelidate(rules, registerData)

const handleRegister = async () => {
    const isValid = await v$.value.$validate()
    if (isValid) {
        loading.value = true;
        // We create the user in firebase auth
        createUserWithEmailAndPassword(getAuth(), registerData.value.email, registerData.value.password)
            .then((data) => {
                // We create the user in realtime database
                createDbUser(data.user).then(() => {
                    router.push('/dashboard');
                })
            })
            .catch((error) => {
                if (error.code === 'auth/email-already-in-use') {
                    errorMsg.value = "The email address is already registered";
                } else {
                    errorMsg.value = "Something went wrong";
                    console.log("Error", error)
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