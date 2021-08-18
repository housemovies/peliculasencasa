<template>
  <q-tabs shrink>
    <q-tab :label="item.nombre" v-for="(item, key) in menu" :key="key" @click="activar(item)"/>
  </q-tabs>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'MenuItem',
  computed: {
    ...mapGetters('menu', ['menu'])
  },
  methods: {
    activar (menu) {
      if (menu.sub_menu.length === 0) {
        this.$router.push({ name: menu.ruta })
      }
      this.$store.commit('menu/sub_menu', menu.sub_menu)
    }
  }
}
</script>

<style scoped>
</style>
