<template>
  <q-page class="constrain q-pa-md">

  <div class="row">
    <div class="offset-4">
      <div class="q-pa-md">
        <div class="q-gutter-y-md column">

          <q-input outlined label="Pesquisar" stack-label width="300">
            <template v-slot:append>
              <q-icon name="search" />
            </template>
          </q-input>

        </div>
      </div>
    </div>
  </div>
    
    <div class="row items-start q-gutter-md">
    
      <q-card 
        v-for="produto in produtos"
        :key="produto.id"
        class="card-item"
      >
        <q-img :src="produto.imagem" />

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
              {{produto.titulo}}
            </div>
          </div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <div class="text-subtitle1">
            R$ {{ produto.valor }}
          </div>
          <div class="text-caption text-grey">
            {{ produto.descricao }}
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
export default {
  name: 'ListaDeProdutos',
  data () {
    return {
        produtos : [
        {
          id: '1',
          titulo: 'Café Basílico',
          valor: '19,99',
          descricao : 'Small plates, salads & sandwiches in an intimate setting.',
          imagem: 'https://cdn.quasar.dev/img/chicken-salad.jpg'
        },
        {
          id: '2',
          titulo: 'Café Basílico',
          valor: '29,99',
          descricao : 'Pequenos pratos .',
          imagem: 'https://cdn.quasar.dev/img/chicken-salad.jpg'
        },
      ]
    }
  }
}
</script>

<style lang="sass" scoped>
.my-card
  width: 100%
  max-width: 300px
</style>
