

<template>
  <q-page class="flex flex-center">

    <div class="q-pa-md row items-start q-gutter-md">

      <q-card class="my-card">
      <q-card-section horizontal>
        <q-img class="col-5" :src="'./' + this.prod_imagem"/>

        <q-card-section>
          <div class="text-h6">{{this.prod_nome}}</div>
          <div class="text-caption text-grey">{{this.prod_descricao}}</div> 
          <div class="text-subtitle1">R$ {{ valorProduto }} <spam class="text-caption text-grey">({{this.prod_valor_selecionado}})</spam> </div>
          <q-btn-dropdown color="primary" label="Ver preços">
            <q-list>
              <q-item clickable v-close-popup @click="onItemClick('diario')">
                <q-item-section>
                  <q-item-label>Diário</q-item-label>
                </q-item-section>
              </q-item>

              <q-item clickable v-close-popup @click="onItemClick('semanal')">
                <q-item-section>
                  <q-item-label>Semanal</q-item-label>
                </q-item-section>
              </q-item>

              <q-item clickable v-close-popup @click="onItemClick('quinzenal')">
                <q-item-section>
                  <q-item-label>Quinzenal</q-item-label>
                </q-item-section>
              </q-item>

              <q-item clickable v-close-popup @click="onItemClick('mensal')">
                <q-item-section>
                  <q-item-label>Mensal</q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
          </q-btn-dropdown>
        </q-card-section>
        
      </q-card-section>

      <q-separator />

      <q-card-actions>
        <q-btn flat color="primary" label="Adicionar ao carrinho" />

        <q-space />

        <q-btn
          color="grey"
          round
          flat
          dense
          :icon="expanded ? 'keyboard_arrow_up' : 'keyboard_arrow_down'"
          @click="expanded = !expanded"
        />
      </q-card-actions>

      <q-slide-transition>
        <div v-show="expanded">
          <q-separator />
          <q-card-section class="text-subitle2">
            {{ this.prod_info_tecnica }}
          </q-card-section>
        </div>
      </q-slide-transition>
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
      expanded: true,
      prod_id : '',
      prod_nome: '',
      prod_descricao: '',
      prod_info_tecnica: '',
      prod_valor_diario : '',
      prod_valor_semanal : '',
      prod_valor_quinzenal : '',
      prod_valor_mensal : '',
      prod_valor_selecionado : 'mensal',
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
          this.prod_info_tecnica = produto.prod_info_tecnica;
          this.prod_valor_diario = produto.prod_valor_diario;
          this.prod_valor_semanal = produto.prod_valor_semanal;
          this.prod_valor_quinzenal = produto.prod_valor_quinzenal;
          this.prod_valor_mensal = produto.prod_valor_mensal;
          this.prod_imagem = produto.prod_imagem;
        })
        .catch(error => {
          console.log(error)
        });
    },
    onItemClick(tipo_preco) {
        this.prod_valor_selecionado = tipo_preco;
    }
  },
  computed: {
    valorProduto() {
      return this['prod_valor_' + this.prod_valor_selecionado];
    }
  }
}
</script>

<style lang="sass" scoped>
.my-card
  width: 100%
  max-width: 650px
</style>
