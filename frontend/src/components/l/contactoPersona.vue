<template>
<div class="col-12 row">
  <q-card class="my-card col-6">
     <q-card-section>
       <q-toolbar class="bg-primary text-white">
         <q-toolbar-title>Direcciones</q-toolbar-title>
         <q-btn flat round dense icon="add" @click="$refs.refModalDireccion.open()"/>
       </q-toolbar>
     </q-card-section>
     <q-card-section>
       <q-list bordered separator>
         <q-item :key="key" v-for="(data, key) in value.direcciones_tipos_personas">
           <q-item-section>{{ data.tipo }} | {{ data.descripcion }}</q-item-section>
              <q-btn
                flat
                round
                color="primary"
                icon="create"
                @click="editarAddres(data, key)"
              >
                <q-tooltip content-style="font-size: 16px" :offset="[10, 10]">
                  ELiminar Dirección
                </q-tooltip>
              </q-btn>
              <q-btn
                flat
                round
                color="primary"
                icon="delete_sweep"
                @click="deleteAddres(key)"
              >
                <q-tooltip content-style="font-size: 16px" :offset="[10, 10]">
                  Editar Dirección
                </q-tooltip>
              </q-btn>
         </q-item>
       </q-list>
     </q-card-section>
  </q-card>
  <q-card class="my-card col-6">
      <q-card-section>
      <q-toolbar class="bg-primary text-white">
        <q-toolbar-title>Télefonos</q-toolbar-title>
        <q-btn flat round dense icon="add" @click="$refs.refModalTelefono.open()"/>
      </q-toolbar>
      </q-card-section>
      <q-card-section>
      <q-list bordered separator>
        <q-item clickable v-ripple :key="key" v-for="(data, key) in value.telefonos_tipos_personas">
          <q-item-section>{{ data.tipo }} | {{ data.valor }}</q-item-section>
            <q-btn
              flat
              round
              color="primary"
              icon="create"
              @click="editarPhone(data, key)"
            >
              <q-tooltip content-style="font-size: 16px" :offset="[10, 10]">
                ELiminar Dirección
              </q-tooltip>
            </q-btn>
            <q-btn
              flat
              round
              color="primary"
              icon="delete_sweep"
              @click="deletePhone(key)"
            >
              <q-tooltip content-style="font-size: 16px" :offset="[10, 10]">
                Editar Teléfono
              </q-tooltip>
            </q-btn>
        </q-item>
      </q-list>
      </q-card-section>
  </q-card>
  <l-modal small ref="refModalDireccion">
    <template slot="title">
      <div class="text-h6">Direcciones de Contacto</div>
    </template>
    <div class="full-width row wrap justify-center items-center content-center q-col-gutter-sm">
      <l-select
        col="12"
        v-model="direccion.tipo_id"
        emit-value
        map-options
        option-value="id"
        option-label="nombre"
        :options="optionsTipoContact"
        label="Tipo de Dirección"
        :rules="[$rules.required($t('validator.required'))]"
      />
      <l-direccion
        col="12"
        v-model="direccion.descripcion"
        label="Dirección"
        :rules="[$rules.required($t('validator.required'))]"
      />
      <!-- <l-direccion v-model="direccion.descripcion" /> -->
    </div>
    <template slot="footer">
      <q-btn
        color="red"
        icon="highlight_off"
        label="Cancelar "
        @click="$refs.refModalDireccion.close()"
        style="padding-right: 7px;"
      />
      <q-btn
        color="primary"
        icon="check_circle_outline"
        label="Guardar"
        @click="addAdrees"
        style="margin-right: 20px;padding-right: 7px;"
      />
    </template>
  </l-modal>
  <l-modal small ref="refModalTelefono">
    <template slot="title">
      <div class="text-h6">Teléfonos de Contacto</div>
    </template>
    <div class="full-width row wrap justify-center items-center content-center q-col-gutter-sm">
      <l-select
        col="12"
        v-model="telefono.tipo_id"
        emit-value
        map-options
        option-value="id"
        option-label="nombre"
        :options="optionsTipoContact"
        label="Tipo de Télefono"
        :rules="[$rules.required($t('validator.required'))]"
      />
      <br>
      <l-input
        col="12"
        v-model="telefono.valor"
        label="Télefono"
        :rules="[$rules.required($t('validator.required'))]"
      />
    </div>
    <template slot="footer">
      <q-btn
        color="red"
        icon="highlight_off"
        label="Cancelar "
        @click="$refs.refModalTelefono.close()"
        style="padding-right: 7px;"
      />
      <q-btn
        color="primary"
        icon="check_circle_outline"
        label="Guardar"
        @click="addPhone"
        style="margin-right: 20px;padding-right: 7px;"
      />
    </template>
  </l-modal>
</div>
</template>
<script>
import { mapActions } from 'vuex'
export default {
  name: 'LContactoPersona',
  props: {
    size: {
      type: String,
      default: 'md'
    },
    value: {
      type: Object
    }
  },
  data () {
    return {
      keyEditing: false,
      direccion: {},
      telefono: {},
      optionsTipoContact: []
    }
  },
  mounted () {
    this.getTipoContacto()
  },
  methods: {
    ...mapActions('http', ['Post', 'Get']),
    async getTipoContacto () {
      try {
        this.optionsTipoContact = await this.Get({
          api: 'tercero/tipo_contacto'
        })
      } catch ({
        message
      }) {
        console.error(message)
      }
    },
    addAdrees () {
      if (undefined === this.direccion.tipo_id || undefined === this.direccion.descripcion) {
        return
      }
      // Para buscar el nombre del tipo de contacto segun el id
      this.direccion.tipo = this._.find(
        this.optionsTipoContact,
        ['id', this.direccion.tipo_id]
      ).nombre
      if (this.keyEditing === false) {
        this.value.direcciones_tipos_personas.push(this.direccion)
        this.direccion = {}
        this.$refs.refModalDireccion.close()
      } else {
        const val = this._.get(
          this.optionsTipoContact,
          this.keyEditing,
          false
        )
        console.log(val)
      }
    },
    addPhone () {
      if (undefined === this.telefono.tipo_id || undefined === this.telefono.valor) {
        return
      }
      // Para buscar el nombre del tipo de contacto segun el id
      this.telefono.tipo = this._.find(
        this.optionsTipoContact,
        ['id', this.telefono.tipo_id]
      ).nombre
      this.value.telefonos_tipos_personas.push(this.telefono)
      this.telefono = {}
      this.$refs.refModalTelefono.close()
    },
    deleteAddres (key) {
      this.value.direcciones_tipos_personas.splice(key, 1)
    },
    editarAddres (data, key) {
      this.keyEditing = key
      console.log(data)
      this.$refs.refModalDireccion.open()
      this.direccion = data
      console.log(this.direccion)
    },
    deletePhone (key) {
      this.value.telefonos_tipos_personas.splice(key, 1)
    },
    editarPhone (data, key) {
      this.keyEditing = key
      this.$refs.refModalTelefono.open()
      this.telefono = data
    }
  }
}
</script>
<style scoped>
</style>
