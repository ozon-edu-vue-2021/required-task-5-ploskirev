<script>
import CartIcon from '@/assets/images/cart.svg'
import store from '@/store'

export default {
  name: 'MainHeader',
  functional: true,
  components: {
    CartIcon
  },
  render() {
    let cartProductsQuantity = store.getters.cartProductsQuantity || ''
    if (cartProductsQuantity > 99) {
      cartProductsQuantity = ':-)'
    }
    return (
      <header class="main-header">
        <router-link tag="h1" to="/" class="main-heading">
          OZZON
        </router-link>
        <nav class="main-navigation">
          <div class="left-side">
            <router-link class="link" to="/" exact>
              Товары
            </router-link>
            &nbsp;
            <router-link class="link" to="/favorites" exact>
              Избранное
            </router-link>
            &nbsp;
          </div>
          <div class="right-side">
            <router-link class="link" to="/cart" exact>
              <CartIcon class="cart-icon" />
              <span vShow={cartProductsQuantity} class="cart-products-counter">
                {cartProductsQuantity}
              </span>
            </router-link>
          </div>
        </nav>
      </header>
    )
  }
}
</script>

<style scoped>
.main-header {
  position: sticky;
  top: 0;
  z-index: 1;
  width: 100vw;
  background: var(--primary-color);
  padding-top: 2px;
  color: var(--light-color);
  font-weight: 700;
  font-size: 20px;
}

.main-heading {
  padding-left: 4px;
  color: #fff;
  cursor: pointer;
}

.main-navigation {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: nowrap;
  background: #fff;
  font-size: 12px;
  padding: 0 20px;
}

.link {
  position: relative;
  display: inline-block;
  color: var(--link-color);
  fill: var(--link-color);
  margin: 0 4px;
  transition: color 0.2s;
}

.link:hover {
  color: var(--linkHovered-color);
  fill: var(--linkHovered-color);
}

.router-link-active.link {
  color: var(--secondary-color);
  fill: var(--secondary-color);
}

.cart-products-counter {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: nowrap;
  width: 15px;
  height: 15px;
  border-radius: 50%;
  background: var(--secondary-color);
  position: absolute;
  bottom: -5px;
  right: -12px;
  font-size: 10px;
  font-weight: 500;
  color: var(--light-color);
}
</style>
