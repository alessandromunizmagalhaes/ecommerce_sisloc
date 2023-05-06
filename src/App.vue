<template>
  <div id="q-app">
    <router-view />
  </div>
</template>

<script>
import { api } from 'boot/axios'

export default {
  name: 'App',
  beforeCreate() {
    this.$store.dispatch('auth/init')
    const token = this.$store.getters.getToken
    if (token) {
      api.defaults.headers.common.Authorization = 'JWT ' + token.access
    } else {
      api.defaults.headers.common.Authorization = ''
    }
  }
}
</script>
