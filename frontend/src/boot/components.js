import { upperFirst, camelCase } from 'lodash'

export default async ({ Vue }) => {
  // carga de component dinamicos
  const requireComponent = require.context(
    'components', true, /\.vue$/
  )

  requireComponent.keys().forEach(fileName => {
    const componentConfig = requireComponent(fileName)

    const componentName = upperFirst(
      camelCase(fileName.replace(/^\.\//, '').replace(/\.\w+$/, ''))
    )

    Vue.component(componentName, componentConfig.default || componentConfig)
  })
}
