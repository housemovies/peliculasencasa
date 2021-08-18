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
      clearable
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
export default {
  name: 'LSelectAPi',
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
      options_list: [],
      options_data: []
    }
  },
  watch: {
    async url () {
      this.$emit('input', null)
      if (!this._.isNull(this.url)) await this.load()
    }
  },
  async mounted () {
    this.options_data = [...this.options]
    if (!this._.isNull(this.url)) await this.load()
    this.options_list = this.options_data
  },
  methods: {
    async load (val = null) {
      try {
        const data = await this.Get(this.url, { search: val })
        this.options_data = [...data]
      } catch ({ message }) {
        // console.log(message)
      }
    },
    async filterFn (val, update, abort) {
      update(async () => {
        const needle = val.toLocaleLowerCase()
        const temp = 'v.' + this.optionLabel
        if (!this._.isNull(this.url) && val !== '') {
          await this.load(val)
        }
        this.options_list = this.options_data.filter(v => {
          // eslint-disable-next-line no-eval
          return eval(temp).toLocaleLowerCase().indexOf(needle) > -1 || v.id === this.value
        })
      })
    }
  }
}
</script>
<style scoped>
</style>
