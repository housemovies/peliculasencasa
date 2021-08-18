<template>
  <q-list padding>
    <q-item v-for="(item, key) in modulos" :key="key" v-ripple clickable @click="activar(item)" >
      <q-item-section avatar>
        <q-icon color="grey" :name="item.icono" />
      </q-item-section>
      <q-item-section>
        <q-item-label>{{ item.nombre }}</q-item-label>
      </q-item-section>
    </q-item>
  </q-list>
</template>
<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Modulos',
  computed: {
    ...mapGetters('menu', ['modulos'])
  },
  methods: {
    activar (menu) {
      this.$emit('close')
      this.$router.push({ name: menu.ruta, params: { id: (menu.id).toString(), categoria: menu.nombre } })
    }
  }
}
</script>
