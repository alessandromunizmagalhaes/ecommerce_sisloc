

<template>
  <q-page class="flex flex-center">

    <div class="q-pa-md row items-start q-gutter-md">

      <q-card class="my-card">
      <q-card-section horizontal>
        <q-img class="col-5" :src="'./' + this.db.prod_imagem"/>

        <q-card-section>
          <div class="text-h6">{{this.db.prod_nome}}</div>
          <div class="text-caption text-grey">{{this.db.prod_descricao}}</div> 
          <div class="text-subtitle1">R$ {{ valorProduto }} <span class="text-caption text-grey">({{this.prod_valor_selecionado}})</span> </div>
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
        <q-btn flat color="primary" label="Adicionar ao carrinho" icon="shopping_cart" @click="AdicionarAoCarrinho" />

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
            {{ this.db.prod_info_tecnica }}
          </q-card-section>
        </div>
      </q-slide-transition>
    </q-card>

    </div>

  </q-page>
</template>

<script>
import axios from 'axios';
import {mapGetters, mapActions} from 'vuex'

export default {
  name: 'DetalheProduto',
  data(){
    return {
      expanded: true,
      prod_id : '',
      prod_valor_selecionado : 'mensal',
      db: {
        prod_nome: '',
        prod_descricao: '',
        prod_info_tecnica: '',
        prod_valor_diario : '',
        prod_valor_semanal : '',
        prod_valor_quinzenal : '',
        prod_valor_mensal : '',
        prod_imagem: '',
      },
    }
  },
  created() {
    this.prod_id = this.$route.params.produto;
    this.getProduto();
  },
  methods : {
    ...mapActions('carrinho_compras', ['adicionarItem']),
    getProduto() {
      axios.get('http://localhost:3000/produto?prod_id=' + this.prod_id)
        .then(response => {
          let produto_db = response.data.length > 0 ? response.data[0] : {};
          Object.assign(this.db, produto_db);
        })
        .catch(error => {
          console.log(error)
        });
    },
    onItemClick(tipo_preco) {
        this.prod_valor_selecionado = tipo_preco;
    },
    AdicionarAoCarrinho() {
      this.adicionarItem(Object.assign({
        prod_id: this.prod_id,
        prod_valor_selecionado: this.prod_valor_selecionado
      }, this.db));
      this.$router.push('/carrinho_compras');
    },
  },
  computed: {
    valorProduto() {
      return this.db['prod_valor_' + this.prod_valor_selecionado];
    }
  }
}
</script>

<style lang="sass" scoped>
.my-card
  width: 100%
  max-width: 650px
</style>
