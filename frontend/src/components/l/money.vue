<template>
  <div :class="`col-${col} ${class_val}`">
    <q-field dense
      :bg-color="(['', null, undefined].includes(value)) ? 'blue-grey-2': '' "
      outlined
      :value="value"
      :label="label"
      @input="$emit('input',$event)"
      @keyup="$emit('keyup',$event)"
      lazy-rules
      :rules="rules"
      :disable="disable"
    >
      <template v-slot:control="{ id, floatingLabel, value, emitValue }">
        <money :id="id" class="q-field__input text-right" :value="value" @input="emitValue" v-bind="moneyFormatForDirective" v-show="floatingLabel" />
      </template>
    </q-field>
  </div>
</template>

<script>
export default {
  name: 'LMoney',
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
    disable: {
      type: Boolean,
      default: false
    },
    rules: {
      type: [Array, Object],
      default: () => ([])
    },
    prefijo: {
      type: String,
      default: '$ '
    },
    sufijo: {
      type: String,
      default: ''
    },
    precision: {
      type: Number,
      default: 2
    }
  },
  data () {
    return {
      moneyFormatForDirective: {
        decimal: ',',
        thousands: '.',
        prefix: this.prefijo,
        precision: this.precision,
        suffix: this.sufijo,
        masked: false
      }
    }
  }
}
</script>

<style scoped>

</style>
