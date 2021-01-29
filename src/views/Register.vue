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
                        <template #label>Пароль повторно</template>
                        <template #input>
                            <BaseInput placeholder="password" type="password" v-model="iter_password"></BaseInput>
                            <span class="icon is-small is-left">
                                <i class="fas fa-lock"></i>
                            </span>
                            <p class="help is-danger" v-if="Check_password">
                                Пароли не совпадают
                            </p>
                        </template>
                    </BaseField>
                    <BaseField>
                        <template #label>
                            <p class="help is-danger" v-if="error">{{error}}</p>
                            <BaseButton @click="submit" class="is-success">Создать аккаунт</BaseButton>
                        </template>
                    </BaseField>
                </div>
            </BasePage>
        </div>
    </section>
    <div></div>
</template>

<script>
    import BasePage from "@/components/BasePage";
    import BaseField from "@/components/BaseField";
    import BaseInput from "@/components/BaseInput";
    import BaseButton from "@/components/BaseButton";

    export default {
        name: "Register",
        components: {BaseButton, BaseInput, BaseField, BasePage},
        data() {
            return {
                username: '',
                password: '',
                iter_password: '',
                error: false
            }
        },
        methods: {
            submit: async function () {
                const resp = await fetch('http://195.133.147.101:228/register/', {
                    method: "POST",
                    body: JSON.stringify({
                        login: this.username,
                        password: this.password
                    }),
                    headers: {
                        "Content-Type": 'application/json',
                    }
                })
                if (resp.status === 200) {
                    this.error = false
                    await this.$router.push('/login')
                } else if (resp.status === 400) {
                    this.error = "Ошибка в данных"
                }
                else if(resp.status === 409){
                  this.error = "Этот email уже занят"
                }
                else if(resp.status === 411){
                  this.error = await resp.json()
                  console.log(this.error)
                }
            },
        },
        computed: {
            Check_password: function () {
                return this.password !== this.iter_password
            }
        }
    }
</script>

<style scoped>

</style>
