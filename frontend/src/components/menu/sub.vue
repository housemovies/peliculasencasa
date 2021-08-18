<template>
  <q-tabs shrink>
    <q-tab :label="item.nombre" v-for="(item, key) in sub_menu" :key="key" @click="activar(item)"/>
  </q-tabs>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'MenuSub',
  computed: {
    ...mapGetters('menu', ['sub_menu'])
  },
  methods: {
    activar (menu) {
      console.log(menu.ruta)
      this.$router.push({ name: menu.ruta })
      // this.$store.commit('menu/sub_menu', menu)
    }
  }
}
</script>

<style scoped>
</style>
