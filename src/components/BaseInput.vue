<template>
    <input
            @input="$emit('update:modelValue', $event.target.value)"
            class="input"
    />
</template>

<script>
    export default {
        name: "BaseInput",
    }
</script>

<style scoped>

</style>
