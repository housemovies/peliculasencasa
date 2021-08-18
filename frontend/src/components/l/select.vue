<template>
  <div :class="`col-${col} ${class_val}`">
    <q-select dense
      :bg-color="(['', null, undefined].includes(value)) ? 'blue-grey-2': '' "
      outlined
      :value="value"
      :options="options_list"
      emit-value
      map-options
      @input="$emit('input', $event)"
      :option-value="optionValue"
      :option-label="optionLabel"
      :label="label"
      use-input
      input-debounce="0"
      @filter="filterFn"
      :rules="rules"
      :disable="disable"
      hide-selected
      fill-input >
      <template v-slot:no-option>
        <q-item>
          <q-item-section class="text-grey">
            No Encontrado
          </q-item-section>
        </q-item>
      </template>
    </q-select>
  </div>
</template>

<script>
/* eslint-disable no-eval */
export default {
  name: 'LSelect',
  props: {
    options: {
      type: [Array],
      default: () => ([])
    },
    optionValue: {
      type: [String, Number],
      default: 'id'
    },
    optionLabel: {
      type: [String],
      default: 'nombre'
    },
    label: {
      type: [String],
      default: null
    },
    value: {
      type: [String, Number],
      default: null
    },
    col: {
      type: String,
      default: '12'
    },
    url: {
      type: String,
      default: null
    },
    class_val: {
      type: String,
      default: ''
    },
    rules: {
      type: [Array, Object],
      default: () => ([])
    },
    disable: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      options_list: []
    }
  },
  mounted () {
    this.options_list = this.options
  },
  methods: {
    filterFn (val, update, abort) {
      update(async () => {
        const needle = val.toLocaleLowerCase()
        const temp = 'v.' + this.optionLabel
        this.options_list = this.options.filter(v => {
          return eval(temp).toLocaleLowerCase().indexOf(needle) > -1
        })
      })
    }
  }
}
</script>
<style scoped>
</style>
