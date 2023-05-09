
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { name: 'LoginIn', path: '/login', component: () => import('pages/Login.vue') },
      { path: '', component: () => import('pages/ListaDeProdutos.vue') },
      { path: '/detalhe_produto/:produto', component: () => import('pages/DetalheProduto.vue')},
      { path: '/carrinho_compras', component: () => import('pages/CarrinhoCompras.vue'), meta: {requireLogin: true} },
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
