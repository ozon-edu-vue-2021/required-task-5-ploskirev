export default {
  computed: {
    products() {
      return this.$store.state.productsList
    }
  },
  methods: {
    onProductFavotitesToggle(productId) {
      this.$store.commit('toggleFavoritesProduct', productId)
    },
    addToCart(product) {
      this.$store.commit('addProductToCart', product)
    },
    removeFromCart(product) {
      this.$store.commit('removeProductFromCart', product)
    },
    getQuantityInCart(product) {
      const quantity = this.$store.state.cartList.find(
        pr => pr.id === product.id
      )?.quantity
      return quantity ?? 0
    }
  }
}
