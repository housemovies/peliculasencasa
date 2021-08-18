export default function auth (from, to, next, store) {
  if (!store.getters['auth/check']) {
    next({ name: 'login' })
  } else {
    next()
  }
}
