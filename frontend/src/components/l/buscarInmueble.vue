<template>
<div class="col-1 text-center">
  <q-btn
    flat
    round
    dense
    @click="$refs.busquedaInmueble.open()"
    icon="apartment"
  />
  <l-modal medium ref="busquedaInmueble">
      <template slot="title">
        <div class="text-h6">Búsqueda avanzada de inmuebles</div>
      </template>
      <div class="full-width row wrap justify-center items-center content-center q-col-gutter-sm">
        <l-select
          col="4"
          v-model="modelComponent.ciudad"
          emit-value
          map-options
          option-value="id"
          option-label="nombre"
          :options="optionCiudades"
          label="Ciudad"
          :rules="[true]"
        />
        <l-select
          col="4"
          v-model="modelComponent.uso"
          emit-value
          map-options
          option-value="id"
          option-label="nombre"
          :options="optionUsos"
          label="Uso"
          :rules="[true]"
        />
        <l-select
          col="4"
          v-model="modelComponent.destino"
          emit-value
          map-options
          option-value="id"
          option-label="nombre"
          :options="optionDestinos"
          label="Destino"
          :rules="[true]"
        />
        <l-select
          col="4"
          v-model="modelComponent.tipo_inmueble"
          emit-value
          map-options
          option-value="id"
          option-label="nombre"
          :options="optionTiposInmuebles"
          label="Tipo Inmueble"
          :rules="[true]"
        />
        <l-select-api
          col="4"
          :url="`ubicacion/ciudades/${modelComponent.ciudad || 1}/select-zonas`"
          v-model="modelComponent.zona_id"
          emit-value
          map-options
          option-value="id"
          option-label="nombre"
          label="Zona"
          :rules="[true]"
        />
        <l-select-api
          col="4"
          :url="`ubicacion/zonas/${modelComponent.zona_id || 1}/select-barrios`"
          v-model="modelComponent.barrio_id"
          emit-value
          map-options
          option-value="id"
          option-label="nombre"
          label="Barrio"
          :rules="[true]"
        />
        <q-field v-if="dataTable.length > 0" class="col-12" filled  label="Direcciones Similares" stack-label>
          <template v-slot:control>
            <l-table
              :data_externo="dataTable"
              :columns="columns"
              :ocultar_titulo="true"
              :ocultar_bottom="true"
              :opciones="true"
              ancho="100%"
            >
              <template slot="opciones" slot-scope="{ row }">
                <div class="row">
                  <div class="col-1">
                      <q-btn flat round color="primary" icon="visibility" @click="selectedInmueble(row)" >
                        <q-tooltip content-style="font-size: 16px" :offset="[10, 10]">
                          Selecciona Inmueble
                        </q-tooltip>
                      </q-btn>
                  </div>
                </div>
              </template>
            </l-table>
          </template>
        </q-field>
      </div>
      <template slot="footer">
        <q-btn
          color="red"
          icon="highlight_off"
          label="Cancelar "
          @click="$refs.busquedaInmueble.close()"
          style="padding-right: 7px;"
        />
      </template>
    </l-modal>
</div>
</template>
<script>
import { mapActions } from 'vuex'
export default {
  name: 'LbuscarInmueble',
  props: {
    buscador: {
      type: Boolean,
      default: false
    },
    value: {
      type: Object
    }
  },
  data () {
    return {
      modelComponent: {},
      optionCiudades: [],
      optionUsos: [],
      optionDestinos: [],
      optionTiposInmuebles: [],
      dataTable: [],
      filters: {},
      columns: [
        {
          name: 'direccion',
          required: true,
          label: 'Dirección',
          align: 'left',
          field: row => row.direccion,
          sortable: true,
          classes: 'bg-grey-2 ellipsis',
          style: 'min-width: 200px',
          headerClasses: 'bg-primary text-white'
        },
        {
          name: 'canon',
          align: 'right',
          label: 'Canon',
          field: 'canon',
          sortable: true,
          format: (val, row) => this.$options.filters.currency(val, '$', 0)
        },
        {
          name: 'canon',
          align: 'right',
          label: 'Admon',
          field: 'admon',
          sortable: true,
          format: (val, row) => this.$options.filters.currency(val, '$', 0)
        }
      ]
    }
  },
  watch: {
    'modelComponent.ciudad' (val) {
      if (val !== '' && val !== null) {
        this.filters.ciudad_id = val
        this.getloadInmuebles()
      }
    },
    'modelComponent.uso' (val) {
      if (val !== '' && val !== null) {
        this.filters.destino_id = val
        this.getloadInmuebles()
      }
    },
    'modelComponent.destino' (val) {
      if (val !== '' && val !== null) {
        this.filters.uso_id = val
        this.getloadInmuebles()
      }
    },
    'modelComponent.tipo_inmueble' (val) {
      if (val !== '' && val !== null) {
        this.filters.tipo_inmueble_id = val
        this.getloadInmuebles()
      }
    },
    'modelComponent.barrio_id' (val) {
      if (val !== '' && val !== null) {
        this.filters.barrio_id = val
        this.getloadInmuebles()
      }
    }
  },
  mounted () {
    this.getCiudades()
    this.getTiposInmuebles()
    this.getUsos()
    this.getDestinos()
  },
  methods: {
    ...mapActions('http', ['Post', 'Get']),
    selectedInmueble (row) {
      const obj = {
        direccion: row.direccion,
        id: row.id
      }
      this.$emit('input', obj)
      this.$refs.busquedaInmueble.close()
    },
    async getCiudades () {
      try {
        this.optionCiudades = await this.Get({ api: 'ubicacion/ciudades' })
      } catch ({ message }) {
        console.error(message)
      }
    },
    async getDestinos () {
      try {
        this.optionDestinos = await this.Get({ api: 'inmueble/destinos' })
      } catch ({ message }) {
        console.error(message)
      }
    },
    async getUsos () {
      try {
        this.optionUsos = await this.Get({ api: 'inmueble/usos' })
      } catch ({ message }) {
        console.error(message)
      }
    },
    async getTiposInmuebles () {
      try {
        this.optionTiposInmuebles = await this.Get({ api: 'inmueble/tipoinmuebles' })
      } catch ({ message }) {
        console.error(message)
      }
    },
    async getloadInmuebles () {
      if (!this._.isEmpty(this.filters)) {
        const data = await this.Post({ api: 'inmueble/inmuebles/filterto', model: this.filters })
        if (data.status === 'false') {
          this.dataTable = []
          this.$forceUpdate()
        }
        this.dataTable = data
        this.$forceUpdate()
      }
    }
  }
}
</script>

<style scoped>

</style>
