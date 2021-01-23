<template>
    <BasePage>
        <BaseField>
            <template #label>Имя пользователя</template>
            <template #input>
                <BaseInput placeholder="example@gmail.com" type="email" v-model="username"></BaseInput>
            </template>
        </BaseField>
        <BaseField>
            <template #label>Пароль</template>
            <template #input>
                <BaseInput placeholder="password" type="password" v-model="password"></BaseInput>
            </template>
        </BaseField>
        <BaseButton @click="submit">Продолжить</BaseButton>
        <router-link to="/register">Нет аккаунта? Зарегестрироваться</router-link>
    </BasePage>
</template>

<script>
    import BasePage from "../components/BasePage";
    import BaseInput from "../components/BaseInput";
    import BaseField from "../components/BaseField";
    import BaseButton from "../components/BaseButton";

    export default {
        name: "Login",
        components: {BaseButton, BaseField, BaseInput, BasePage},
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
