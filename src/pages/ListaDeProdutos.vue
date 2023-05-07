<template>
  <q-page class="constrain q-pa-md">

  <div class="row">
    <div class="offset-4 col-6">
      <div class="q-pa-md">
        <div class="q-gutter-y-md column">

          <q-input outlined label="Pesquisar" stack-label v-model="pesquisa">
            <template v-slot:append>
              <q-icon name="search" />
            </template>
          </q-input>
          <q-btn class="col-2" @click="getProdutos">Pesquisar</q-btn>

        </div>
      </div>
    </div>
  </div>
    
    <div class="row items-start q-gutter-md">
    
      <q-card 
        v-for="produto in produtos"
        :key="produto.prod_id"
        class="card-item"
      >
        <q-img class="responsive" :src="getPic(produto.prod_imagem)" />

        <q-card-section>
          <q-btn
            fab
            color="primary"
            icon="shopping_cart"
            class="absolute"
            style="top: 0; right: 12px; transform: translateY(-50%);"
          />

          <div class="row no-wrap items-center">
            <div class="col text-h6 ellipsis">
              {{produto.prod_nome}}
            </div>
          </div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <div class="text-subtitle1">
            R$ {{ produto.prod_valor }}
          </div>
          <div class="text-caption text-grey">
            {{ produto.prod_descricao }}
          </div>
        </q-card-section>

        <q-separator />

        <q-card-actions>
          <q-btn flat round icon="list" />
          <q-btn flat color="primary">
            Mais detalhes
          </q-btn>
        </q-card-actions>
      </q-card>

    </div>

  </q-page>
</template>

<script>
import axios from 'axios'
export default {
  name: 'ListaDeProdutos',
  data () {
    return {
        produtos : [],
        pesquisa : '',
        tem_resultados : false
    }
  },
  created() {
    this.getProdutos();
  },
  methods: {
    getProdutos() {
      axios.get('http://localhost:3000/produtos/?pesquisa=' + this.pesquisa)
        .then(response => {
          this.produtos = response.data;
          this.tem_resultados = response.data.length > 0
        })
        .catch(error => {
          console.log(error)
        })
    },
    getPic(img_name) {
      return './' + img_name;
    }
  }
}
</script>

<style lang="sass" scoped>
.card-item

  width: 100%
  max-width: 300px
</style>
