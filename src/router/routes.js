const routes = [
  { path: '/', component: () => import('@/pages/CatalogPage.vue') },
  { path: '/cart', component: () => import('@/pages/CartPage.vue') },
  { path: '/favorites', component: () => import('@/pages/FavoritesPage.vue') }
]

export default routes
