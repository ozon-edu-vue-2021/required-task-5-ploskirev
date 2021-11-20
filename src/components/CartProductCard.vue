<template>
  <div class="product-card-wrapper">
    <input
      type="checkbox"
      class="product-checker"
      @change="emitProductSelection(product.id)"
      :checked="isSelectedProduct"
    />
    <img
      :src="require(`/src/assets/images/${product.imageNumber}.webp`)"
      :alt="product.dish"
      width="100"
      class="product-image"
    />
    <div class="product-info">
      <div class="title-description-wrapper">
        <div class="product-title">
          <button
            class="product-button-favorite"
            @click="toggleProductsToFavorites"
          >
            <FavoriteIcon v-show="isFavoriteProduct" class="favorite-icon" />
            <NotFavoriteIcon
              v-show="!isFavoriteProduct"
              class="favorite-icon"
            />
          </button>
          {{ productTitle }}
        </div>
        <div class="product-description text-limit-5">
          {{ productDescription }}
        </div>
      </div>

      <div class="product-price">{{ productPrice }}&nbsp;Р/шт</div>
    </div>
    <div class="product-params">
      <div class="product-cost">{{ productCost }}&nbsp;Р</div>
      <div class="product-quantity">
        <InputQuantity
          :quantity="product.quantity"
          @increaseQuantity="addProductToCart"
          @decreaseQuantity="removeProductFromCart"
        />
      </div>
    </div>
  </div>
</template>

<script>
import FavoriteIcon from '@/assets/images/favoriteFill.svg'
import NotFavoriteIcon from '@/assets/images/favoriteOutline.svg'
import InputQuantity from '@/components/ui/InputQuantity.vue'
import BaseProductCard from '@/mixins/BaseProductCard'

export default {
  name: 'CartProductCard',
  mixins: [BaseProductCard],
  components: {
    FavoriteIcon,
    NotFavoriteIcon,
    InputQuantity
  },
  props: {
    product: {
      type: Object,
      required: true
    },
    isFavoriteProduct: {
      type: Boolean,
      default: false
    },
    isSelectedProduct: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    productCost() {
      return this.product.price * this.product.quantity || 'н/д'
    }
  },
  methods: {
    emitProductSelection(val) {
      this.$emit('productSelected', val)
    },
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
</script>

<style scoped>
.product-card-wrapper {
  padding: 8px;
  height: 150px;
  display: flex;
  align-items: center;
  flex-wrap: nowrap;
}

.product-checker {
  margin-right: 12px;
}

.product-image {
  margin-right: 12px;
}

.product-info {
  height: 100%;
  margin-right: 12px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.product-button-favorite {
  margin-right: 8px;
  transform: scale(0.8);
}

.product-price {
  font-size: 16px;
  font-weight: 700;
  color: var(--fadedText-color);
}

.product-title {
  font-size: 14px;
  display: flex;
  align-items: center;
  flex-wrap: nowrap;
}

.product-description {
  font-size: 12px;
  color: var(--fadedText-color);
}

.product-params {
  height: 100%;
}

.product-cost {
  font-size: 14px;
  font-weight: 700;
  margin: 8px 0 12px 0;
}
</style>
