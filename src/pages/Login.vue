<template>
    <div>
        <div class="row" style="height: 90vh">
        <div class="col-0 col-md-5 flex justify-center content-center">
            <img src="~assets/login.png" class="responsive" alt="login-image">
        </div>
        <div v-bind:class="{'justify-center': $q.screen.md || $q.screen.sm ||$q.screen.xs}"
            class="col-12 col-md-7 flex content-center">
            <q-card v-bind:style="$q.screen.lt.sm ? {'width': '80%'} : {'width': '50%'}">
            <q-card-section>
                <div class="q-pt-lg">
                <div class="col text-h6 ellipsis flex justify-center">
                    <h5 class="text-h5 text-uppercase q-my-none text-weight-regular">Login</h5>
                </div>
                </div>
            </q-card-section>
            <q-card-section>
                <q-form class="q-gutter-md" @submit.prevent="onSubmit">
                <q-input label="E-mail" v-model="login.email">
                </q-input>
                <q-input label="Senha" type="password" v-model="login.senha">
                </q-input>
                <div>
                    <q-btn class="full-width" color="primary" label="Login" type="submit" rounded></q-btn>
                    <div class="text-center q-mt-sm q-gutter-lg">
                    <router-link class="text-white" to="/login">Esqueceu a senha?</router-link>
                    <router-link class="text-white" to="/login">Criar conta</router-link>
                    </div>
                </div>
                </q-form>
            </q-card-section>
            </q-card>
        </div>
        </div>
    </div>
  </template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'Login',
  data() {
    return {
      login: {
        email: 'fredx@sisloc.com.br',
        senha: '123Fred'
      }
    }
  },
  methods: {
    ...mapActions('auth', ['doLogin']),
    async onSubmit() {
      if(!this.login.email || !this.login.senha) {
        alert('Informe os dados obrigatórios')
      } else {
        try{
          await this.doLogin(this.login);
          const toPath = this.$route.query.to || '/'
          this.$router.push(toPath);
        } catch(error) {
          if(error.response.data){
            this.$q.notify({
              message: error.response.data,
              color: 'red'
            });
          }
        }
      }
    }
  }
}
</script>
  
  <style>
  .wave {
    position: fixed;
    height: 100%;
    left: 0;
    bottom: 0;
    z-index: -1;
  }
  </style>