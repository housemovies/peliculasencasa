export const state = {
  texto: '',
}
export const getters = {
  texto: state => state.texto
}
export const mutations = {
  texto (state, payload) {
    state.texto = payload
  }
}
export const actions = {}
