<template>
  <q-page class="constrain q-pa-md">

  <div class="row">
    <div class="offset-4 col-6">
      <div class="q-pa-md">
        <div class="q-gutter-y-md column">

          <div class="row">  
            <q-input 
            label="Pesquisar" 
            class="col-8"
            v-on:keyup.enter="onEnter"
            stack-label 
            v-model="pesquisa">
            </q-input>
          </div>
        </div>
      </div>
    </div>
  </div>
  
  <q-page class="flex flex-center" v-if="!tem_resultados">
    <div class="q-pa-md">
      <p class="text-weight-thin text-justify">Nenhum produto encontrado</p>
    </div>
  </q-page>
  

    <div class="row items-start q-gutter-md">
    
      <q-card 
        v-for="produto in produtos"
        :key="produto.prod_id"
        class="card-item"
      >
        <q-img class="responsive" :src="'./' + produto.prod_imagem" />

        <q-card-section>
          <q-btn
            fab
            color="primary"
            icon="add"
            class="absolute"
            :to="'/detalhe_produto/' + produto.prod_id"
            style="top: 0; right: 12px; transform: translateY(-50%);"
          />

          <div class="row no-wrap items-center">
            <div class="col text-h6 ellipsis">
              {{produto.prod_nome}}
            </div>
          </div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <div class="text-caption text-grey">
            {{ produto.prod_descricao }}
          </div>
        </q-card-section>

        <q-separator />

        <q-card-actions>
          <q-btn flat round icon="list" />
          <q-btn flat color="primary" :to="'/detalhe_produto/' + produto.prod_id">
            Ver ficha técnica
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
        tem_resultados : true
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
    onEnter: function() {
       this.getProdutos();
    }
  }
}
</script>

<style lang="sass" scoped>
.card-item

  width: 100%
  max-width: 300px
</style>
