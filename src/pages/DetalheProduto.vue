<template>
  <q-page class="flex flex-center">

    <div class="q-pa-md row items-start q-gutter-md">
      <q-card class="my-card" flat bordered>
        <q-card-section horizontal>
          <q-img
            class="col-5"
            :src="'./' + this.prod_imagem"
          />

          <q-card-section>
            {{ this.prod_nome }}
          </q-card-section>
          
        </q-card-section>
      </q-card>

    </div>

  </q-page>
</template>

<script>
import axios from 'axios'
export default {
  name: 'DetalheProduto',
  data(){
    return {
      prod_id : '',
      prod_nome: '',
      prod_descricao: '',
      prod_valor : '',
      prod_imagem: '',
    }
  },
  created() {
    this.prod_id = this.$route.params.produto;
    this.getProduto();
  },
  methods : {
    getProduto() {
      axios.get('http://localhost:3000/produto?prod_id=' + this.prod_id)
        .then(response => {
          let produto = response.data.length > 0 ? response.data[0] : {};
          this.prod_nome = produto.prod_nome;
          this.prod_descricao = produto.prod_descricao;
          this.prod_valor = produto.prod_valor;
          this.prod_imagem = produto.prod_imagem;
        })
        .catch(error => {
          console.log(error)
        });
    }
  }
}
</script>

<style lang="sass" scoped>
.my-card
  width: 100%
  max-width: 500px
</style>
