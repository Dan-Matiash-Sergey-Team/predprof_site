<template>
    <BasePage>
        <label>Имя пользователя</label>
        <input type="text" v-model="username"/>
        <label>Пароль</label>
        <input type="password" v-model="password"/>

        <button @click="submit">Продолжить</button>
        <router-link to="/register">Нет аккаунта? Зарегестрироваться</router-link>
    </BasePage>
</template>

<script>
    import BasePage from "../components/BasePage";

    export default {
        name: "Login",
        components: {BasePage},
        data() {
            return {
                username: '',
                password: ''
            }
        },
        methods: {
            submit: async function () {
                //TODO login
                await this.$router.push('/main')
            }
        }
    }
</script>

<style scoped>

</style>
