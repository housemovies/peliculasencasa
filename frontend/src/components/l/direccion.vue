<template>
<div :class="`col-${col} ${class_val}`" >
  <q-input
    dense
    :bg-color="(['', null, undefined].includes(direccion.completa)) ? 'blue-grey-2': '' "
    v-model="direccion.completa"
    outlined
    readonly
    :rules="[true]"
    label="Dirección"
  >
    <template v-slot:append>
      <q-icon name="pin_drop" @click="$refs.crearDireccion.open()"/>
    </template>
  </q-input>
  <l-modal fullWidth ref="crearDireccion">
      <template slot="title">
        <div class="text-h6">Generador de Direcciones</div>
      </template>
      <div class="full-width row wrap justify-center items-center content-center q-col-gutter-sm">
        <l-select
          col="3"
          v-model="direccion.tipo"
          emit-value
          map-options
          option-value="nombre"
          option-label="nombre"
          :options="tipos_vias"
          label="Tipo Via"
          ref="ref_direccion"
          :rules="[]"
        />
        <l-input
          col="2"
          v-model="direccion.via"
          label="via"
          :rules="[]"
          @keyup="generar_direccion"
        />
        <l-input
          col="2"
          v-model="direccion.numerouno"
          label="#"
          :rules="[]"
          @keyup="generar_direccion"
        />
        <l-input
          col="2"
          v-model="direccion.numerodos"
          label="-"
          :rules="[]"
          @keyup="generar_direccion"
        />
        <l-input
          col="3"
          v-model="direccion.indicacion"
          label="Indicación"
          :rules="[]"
          @keyup="generar_direccion"
        />
        <l-input
          col="12"
          v-model="direccion.completa"
          label="Dirección Completa"
          :rules="[]"
          :disable="true"
        />
        <q-field v-if="data.length > 0 && buscador" class="col-12" filled  label="Direcciones Similares" stack-label>
          <template v-slot:control>
            <l-table
              :data_externo="data"
              :columns="columns"
              :ocultar_titulo="true"
              :ocultar_bottom="true"
              :opciones="true"
              ancho="100%"
            >
              <template slot="opciones" slot-scope="{ row }">
                <div class="row">
                  <div class="col-1">
                    <q-btn flat round color="primary" icon="visibility" @click="$router.push({ name: 'ProspectosEditar',  params: { id: (row.id).toString() } })" >
                      <q-tooltip content-style="font-size: 16px" :offset="[10, 10]">
                        Ver Inmueble
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
        <q-btn color="red" icon="highlight_off" label="Cancelar " @click="$refs.crearDireccion.close()" style="padding-right: 7px;"  />
        <q-btn color="primary" icon="check_circle_outline" label="Generar" @click="finalizar" style="margin-right: 20px;padding-right: 7px;" />
      </template>
    </l-modal>
</div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: 'LDireccion',
  props: {
    col: {
      type: String,
      default: '12'
    },
    class_val: {
      type: String,
      default: ''
    },
    buscador: {
      type: Boolean,
      default: false
    },
    value: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      direccion: {},
      tipos_vias: [],
      data: [],
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
          name: 'Canon',
          required: true,
          label: 'Canon',
          align: 'left',
          field: row => row.canon,
          sortable: true
        },
        {
          name: 'admon',
          required: true,
          label: 'Admon',
          align: 'left',
          field: row => row.admon,
          sortable: true
        }
      ]
    }
  },
  watch: {
    'value' (val) {
      if (val !== '' && val !== null) {
        this.editar_direccion(val)
      }
    }
  },
  // computed: {
  //   direccionC () {
  //     console.log('aca tambien ', this.value)
  //     let temp = ''
  //     if (this.value == '') {
  //     } else {
  //       this.editar_direccion(this.value)
  //     }
  //     return temp
  //   }
  // },
  mounted () {
    this.getRecursos()
    console.log(this.value)
    // if (this.value !== '') {
    //   this.editar_direccion(this.value)
    // }
  },
  methods: {
    ...mapActions('http', ['Post', 'Get']),
    generar_direccion () {
      let temp = ''
      if (this._.get(this.direccion, 'tipo', false)) temp = `${temp}${this._.get(this.direccion, 'tipo', '')}`
      if (this._.get(this.direccion, 'via', false)) temp = `${temp} ${this._.get(this.direccion, 'via', '')}`
      if (this._.get(this.direccion, 'numerouno', false)) temp = `${temp} # ${this._.get(this.direccion, 'numerouno', '')}`
      if (this._.get(this.direccion, 'numerodos', false)) temp = `${temp} - ${this._.get(this.direccion, 'numerodos', '')}`
      if (this._.get(this.direccion, 'indicacion', false)) temp = `${temp} ${this._.get(this.direccion, 'indicacion', '')}`
      this.direccion.completa = temp
      this.getloadInmuebles(temp)
    },
    async getRecursos () {
      try {
        this.tipos_vias = await this.Get({ api: 'inmueble/tipovias' })
      } catch ({ message }) {
        console.error(message)
      }
    },
    editar_direccion (direccion) {
      var dir = direccion.toUpperCase().split(' ')
      console.log('editar direccion', dir)
      this.direccion.tipo = (dir[0] === undefined ? '' : dir[0])
      this.direccion.via = (dir[1] === undefined ? '' : dir[1])
      if (dir[2] === '#') {
        var dir2 = direccion.split('#')
        dir2 = dir2[1].split('-')
        this.direccion.numerouno = (dir2[0] === undefined ? '' : dir2[0])
        dir2 = dir2[1].split(' ')
        this.direccion.numerodos = (dir2[1] === undefined ? '' : dir2[1])
        this.direccion.indicacion = ''
        for (var index = 2; index < dir2.length; index++) {
          this.direccion.indicacion += (dir2[index] === undefined ? '' : dir2[index]) + ' '
        }
      } else {
        this.direccion.numerouno = (dir[2] === undefined ? '' : dir[2])
        this.direccion.numerodos = (dir[3] === undefined ? '' : dir[3])
        this.direccion.indicacion = ''
        for (var index2 = 4; index < dir.length; index2++) {
          this.direccion.indicacion += (dir[index2] === undefined ? '' : dir[index2]) + ' '
        }
      }
      this.$forceUpdate()
    },
    async getloadInmuebles (direccion) {
      if (!this._.isEmpty(this.direccion)) {
        const opciones = {
          search: direccion
        }
        const data = await this.Get({ api: 'inmueble/inmuebles', params: opciones })
        this.data = data.results
      }
    },
    finalizar () {
      this.$emit('input', this.direccion.completa)
      this.$refs.crearDireccion.close()
    }
  }
}
</script>

<style scoped>

</style>
