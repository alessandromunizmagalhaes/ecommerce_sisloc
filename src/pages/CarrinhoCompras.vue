<template>
  <div>
      <h4 @click="updateCarrinho({id: id, updates: {}})">Carrinho de Compras</h4>
    <q-page class="flex flex-center">
      
      

      <div class="q-pa-md">
        <q-list bordered class="rounded-borders" padding separator style="max-width: 600px">
          <q-item
            v-for="item in this.carrinho"
            :key="item.prod_id"
          >

            <q-item-section top thumbnail class="q-ml-none">
              <img :src="'./' + item.prod_imagem">
            </q-item-section>

            <q-item-section>
              <q-item-label class="text-subtitle2">{{item.prod_nome}} <q-space /></q-item-label>
              <q-item-label caption>R${{ item['prod_valor_' + item.prod_valor_selecionado] }} x {{ item['prod_qtd'] }} = R${{ item['prod_valor_' + item.prod_valor_selecionado] * item['prod_qtd']  }} </q-item-label>
            </q-item-section>

            <q-item-section top side>
              <div class="text-grey-8 q-gutter-xs">
                <q-btn class="gt-xs" size="12px" flat dense round icon="add" />
                <q-btn class="gt-xs" size="12px" flat dense round icon="remove" />
                <q-btn class="gt-xs" size="12px" flat dense round icon="delete" />
                <q-item-label caption class="text-italic">({{item.prod_valor_selecionado}})</q-item-label>
              </div>
            </q-item-section>

          </q-item>
        </q-list>
      </div>

    </q-page>
  </div>
</template>

<script>
import {mapGetters, mapActions} from 'vuex'
export default {
  name: 'CarrinhoCompras',
  computed: {
    ...mapGetters('carrinho_compras', ['carrinho']),
    ...mapActions('carrinho_compras', ['updateCarrinho'])
  },
  created() {
    console.log(this.carrinho);
  }
}
</script>
