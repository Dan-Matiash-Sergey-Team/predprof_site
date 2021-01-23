<template>
    <input
           class="input"
           v-bind="$attrs"
           @input="$emit('update:modelValue', $event.target.value)"
    />
</template>

<script>
    export default {
        name: "BaseInput",
    }
</script>

<style scoped>

</style>
