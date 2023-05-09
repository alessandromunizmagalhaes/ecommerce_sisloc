<template>
  <div>
    <q-page class="flex flex-center">
      <div class="q-pa-md">

        <p class="text-weight-thin text-justify" v-if="!tem_resultados">O carrinho está vazio</p>

        <q-list bordered class="rounded-borders" padding separator style="max-width: 600px" v-else>
          <q-item
            v-for="item in this.carrinho"
            :key="item.prod_id + '_' + item.prod_valor_selecionado"
          >

            <q-item-section top thumbnail class="q-ml-none">
              <img :src="'./' + item.prod_imagem">
            </q-item-section>

            <q-item-section>
              <q-item-label class="text-subtitle2">{{item.prod_nome}} <q-space /></q-item-label>
              <q-item-label caption>R${{ item['prod_valor_' + item.prod_valor_selecionado] }} <span class="text-weight-bold">x {{ item['prod_qtd'] }} = <span class="text-positive">R${{ (item['prod_valor_' + item.prod_valor_selecionado] * item['prod_qtd']).toFixed(2)  }} </span> </span> </q-item-label>
            </q-item-section>

            <q-item-section top side>
              <div class="text-grey-8 q-gutter-xs">
                <q-btn class="gt-xs text-primary" size="12px" flat dense round icon="add" @click="adicionarQtd(item)" />
                <q-btn class="gt-xs text-primary" size="12px" flat dense round icon="remove" @click="removerQtd(item)" />
                <q-btn class="gt-xs text-red" size="12px" flat dense round icon="delete" @click="removerItemDoCarrinhoItem(item)" />
                <q-item-label caption class="text-italic">({{item.prod_valor_selecionado}})</q-item-label>
              </div>
            </q-item-section>

          </q-item>

          <q-separator />
          
          <q-item>
            <q-item-section top side>
              <div class="text-weight-bold q-gutter-md">
                <q-item-label caption class="text-italic"><span class="text-subtitle1 text-weight-medium">Valor Total: <span class="text-positive">R${{ getValorTotal }}</span></span></q-item-label>
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
  data(){
    return {
      tem_resultados : true
    }
  },
  computed: {
    ...mapGetters('carrinho_compras', ['carrinho']),
    getValorTotal() {
      let total = 0;
      for(var item in this.carrinho) {
        let prod = this.carrinho[item];
        total += prod['prod_valor_' + prod.prod_valor_selecionado] * prod['prod_qtd']
      }
      return total.toFixed(2);
    }
  },
  methods : {
    ...mapActions('carrinho_compras', ['updateCarrinho', 'mudarQuantidadeItens', 'removerItem']),
    adicionarQtd(param) {
      param.operacao = '+';
      this.mudarQuantidadeItens(param);
    },
    removerQtd(param) {
      param.operacao = '-';
      if(param.prod_qtd > 1) {
        this.mudarQuantidadeItens(param);
      } else {
        this.removerItemDoCarrinhoItem(param);
      }
    },
    removerItemDoCarrinhoItem(param) {
      let callback = this.removerItem
        , items = this.carrinho;
      this.$q.dialog({
        title: 'Exclusão',
        message: "Remover o item '" + param.prod_nome + "' do carrinho de compras?",
        cancel: false,
        persistent: false
      }).onOk(() => {
        callback(param);

        if(Object.keys(items).length === 0) {
          this.tem_resultados = false;
        }
      });
    }
  },
  mounted() {
    if(Object.keys(this.carrinho).length === 0) {
          this.tem_resultados = false;
        }
  }
}
</script>
