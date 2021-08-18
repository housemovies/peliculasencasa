<template>
    <q-btn :type="type"
      @click="$emit('click', $event)"
      :outline="outline"
      :rounded='rounded'
      :size="size"
      :color="color"
      :class="class_val"
      :icon="icono"
    > &nbsp; {{ label }} </q-btn>
</template>

<script>
export default {
  name: 'LBootton',
  props: {
    value: {
      type: [String, Number]
    },
    isPwd: {
      type: Boolean,
      default: false
    },
    outline: {
      type: Boolean,
      default: true
    },
    rounded: {
      type: Boolean,
      default: true
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
      default: 'full-width text-white'
    },
    size: {
      type: String,
      default: 'md'
    },
    color: {
      type: String,
      default: 'green-4'
    },
    type: {
      type: String,
      default: 'submit'
    },
    icono: {
      type: String,
      default: ''
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
