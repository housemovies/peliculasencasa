<template>
  <div id="q-app">
    <q-ajax-bar
      ref="loading"
      position="top"
      color="accent"
      size="5px"
      skip-hijack
    />
    <component v-if="layout" :is="layout"/>
  </div>
</template>

<script>
// Load layout components dynamically.
const requireContext = require.context('layouts', false, /.*\.vue$/)

const layouts = requireContext
  .keys()
  .map(file => [file.replace(/(^.\/)|(\.vue$)/g, ''), requireContext(file)])
  .reduce((components, [name, component]) => {
    components[name] = component.default || component
    return components
  }, {})
export default {
  name: 'App',
  data: () => ({
    layout: null,
    defaultLayout: 'default'
  }),
  mounted () {
    this.$loading = this.$refs.loading
  },
  methods: {
    setLayout (layout) {
      if (!layout || !layouts[layout]) {
        layout = this.defaultLayout
      }
      this.layout = layouts[layout]
    }
  }
}
</script>
