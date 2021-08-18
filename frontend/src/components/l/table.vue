<template>
  <div :class="`q-pa-md col-${col}`">
    <div :class="`col-${col} ${class_val}`">
      <q-intersection
        transition="flip-right"
        class="example-item"
      >
        <q-table
          class="my-sticky-header-column-table"
          :style="`max-width: ${ancho};max-height: ${alto} !important;`"
          :title="title"
          :data="data"
          :columns="columns"
          row-key="id"
          :pagination.sync="pagination"
          :loading="loading"
          :filter="filter"
          @request="onRequest"
          virtual-scroll
          :rows-per-page-options="[0]"
          :expanded.sync="expanded"
          :hide-header="ocultar_header"
          :hide-bottom="ocultar_bottom"
        >
          <template v-slot:top-right v-if="ocultar_titulo === false">
            <slot name="antesbuscar"  />
            <q-input borderless dense debounce="300" v-model="filter" placeholder="Buscar">
              <template v-slot:append>
                <q-icon name="search" />
              </template>
            </q-input>
          </template>
          <!-- HEADER DE LA TABLA  -->
          <template v-slot:header="props">
            <q-tr :props="props">
              <q-th v-if="detalle === true" auto-width /> <!-- ESTA ETIQUETA ES OBLIGATORIA CUANDO SE QUIERE QUE LA COLUMNA TENGA DEPLEGABLE   -->
              <q-th
                v-for="col in props.cols"
                :key="col.name"
                :props="props"
              >
                {{ col.label }}
              </q-th>
              <q-th v-if="opciones === true" auto-width > <!-- ESTA ETIQUETA ES OBLIGATORIA CUANDO SE QUIERE QUE LA FILA TENGA PARA OPCIONES   -->
                {{opciones_texto}}
              </q-th>
            </q-tr>
          </template>
          <!-- FINAL DEL HEADER DE LA TABLA  -->
          <!-- BODY DE LA TABLA  -->
          <template v-slot:body="props">
            <q-tr :props="props">
              <q-td auto-width v-if="detalle === true" >
                <q-btn size="sm" color="blue-9" round dense @click="props.expand = !props.expand" :icon="props.expand ? 'remove' : 'add'" /> <!-- ESTA ETIQUETA ES OBLIGATORIA CUANDO SE QUIERE QUE LA COLUMNA TENGA DEPLEGABLE   -->
              </q-td>

              <q-td
                v-for="col in props.cols"
                :key="col.name"
                :props="props"
              >
                {{ col.value }}
                <q-popup-edit v-if="col.edit_input" v-model="props.row[col.name]" :title="col.label" buttons>
                  <q-input v-model="props.row[col.name]" dense autofocus counter />
                </q-popup-edit>
                <q-popup-edit v-if="col.edit_money" v-model="props.row[col.name]" :title="col.label" buttons>
                  <l-money col="3" v-model="props.row[col.name]"  :danse="true"  />
                </q-popup-edit>
                <q-popup-edit v-if="col.edit_number" v-model="props.row[col.name]" :title="col.label" buttons>
                  <q-input type="number" v-model="props.row[col.name]" dense autofocus counter />
                </q-popup-edit>
              </q-td>
              <q-td auto-width v-if="opciones === true" ><!-- ESTA ETIQUETA ES OBLIGATORIA CUANDO SE QUIERE QUE LA FILA TENGA PARA OPCIONES   -->
                <slot name="opciones"  v-bind:row="props.row" />
              </q-td>
            </q-tr>
            <q-tr v-show="props.expand" :props="props" v-if="detalle === true" >
              <q-td colspan="100%">
                <slot name="detalle"  v-bind:row="props.row" />
              </q-td>
            </q-tr>
          </template>
          <!-- FINAL DEL BODY DE LA TABLA  -->
        </q-table>
      </q-intersection>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: 'LTable',
  props: {
    col: {
      type: String,
      default: '12'
    },
    title: {
      type: String,
      default: ''
    },
    class_val: {
      type: String,
      default: ''
    },
    columns: {
      type: [Array, Object],
      default: () => ([])
    },
    data_externo: {
      type: [Array, Object],
      default: () => ([])
    },
    ruta: {
      type: String,
      default: ''
    },
    ancho: {
      type: String,
      default: '100%'
    },
    alto: {
      type: String,
      default: '100%'
    },
    detalle: {
      type: Boolean,
      default: false
    },
    opciones: {
      type: Boolean,
      default: false
    },
    opciones_texto: {
      type: String,
      default: 'Acciones'
    },
    ocultar_bottom: {
      type: Boolean,
      default: false
    },
    ocultar_header: {
      type: Boolean,
      default: false
    },
    ocultar_titulo: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      model: {},
      filter: '',
      loading: false,
      pagination: {
        sortBy: 'desc',
        descending: false,
        page: 1,
        rowsPerPage: 10,
        rowsNumber: 10
      },
      data: [],
      original: [],
      expanded: [ // Array of row keys
        'carlos david quintero ramirez'
      ]
    }
  },
  mounted () {
    if (this.data_externo.length === 0) {
      this.getLoad()
    } else {
      this.data = this.data_externo
    }
  },
  methods: {
    ...mapActions('http', ['Post', 'Get']),
    async getLoad () {
      try {
        const data = await this.Get({ api: this.ruta })
        this.data = data.results
        this.pagination.rowsNumber = data.count
      } catch ({ message }) {
        console.log(message)
      }
    },
    async onRequest (props) {
      if (this.data_externo.length === 0) {
        const filter = props.filter
        const { page } = props.pagination
        const opciones = {
          page: page,
          search: filter
        }
        const data = await this.Get({ api: this.ruta, params: opciones })
        this.data = data.results
        this.pagination.rowsNumber = data.count
        this.pagination.page = page
        this.pagination.rowsPerPage = 10
        this.loading = false
      } else {

      }
    }
  }
}
</script>

<style lang="sass">
.my-sticky-header-column-table
  /* height or max-height is important */
  height: 100%

  /* specifying max-width so the example can
    highlight the sticky column on any browser window */
  max-width: 100%

  td:first-child
    /* bg color is important for td; just specify one */
    background-color: #f5f5f5 !important

  tr th
    position: sticky
    /* higher than z-index for td below */
    z-index: 2
    /* bg color is important; just specify one */
    background: #f5f5f5

  /* this will be the loading indicator */
  thead tr:last-child th
    /* height of all previous header rows */
    top: 48px
    /* highest z-index */
    z-index: 3
  thead tr:first-child th
    top: 0
    z-index: 1
  tr:first-child th:first-child
    /* highest z-index */
    z-index: 3

  td:first-child
    z-index: 1

  td:first-child, th:first-child
    position: sticky
    left: 0
</style>
