<template>
    <input
           class="input"
           v-bind="$attrs"
           @input="$emit('input', $event.target.value)"
    />
</template>

<script>
    export default {
        name: "BaseInput",
    }
</script>

<style scoped>

</style>
