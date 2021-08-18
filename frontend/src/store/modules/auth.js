import axios from 'axios'
import { Cookies } from 'quasar'
import { union } from 'lodash'
// state
export const state = {
  user: Cookies.get('user'),
  token: Cookies.get('token'),
  permisos: []
}

// getters
export const getters = {
  user: state => state.user,
  permisos: state => state.permisos,
  token: state => state.token,
  check: state => state.user !== null
}
// mutations
export const mutations = {
  SAVE_TOKEN (state, token) {
    state.token = token
    Cookies.set('token', token, { expires: 365 })
  },

  FETCH_USER_SUCCESS (state, { user }) {
    let permisos = user.user_permissions
    for (const permiso of user.groups) {
      permisos = union(permiso.permissions, permisos)
      delete permiso.permissions
    }
    delete user.user_permissions
    state.user = user
    state.permisos = permisos
    Cookies.set('user', user, { expires: 365 })
  },

  FETCH_USER_FAILURE (state) {
    state.token = null
    Cookies.remove('token')
  },

  LOGOUT (state) {
    state.user = null
    state.token = null

    Cookies.remove('token')
    Cookies.remove('user')
  },

  UPDATE_USER (state, { user }) {
    state.user = user
  }
}

// actions
export const actions = {
  async login ({ commit, dispatch }, payload) {
    try {
      const data = await dispatch('http/Post', { api: 'login', model: payload }, { root: true })
      const { user } = data
      commit('SAVE_TOKEN', data.access_token)
      commit('FETCH_USER_SUCCESS', { user })
      return { valid: true }
    } catch (error) {
      return Promise.reject({ status: error.response.status, data: error.response.data })
    }
  },

  async fetchUser ({ commit }) {
    try {
      const { data } = await axios.get('user/')
      commit('FETCH_USER_SUCCESS', { user: data })
    } catch (e) {
      commit('FETCH_USER_FAILURE')
    }
  },
  async logout ({ commit }) {
    try {
      await axios.post('logout/')
    } catch (e) {
    }
    commit('LOGOUT')
  }
}
