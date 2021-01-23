<template>
    <router-view/>
</template>

<script>
    export default {
        name: "App",
        data() {
            return {
                userData: {}
            }
        },
        async mounted() {
            if (localStorage.userData) {
                this.userData = localStorage.userData
            } else if (this.$store.getters.userData) {
                this.userData = this.$store.getters.userData
            }
            if (!this.userData.logged) {
                await this.$router.push('/login')
            } else {
                //TODO get data
                await this.$router.push('/main')
            }
        }
    }
</script>

<style>
</style>
