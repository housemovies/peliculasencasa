<template>
  <div :class="`col-${col} ${class_val}`">
    <q-datetime-picker
      :value="value"
      @input="$emit('input',$event)"
      @keyup="$emit('keyup',$event)"
      :label="label"
      :mode="mode"
      :color="color"
    ></q-datetime-picker>
  </div>
</template>

<script>
export default {
  name: 'LDateTimePiker',
  props: {
    value: {
      type: [String, Number]
    },
    col: {
      type: String,
      default: '12'
    },
    class_val: {
      type: String,
      default: ''
    },
    disable: {
      type: Boolean,
      default: false
    },
    label: {
      type: String,
      default: ''
    },

    mode: {
      type: String,
      default: ''
    },

    color: {
      type: String,
      default: ''
    },
    rules: {
      type: [Array, Object],
      default: () => (['Date'])
    }
  }
}
</script>

<style scoped>

</style>
