<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="leftDrawerOpen = !leftDrawerOpen"
        />

        <q-toolbar-title>
          Ecommerce Sisloc
        </q-toolbar-title>

        <q-btn stretch flat to="/login" v-if="!isAuthenticated">Login</q-btn>
        <q-btn stretch flat @click="logout" v-else>Logout</q-btn>

      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      content-class="bg-grey-1"
    >
      <q-list>
        <q-item-label
          header
          class="text-grey-8"
        >
          Páginas
        </q-item-label>
        <EssentialLink
          v-for="link in essentialLinks"
          :key="link.title"
          v-bind="link"
        />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import EssentialLink from 'components/EssentialLink.vue'
import {mapGetters} from 'vuex'

const linksData = [
  {
    title: 'Lista de Produtos',
    caption: 'confira a lista de produtos',
    icon: 'list',
    link: '/'
  },
  {
    title: 'Carrinho de Compras',
    caption: 'veja os itens do carrinho',
    icon: 'shopping_cart',
    link: '/carrinho_compras'
  },
  {
    title: 'Login',
    caption: 'Autentique na página',
    icon: 'login',
    link: '/login'
  }
]

export default {
  name: 'MainLayout',
  components: {
    EssentialLink
  },
  data () {
    return {
      leftDrawerOpen: false,
      essentialLinks: linksData,

    }
  },
  methods: {
    logout() {
      this.$store.dispatch('auth/signOut');
      this.$router.push('/')
    }
  },
  computed: {
    ...mapGetters('auth', ['isAuthenticated'])
  }
}
</script>
