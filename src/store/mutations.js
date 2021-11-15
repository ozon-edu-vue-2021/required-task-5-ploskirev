function getProductFromCart(state, product) {
  return state.cartList.find(pr => pr.id === product.id)
}

const mutations = {
  startLoading: state => (state.isLoading = true),
  endLoading: state => (state.isLoading = false),
  setProductsList: (state, payload) => (state.productsList = payload),
  toggleFavoritesProduct: (state, productId) => {
    const productInList = state.productsList.find(
      product => product.id === productId
    )
    if (productInList) {
      productInList.isFavorite = !productInList.isFavorite
    }
  },
  addProductToCart: (state, product) => {
    const productInCart = getProductFromCart(state, product)
    if (productInCart) {
      productInCart.quantity++
    } else {
      state.cartList.push({ ...product, quantity: 1 })
    }
  },
  removeProductFromCart: (state, product) => {
    const productInCart = getProductFromCart(state, product)
    const productId = productInCart.id
    if (productInCart) {
      if (productInCart.quantity > 1) {
        productInCart.quantity--
      } else {
        state.cartList = state.cartList.filter(pr => pr.id !== productId)
      }
    } else {
      console.log(`No product with id: ${productId} in cart`)
    }
  },
  updateCart: (state, productsList) => {
    state.cartList = productsList
  }
}

export default mutations
