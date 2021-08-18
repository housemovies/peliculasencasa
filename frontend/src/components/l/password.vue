<template>
  <div :class="`col-${col} ${class_val}`">
    <q-input outlined :value="value" @input="$emit('input',$event)" :label="label" :type="isPwd ? 'password' : 'text'" lazy-rules :rules="rules">
      <template v-slot:append>
        <q-icon :name="isPwd ? 'visibility_off' : 'visibility'" class="cursor-pointer" @click="isPwd = !isPwd" />
      </template>
    </q-input>
  </div>
</template>

<script>
export default {
  name: 'LPassword',
  props: {
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
    rules: {
      type: [Array, Object],
      default: () => ([])
    }
  },
  data () {
    return {
      isPwd: true
    }
  }
}

</script>

<style scoped>

</style>
