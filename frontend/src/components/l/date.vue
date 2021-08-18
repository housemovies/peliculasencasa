<template>
  <div :class="`col-${col} ${class_val}`">
    <!-- <q-input outlined
      :value="value"
      @input="$emit('input',$event)"
      @keyup="$emit('keyup',$event)"
      :label="label"
      :type="type"
      lazy-rules
      :rules="rules"
      :disable="disable"
      clearable
    /> -->
    <q-input outlined :value="value" mask="date" :label="label" :rules="rules">
      <template v-slot:append>
        <q-icon name="event" class="cursor-pointer">
          <q-popup-proxy ref="qDateProxy" transition-show="scale" transition-hide="scale">
            <q-date :value="value" mask="YYYY-MM-DD" @input="$emit('input',$event)" />
          </q-popup-proxy>
        </q-icon>
      </template>
    </q-input>
  </div>
</template>

<script>
export default {
  name: 'LDate',
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
    rules: {
      type: [Array, Object],
      default: () => (['Date'])
    }
  }
}
</script>

<style scoped>

</style>
