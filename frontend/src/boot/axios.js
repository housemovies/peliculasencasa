import { Loading, Dialog } from 'quasar'
import axios from 'axios'

const url = '/api/'

export default async ({ Vue, store, router, app }) => {
  // something to do
  Vue.prototype.$axios = axios
  axios.interceptors.request.use(request => {
    request.baseURL = url
    const token = store.getters['auth/token']
    if (token) {
      request.headers.common.Authorization = `Token ${token}`
    }
    //
    // const locale = store.getters['lang/locale']
    // if (locale) {
    //   request.headers.common['Accept-Language'] = locale
    // }
    // request.headers['X-Socket-Id'] = Echo.socketId()
    Loading.show()
    return request
  })

  function handleSuccess (response) {
    Loading.hide()
    return { data: response.data }
  }

  function handleError (error) {
    Loading.hide()
    let dialog = false
    let title = false
    let message = false
    let funcionOk = () => {
    }
    switch (error.response.status) {
      case 400:
        break
      case 401:
        // Log out user, remove token, clear state and redirect to login
        dialog = true
        title = app.i18n.t('token_expired_alert_title')
        message = app.i18n.t('token_expired_alert_text')
        funcionOk = () => {
          store.commit('auth/LOGOUT')
          router.push({ name: 'login' })
        }
        break
      case 404:
        // Show 404 page
        break
      case 500:
        // Serveur Error redirect to 500
        dialog = true
        title = app.i18n.t('error_alert_title')
        message = app.i18n.t('error_alert_text')
        break
      default:
        // Unknow Error
        break
    }

    if (dialog) {
      Dialog.create({
        title,
        message,
        persistent: true
      }).onOk(funcionOk)
    }
    return Promise.reject(error)
  }

  // Response interceptor
  axios.interceptors.response.use(handleSuccess, handleError)
}
