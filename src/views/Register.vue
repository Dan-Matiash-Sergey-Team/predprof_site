<template>
  <section class="hero is-link is-bold is-fullheight">
    <div class="hero-body">
      <BasePage>
        <div class="box">
          <BaseField>
            <template #label>Адрес электронной почты</template>
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
          <BaseField>
            <template #label>Пароль повторно</template>
            <template #input><BaseInput placeholder="password" type="password" v-model="iter_password"></BaseInput>
              <p class="help is-danger" v-if="Check_password">
                Пароли не совпадают
              </p>
            </template>
          </BaseField>
          <BaseField>
            <template #label>
              <BaseButton class="is-success" @click="submit">Создать аккаунт</BaseButton>
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
      data(){
          return{
            username: '',
            password: '',
            iter_password: ''
          }
      },
      methods:{

      },
      computed:{
          Check_password: function (){
            if(this.password != this.iter_password){
              return true;
            }
            return false;
    }
      }
    }
</script>

<style scoped>

</style>
