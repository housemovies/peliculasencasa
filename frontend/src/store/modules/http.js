import axios from 'axios'
import { forEach } from 'lodash'
export const actions = {
  async Get ({ state, commit }, { api, params }) {
    try {
      const { data } = await axios(`${api}/`, { params })
      return data
    } catch (error) {
      return Promise.reject({ status: error.response.status, message: error.response.data })
    }
  },

  async Post ({ state }, { api, model }) {
    try {
      const { data } = await axios.post(`${api}/`, model)
      return data
    } catch (error) {
      return Promise.reject({ status: error.response.status, message: error.response.data })
    }
  },
  async PostFile ({ state }, { api, model }) {
    try {
      const formData = new FormData()
      forEach(model, function (value, key) {
        formData.append(key, value)
      })
      const { data } = await axios.post(`${api}/`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      return data
    } catch (error) {
      return Promise.reject({ status: error.response.status, message: error.response.data })
    }
  },
  async PutFile ({ state }, { api, model }) {
    try {
      const formData = new FormData()
      forEach(model, function (value, key) {
        formData.append(key, value)
      })
      const { data } = await axios.put(`${api}/`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      return data
    } catch (error) {
      return Promise.reject({ status: error.response.status, message: error.response.data })
    }
  },
  async Put ({ state, commit }, { api, model }) {
    try {
      const { data } = await axios.put(`${api}/`, model)
      return data
    } catch (error) {
      return Promise.reject({ status: error.response.status, message: error.response.data })
    }
  },
  async PatchFile ({ state }, { api, model }) {
    try {
      const formData = new FormData()
      forEach(model, function (value, key) {
        formData.append(key, value)
      })
      const { data } = await axios.patch(`${api}/`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      return data
    } catch (error) {
      return Promise.reject({ status: error.response.status, message: error.response.data })
    }
  },
  async Patch ({ state, commit }, { api, model }) {
    try {
      const { data } = await axios.patch(`${api}/`, model)
      return data
    } catch (error) {
      return Promise.reject({ status: error.response.status, message: error.response.data })
    }
  },
  async Delete ({ state, commit }, api) {
    try {
      const { data } = await axios.delete(`${api}/`)
      return data
    } catch (error) {
      return Promise.reject({ status: error.response.status, message: error.response.data })
    }
  }
}
