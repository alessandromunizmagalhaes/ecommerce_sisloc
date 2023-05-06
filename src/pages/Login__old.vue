<template>
  <q-page class="flex flex-center">
    
    <q-card bordered class="bg-grey-1 my-card">
      <q-card-section>
        <div class="text-h6 centered">Login</div>
      </q-card-section>

      <q-separator inset />

      <q-card-section>
        
        <div class="q-pa-md" style="max-width: 400px">

          <q-form
            @submit="onSubmit"
            class="q-gutter-md"
          >
            <q-input
              filled
              v-model="login.email"
              type="email"
              label="E-mail"
              lazy-rules
              :rules="[ val => val && val.length > 0 || 'Insira um e-mail']"
              style="width:300px"
            />

            <q-input
              filled
              type="password"
              v-model="login.senha"
              label="Senha"
              lazy-rules
              :rules="[
                val => val !== null && val !== '' || 'Insira a senha'
              ]"
            />

            <div>
              <q-btn label="Logar" type="submit" color="primary"/>
            </div>
          </q-form>

          </div>    


      </q-card-section>
    </q-card>


    
    
  </q-page>
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
            alert(error.response.data);
          }
        }
      }
    }
  }
}
</script>
