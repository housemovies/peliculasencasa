export const state = {
  modulos: [],
  menu: [],
  sub_menu: []
}
export const getters = {
  modulos: state => state.modulos,
  menu: state => state.menu,
  sub_menu_active: state => state.sub_menu.length > 0,
  sub_menu: state => state.sub_menu
}
export const mutations = {
  modulos (state, payload) {
    state.modulos = payload
    state.menu = []
    state.sub_menu = []
  },
  menus (state, payload) {
    state.menu = payload
    state.sub_menu = []
  },
  sub_menu (state, payload) {
    state.sub_menu = payload
  }
}
export const actions = {}
