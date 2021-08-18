<template>
  <div :class="`col-${col} ${class_val}`">
    <q-checkbox
      :value="value"
      @input="$emit('input',$event)"
      @keyup="$emit('keyup',$event)"
      :label="label"
      :rules="rules"
      :disable="disable"
    />
  </div>
</template>

<script>
export default {
  name: 'LCheckbox',
  props: {
    type: {
      type: String,
      default: 'text'
    },
    value: {
      type: Boolean,
      default: false
    },
    col: {
      type: String,
      default: '12'
    },
    label: {
      type: String,
      default: ''
    },
    class_val: {
      type: String,
      default: ''
    },
    disable: {
      type: Boolean,
      default: false
    },
    rules: {
      type: [Array, Object],
      default: () => ([])
    }
  }
}
</script>

<style scoped>

</style>
