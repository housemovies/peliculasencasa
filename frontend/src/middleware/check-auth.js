export default async (to, from, next, store) => {
  if (store.getters['auth/token']) {
    try {
      await store.dispatch('auth/fetchUser')
    } catch (e) { }
  }

  next()
}
