<template>
  <div>
    <h2 class="page-heading">Корзина</h2>
    <div v-show="cartProducts.length" class="products-controls">
      <label class="remove-all-label">
        <input
          :checked="isAllProductsSelected"
          type="checkbox"
          @change="selectAllProducts"
        />
        Выбрать все
      </label>
      <button
        v-show="selectedProducts.length"
        class="remove-btn"
        @click="removeSelected"
      >
        Удалить выбранные
      </button>
    </div>
    <div class="cart-wrapper">
      <div v-show="cartProducts.length" class="products-list">
        <ProductCard
          v-for="product in cartProducts"
          :key="product.id"
          :product="product"
          :isFavoriteProduct="isFavoriteProduct(product)"
          :isSelectedProduct="isSelectedProduct(product)"
          class="product-item"
          @toggleFavoritesProduct="onProductFavotitesToggle"
          @addedToCart="addToCart"
          @removedFromCart="removeFromCart"
          @productSelected="onProductSelected"
        />
      </div>
      <div v-show="!cartProducts.length" class="products-list-empty">
        Пока что не выбрано ни одного товара :(
      </div>
      <div class="checkout-wrapper">
        <button class="submit-btn" @click="showCart">
          Перейти к оформлению
        </button>
        <p class="remark-text">
          Доступные способы и время доставки можно выбрать при оформлении заказа
        </p>
        <section class="cart-summary">
          <h3 class="section-heading">Ваша корзина:</h3>
          <div class="section-details">
            <span>Товары: </span>
            <span>{{ cartProductsQuantity }}&nbsp;шт</span>
          </div>
        </section>
        <section class="cart-cost">
          <h3 class="section-heading">Стоиомсть:</h3>
          <div class="section-details">
            <span>Итого: </span>
            <span>{{ cartCost }} р</span>
          </div>
        </section>
      </div>
    </div>
  </div>
</template>

<script>
import ProductCard from '@/components/CartProductCard.vue'
import BaseProductList from '@/mixins/BaseProductList'

export default {
  name: 'CartPage',
  components: {
    ProductCard
  },
  mixins: [BaseProductList],
  data() {
    return {
      selectedProducts: []
    }
  },
  computed: {
    cartProducts: {
      get() {
        return this.$store.state.cartList
      },
      set(productsList) {
        this.$store.commit('updateCart', productsList)
      }
    },
    cartProductsQuantity() {
      return this.$store.getters.cartProductsQuantity
    },
    cartCost() {
      return this.$store.getters.cartCost
    },
    isAllProductsSelected() {
      return (
        this.selectedProducts.length &&
        this.selectedProducts.length === this.cartProducts.length
      )
    }
  },
  methods: {
    removeSelected() {
      if (this.selectedProducts.length) {
        this.cartProducts = this.cartProducts.filter(
          product => !this.selectedProducts.some(id => id === product.id)
        )
        this.selectedProducts = []
      }
    },
    selectAllProducts() {
      if (this.isAllProductsSelected) {
        this.selectedProducts = []
      } else {
        this.selectedProducts = this.cartProducts.map(product => product.id)
      }
    },
    onProductSelected(productId) {
      const productInSelectedList = this.selectedProducts.find(
        id => id === productId
      )
      if (productInSelectedList) {
        this.selectedProducts = this.selectedProducts.filter(
          id => id !== productId
        )
      } else {
        this.selectedProducts.push(productId)
      }
    },
    isSelectedProduct(product) {
      return this.selectedProducts.includes(product.id)
    },
    isFavoriteProduct(product) {
      const productInProductsList = this.$store.state.productsList.find(
        pr => pr.id === product.id
      )
      return productInProductsList.isFavorite || false
    },
    getProductsString() {
      let result = ''
      this.cartProducts.forEach(prod => {
        result += '- ' + prod.dish + ` (${prod.quantity} шт)<br>`
      })
      result += `<br><b>Итого: ${this.cartCost}р</b>`
      return result
    },
    showCart() {
      let text = 'Товары не выбраны'
      let type = 'warn'
      if (this.cartProducts.length) {
        text = this.getProductsString()
        type = 'success'
      }
      this.$notify({
        group: 'cart',
        title: 'Ваша корзина',
        text,
        type
      })
    }
  }
}
</script>

<style scoped>
.cart-wrapper {
  display: flex;
  justify-content: space-between;
  flex-wrap: nowrap;
}

@media (max-width: 700px) {
  .cart-wrapper {
    flex-direction: column;
  }
}

.products-controls {
  display: flex;
  align-items: center;
  flex-wrap: nowrap;
  font-size: 12px;
}

.remove-all-label {
  display: inline-flex;
  align-items: center;
  flex-wrap: nowrap;
  cursor: pointer;
  margin-right: 8px;
}

.remove-btn {
  border: none;
  outline: none;
  background: none;
  color: var(--secondary-color);
  font-size: 12px;
  cursor: pointer;
}

.product-item:not(:last-child) {
  border-bottom: 1px solid var(--faded-color);
}

.checkout-wrapper {
  flex: 0 0 250px;
  padding: 8px;
}

.submit-btn {
  height: 38px;
  border: none;
  outline: none;
  border-radius: 5px;
  width: 100%;
  background: var(--accent-color);
  color: var(--light-color);
  font-weight: 600;
  cursor: pointer;
}

.remark-text {
  margin: 8px 0 12px 0;
  font-size: 10px;
  color: var(--fadedText-color);
  font-weight: 500;
  letter-spacing: 0.5px;
}

.section-heading {
  font-size: 16px;
  font-weight: 700;
  color: var(--text-color);
  margin-bottom: 8px;
}

.section-details {
  display: flex;
  justify-content: space-between;
  font-size: 14px;
  font-weight: 700;
}

.cart-summary {
  border-top: 1px solid var(--faded-color);
  padding: 12px 8px;
}

.cart-cost {
  border-top: 1px solid var(--faded-color);
  padding: 12px 8px;
}
</style>
