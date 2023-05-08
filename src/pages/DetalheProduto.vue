<template>
  <q-page class="flex flex-center">
    <h5>Detalhe do Produto</h5>
  </q-page>
</template>

<script>
export default {
  name: 'Detalhe do Produto',
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
    const produto = this.$route.params.produto;
  },
  methods() {
    getProduto = function() {
      axios.get('http://localhost:3000/produto?prod_id=' + this.pesquisa)
        .then(response => {
          this.produtos = response.data;
          this.tem_resultados = response.data.length > 0
        })
        .catch(error => {
          console.log(error)
        });
    }
  }
}
</script>
