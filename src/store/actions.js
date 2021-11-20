const imageNumbers = [
  '6123150777',
  '6126039472',
  '6126040354',
  '6128597660',
  '6134992334',
  '6136170572',
  '6136172483',
  '6140906765',
  '6142673815',
  '6142681673',
  '6142683276',
  '6148226736'
]

function getRandomImageNumber() {
  const randomIndex = Math.floor(Math.random() * imageNumbers.length)
  return imageNumbers[randomIndex]
}

function getRandomPrice() {
  return Math.floor(Math.random() * 1000)
}

function errorHandler(err) {
  console.error(err)
}

const actions = {
  loadProductsList: async ({ commit }) => {
    try {
      commit('startLoading')
      const response = await fetch(
        'https://random-data-api.com/api/food/random_food?size=30'
      )
      if (!response.ok) {
        throw new Error("Can't get products list")
      }
      const responseData = await response.json()
      const data = responseData.map(product => ({
        ...product,
        imageNumber: getRandomImageNumber(),
        price: getRandomPrice(),
        isFavorite: false
      }))
      commit('setProductsList', data)
    } catch (err) {
      errorHandler(err)
    } finally {
      commit('endLoading')
    }
  }
}

export default actions
