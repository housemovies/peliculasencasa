export const state = {
  titlebarHeight: 0,
  toc: []
}

export const getters = {
  titlebarHeight: state => state.titlebarHeight,
  toc: state => state.toc
}

export const mutations = {
  titlebarHeight (state, height) {
    state.titlebarHeight = height
  },
  toc (state, toc) {
    state.toc.splice(0, state.toc.length, ...toc)
  }
}
