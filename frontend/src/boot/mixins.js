export default async ({ Vue }) => {
  // carga de component dinamicos
  const requireComponent = require.context(
    '../mixins', true, /\.js$/
  )
  requireComponent.keys().forEach(fileName => {
    const componentConfig = requireComponent(fileName)
    Vue.mixin(componentConfig.default || componentConfig)
  })
}
