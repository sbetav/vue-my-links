<template>
    <div class="text-base">
        <label v-if="label" class="text-gray-400 text-sm" :for="label">{{ label }}</label>
        <div class="border border-gray-300 px-3 py-2 rounded-lg flex flex-row items-center justify-between gap-2 bg-white"
            :class="{ 'border-red-400': errors.length }">
            <PhEnvelopeSimple v-if="icon === 'email'" class="w-6 h-6 text-gray-300" />
            <PhLockKey v-if="icon === 'password'" class="w-6 h-6 text-gray-300" />
            <PhLink v-if="icon === 'link'" class="w-6 h-6 text-gray-300" />
            <PhStar v-if="icon === 'star'" class="w-6 h-6 text-gray-300" />
            <span v-if="icon === '@'" class="text-primary font-medium text-lg">@</span>
            <input :type="type" @input="$emit('update:modelValue', $event.target.value)" :placeholder="placeholder"
                :required="required" class="focus:outline-none w-full disabled:bg-transparent" :disabled="disabled" />
        </div>
        <span v-for="error in errors" :key="error.$uid" class="text-red-400 text-sm">
            {{ error.$message }}
        </span>
    </div>
</template>
    
<script setup>
import { PhEnvelopeSimple, PhLockKey, PhLink, PhStar } from "@phosphor-icons/vue";
defineProps({
    label: {
        type: String,
        default: '',
    },
    placeholder: {
        type: String,
        default: '',
    },
    type: {
        type: String,
        default: 'text',
    },
    required: {
        type: Boolean,
        default: false,
    },
    icon: {
        type: String,
        default: '',
    },
    errors: {
        type: Array,
        default: () => [],
    },
    disabled: {
        type: Boolean,
        default: false,
    }
})

</script>