const getters = {
  favoritsList: state =>
    state.productsList.filter(product => product.isFavorite),
  cartProductsQuantity: state => {
    return state.cartList.reduce((acc, product) => acc + product.quantity, 0)
  },
  cartCost: state => {
    return state.cartList.reduce(
      (acc, product) => acc + product.price * product.quantity,
      0
    )
  }
}

export default getters
