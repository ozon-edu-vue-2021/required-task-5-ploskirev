export default {
  props: {
    product: {
      type: Object,
      required: true
    }
  },
  computed: {
    productTitle() {
      return this.product.dish || 'н/д'
    },
    productDescription() {
      return this.product.description || ''
    },
    productPrice() {
      return this.product.price || 'н/д'
    }
  },
  methods: {
    toggleProductsToFavorites() {
      this.$emit('toggleFavoritesProduct', this.product.id)
    },
    addProductToCart() {
      this.$emit('addedToCart', this.product)
    },
    removeProductFromCart() {
      this.$emit('removedFromCart', this.product)
    }
  }
}
