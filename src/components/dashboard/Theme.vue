<template>
    <div class="container">
        <div class="flex gap-3">
            <label for="gray" class="themeBox grayTheme" :class="theme == 'gray' && 'boxSelected'" />
            <input v-model="theme" type="radio" id="gray" name="theme" value="gray" class="hidden"/>

            <label for="green" class="themeBox greenTheme" :class="theme == 'green' && 'boxSelected'" />
            <input v-model="theme" type="radio" id="green" name="theme" value="green" class="hidden"/>

            <label for="blue" class="themeBox blueTheme" :class="theme == 'blue' && 'boxSelected'" />
            <input v-model="theme" type="radio" id="blue" name="theme" value="blue" class="hidden"/>

            <label for="red" class="themeBox redTheme" :class="theme == 'red' && 'boxSelected'" />
            <input v-model="theme" type="radio" id="red" name="theme" value="red" class="hidden" />
        </div>
    </div>
</template>

<script setup>
import { ref, watch } from 'vue';
import { getDatabase, ref as dbRef, update } from "firebase/database";

const props = defineProps(['userData'])

const theme = ref(props.userData.theme)

watch(theme, (newTheme) => {
    update(dbRef(getDatabase(), 'users/' + props.userData.uid), {
        theme: newTheme
    })
})

</script>


