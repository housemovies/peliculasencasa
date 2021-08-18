<template>
  <div :class="`col-${col} ${class_val}`">
    <q-input dense
      outlined
      :bg-color="(['', null, undefined].includes(value)) ? 'blue-grey-2': '' "
      :value="value"
      @input="$emit('input',$event)"
      @keyup="$emit('keyup',$event)"
      @blur="$emit('blur',$event)"
      :label="label"
      :type="type"
      lazy-rules
      :rules="rules"
      :disable="disable"
      clearable
    />
  </div>
</template>

<script>
export default {
  name: 'LInput',
  props: {
    type: {
      type: String,
      default: 'text'
    },
    value: {
      type: [String, Number]
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
