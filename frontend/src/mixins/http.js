import axios from 'axios'
import { forEach } from 'lodash'

export default {
  methods: {
    async Get (api, params = {}) {
      try {
        const { data } = await axios(`${api}/`, { params })
        return data
      } catch (error) {
        return Promise.reject({ status: error.response.status, message: error.response.data })
      }
    },

    async Post (api, model) {
      try {
        const { data } = await axios.post(`${api}/`, model)
        return data
      } catch (error) {
        return Promise.reject({ status: error.response.status, message: error.response.data })
      }
    },
    async PostFile (api, model) {
      try {
        const formData = new FormData()
        forEach(model, function (value, key) {
          formData.append(key, value)
        })
        const { data } = await axios.post(`${api}/`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        })
        return data
      } catch (error) {
        return Promise.reject({ status: error.response.status, message: error.response.data })
      }
    },
    async PutFile (api, model) {
      try {
        const formData = new FormData()
        forEach(model, function (value, key) {
          formData.append(key, value)
        })
        const { data } = await axios.put(`${api}/`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        })
        return data
      } catch (error) {
        return Promise.reject({ status: error.response.status, message: error.response.data })
      }
    },
    async Put (api, model) {
      try {
        const { data } = await axios.put(`${api}/`, model)
        return data
      } catch (error) {
        return Promise.reject({ status: error.response.status, message: error.response.data })
      }
    },
    async PatchFile (api, model) {
      try {
        const formData = new FormData()
        forEach(model, function (value, key) {
          formData.append(key, value)
        })
        const { data } = await axios.patch(`${api}/`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        })
        return data
      } catch (error) {
        return Promise.reject({ status: error.response.status, message: error.response.data })
      }
    },
    async Patch (api, model) {
      try {
        const { data } = await axios.patch(`${api}/`, model)
        return data
      } catch (error) {
        return Promise.reject({ status: error.response.status, message: error.response.data })
      }
    },
    async Delete (api) {
      try {
        const { data } = await axios.delete(`${api}/`)
        return data
      } catch (error) {
        return Promise.reject({ status: error.response.status, message: error.response.data })
      }
    }
  }
}
