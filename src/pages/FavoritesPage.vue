<template>
  <div>
    <h2 class="page-heading">Избранное</h2>
    <div v-show="favoritesProducts.length" class="productslist-wrapper">
      <CatalogProductsCard
        v-for="product in favoritesProducts"
        :key="product.id + product.uid"
        :product="product"
        :cartQuantity="getQuantityInCart(product)"
        class="product-item"
        @toggleFavoritesProduct="onProductFavotitesToggle"
        @addedToCart="addToCart"
        @removedFromCart="removeFromCart"
      />
    </div>
    <div v-show="!favoritesProducts.length" class="favorits-list-empty">
      Пока что в избранном слишком грустно и холодно :(
    </div>
  </div>
</template>

<script>
import CatalogProductsCard from '@/components/CatalogProductCard.vue'
import BaseProductList from '@/mixins/BaseProductList'

export default {
  name: 'FavoritesPage',
  components: {
    CatalogProductsCard
  },
  mixins: [BaseProductList],
  computed: {
    favoritesProducts() {
      return this.$store.getters.favoritsList
    }
  }
}
</script>
