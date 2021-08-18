
const routes = [
  { path: '/principal/categoria/:id/:categoria', name: 'MenusAdministrar',  props: true, component: () => import('pages/menu/index.vue') },
  { path: '/principal/pelicula/:id', name: 'PeliculasDetalle',  props: true, component: () => import('pages/menu/pelicula.vue') },
  { path: '/principal/pelicula/detallado/:id', name: 'Detallado',  props: true, component: () => import('pages/menu/peliculaaleatoria.vue') },
]
export default routes
