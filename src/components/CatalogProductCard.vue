<template>
  <article class="product-card">
    <div class="produc-info">
      <img
        :src="require(`@/assets/images/${product.imageNumber}.webp`)"
        :alt="productTitle"
        width="100%"
        class="product-image"
      />
      <button
        class="product-button-favorite"
        @click="toggleProductsToFavorites"
      >
        <FavoriteIcon v-show="isFavoriteProduct" class="favorite-icon" />
        <NotFavoriteIcon v-show="!isFavoriteProduct" class="favorite-icon" />
      </button>

      <div class="product-price">{{ productPrice }}Р</div>
      <div class="product-title">{{ productTitle }}</div>
      <div class="product-description text-limit-3">
        {{ productDescription }}
      </div>
    </div>

    <button
      v-if="!isInCartProduct"
      class="product-button-buy"
      @click="addProductToCart"
    >
      В корзину
    </button>
    <InputQuantity
      v-else
      :quantity="cartQuantity"
      @increaseQuantity="addProductToCart"
      @decreaseQuantity="removeProductFromCart"
    />
  </article>
</template>

<script>
import FavoriteIcon from '@/assets/images/favoriteFill.svg'
import NotFavoriteIcon from '@/assets/images/favoriteOutline.svg'
import InputQuantity from '@/components/ui/InputQuantity.vue'
import BaseProductCard from '@/mixins/BaseProductCard'

export default {
  name: 'CatalogProductCard',
  mixins: [BaseProductCard],
  components: {
    FavoriteIcon,
    NotFavoriteIcon,
    InputQuantity
  },
  props: {
    cartQuantity: {
      type: Number,
      default: 0
    }
  },
  computed: {
    isFavoriteProduct() {
      return this.product.isFavorite
    },
    isInCartProduct() {
      return Boolean(this.cartQuantity)
    }
  }
}
</script>

<style scoped>
.product-card {
  position: relative;
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  justify-content: space-between;
  align-items: flex-start;
  min-width: 150px;
  max-width: 300px;
  padding: 8px;
}

.produc-info {
  margin-bottom: 20px;
}

.product-image {
  margin-bottom: 12px;
}

.product-button-favorite {
  position: absolute;
  right: -2px;
  top: -2px;
}

.product-price {
  margin-bottom: 8px;
  font-size: 20px;
  font-weight: 700;
  color: var(--fadedText-color);
}

.product-title {
  margin-bottom: 8px;
  font-size: 14px;
}

.product-description {
  margin-bottom: 8px;
  font-size: 12px;
  color: var(--fadedText-color);
}

.product-button-buy {
  min-width: 115px;
  border: none;
  outline: none;
  font-size: 12px;
  font-weight: 600;
  background: var(--secondary-color);
  color: var(--light-color);
  padding: 0 8px;
  height: 30px;
  border-radius: 4px;
  cursor: pointer;
}
</style>
