<template>
    <section class="hero is-link is-bold is-fullheight">
        <div class="hero-body">
            <BasePage>
                <div class="box">
                    <BaseField>
                        <template #label>Адрес электронной почты</template>
                        <template #input>
                            <BaseInput placeholder="example@gmail.com" type="email" v-model="username"></BaseInput>
                            <span class="icon is-small is-left">
                                <i class="fas fa-envelope"></i>
                            </span>
                            <p class="help is-danger" v-if="!emailValid">This email is invalid</p>
                        </template>
                    </BaseField>
                    <BaseField>
                        <template #label>Пароль</template>
                        <template #input>
                            <BaseInput placeholder="password" type="password" v-model="password"></BaseInput>
                            <span class="icon is-small is-left">
                                <i class="fas fa-lock"></i>
                            </span>
                        </template>
                    </BaseField>
                    <BaseField>
                        <template #label>
                            <BaseButton @click="submit" class="is-success">Продолжить</BaseButton>
                        </template>
                    </BaseField>
                    <BaseField>
                        <template #label>
                            <router-link to="/register">Нет аккаунта? Зарегестрироваться</router-link>
                        </template>
                    </BaseField>
                </div>
            </BasePage>
        </div>
    </section>
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
                //195.133.147.101:228
                const resp = await fetch('http://195.133.147.101:228/token/',{
                    method: "POST",
                    body: JSON.stringify({
                        username: this.username,
                        password: this.password
                    }),
                    headers: {
                        "Content-Type": 'application/json'
                    }
                })
                const a = await resp.json()
                this.$store.commit('newAccess',a.access)
                this.$store.commit('newRefresh',a.refresh)
                console.log('a')
                await this.$router.push('/')
            }
        },
        computed:{
            emailValid: function () {
                // eslint-disable-next-line no-useless-escape
                const re = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/

                return re.test(this.username) || this.username === ""
            }
        }
    }
</script>

<style scoped>

</style>
