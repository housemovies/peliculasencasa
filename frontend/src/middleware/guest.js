export default (to, from, next, store) => {
  if (store.getters['auth/check']) {
    next({ name: 'home' })
  } else {
    next()
  }
}
