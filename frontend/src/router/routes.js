
const routes = [
  { path: '', name: 'home', component: () => import('pages/Index.vue') },
  // { path: '/login', name: 'login', component: () => import('pages/Login.vue') }
]

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue')
  })
}

export default routes
