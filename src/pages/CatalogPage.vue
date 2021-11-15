<template>
  <div>
    <h2 class="page-heading">Продукты</h2>
    <div v-if="products.length" class="productslist-wrapper">
      <CatalogProductsCard
        v-for="product in products"
        :key="product.id + product.uid"
        :product="product"
        :cartQuantity="getQuantityInCart(product)"
        class="product-item"
        @toggleFavoritesProduct="onProductFavotitesToggle"
        @addedToCart="addToCart"
        @removedFromCart="removeFromCart"
      />
    </div>
    <div v-else class="products-list-empty">
      <span v-if="isLoading"> Загружаем список продуктов </span>
      <span v-else>
        Кажется, мы не смогли загрузить список продуктов. Попробуйте чуть позже
      </span>
    </div>
  </div>
</template>

<script>
import CatalogProductsCard from '@/components/CatalogProductCard.vue'
import BaseProductList from '@/mixins/BaseProductList'

export default {
  name: 'ProductsPage',
  components: {
    CatalogProductsCard
  },
  mixins: [BaseProductList],
  computed: {
    isLoading() {
      return this.$store.state.isLoading
    }
  }
}
</script>
