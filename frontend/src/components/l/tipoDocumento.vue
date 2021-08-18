<template>
  <div :class="`col-${col} ${class_val}`">
    <l-select
      outlined
      :value="value"
      :options="options"
      emit-value
      map-options
      @input="$emit('input',$event)"
      option-value="id"
      option-label="nombre"
      label="Tipo de Documento"
      :rules="rules"
    />
  </div>
</template>

<script>
export default {
  name: 'LTipoDocumento',
  props: {
    value: {
      type: [String, Number],
      default: null
    },
    tipo_persona: {
      type: [Number],
      default: 0
    },
    col: {
      type: String,
      default: '12'
    },
    class_val: {
      type: String,
      default: ''
    },
    rules: {
      type: [Array, Object],
      default: () => ([])
    }
  },
  data () {
    return {
      options: []
    }
  },
  mounted () {
    this.getLoad()
  },
  methods: {
    async getLoad () {
      try {
        let url = ''
        if (this.tipo_persona === 0) {
          url = 'tercero/tipo_documento'
        } else {
          url = `tercero/tipo_documento/${this.tipo_persona}`
        }
        this.options = await this.Get(url)
      } catch ({ message }) {
        console.error(message)
      }
    }
  }
}
</script>
<style scoped>
</style>
