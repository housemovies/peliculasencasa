<template>
<div class="q-pa-md">
  <div class="q-pa-md row items-start q-gutter-md justify-center">
    <q-card class="my-card col-xs-5 col-sm-2 col-md-2 col-lg-2 col-xl-2" v-for="(item, key) in listado" :key="key" v-ripple clickable @click="dirigir(item)" >
      <q-img :src="item.pelicula.imagen">
        <div class="text-h7 absolute-bottom text-right">
          {{item.pelicula.titulo}}
        </div>
      </q-img>
    </q-card>
  </div>
  <div class="q-pa-lg flex flex-center">
    <q-pagination
      v-model="pagina"
      :max="max_pagina"
      :input="true"
      color="white"
      input-class="text-white"
    />
  </div>
</div>
</template>

<script>
export default {
  name: 'index',
  layout: 'main',
  data () {
    return {
      pagina: 1,
      max_pagina: 1,
      listado: [] 
    }
  },
  props: {
    id: {
      type: String,
      default: null
    },
    categoria: {
      type: String,
      default: null
    }
  },
  watch: {
    'pagina' (val) {
      this.getPeliculas(val)
    }
  },
  mounted () {
    this.$store.commit('head/texto', 'Peliculas de '+this.categoria)
    this.getPeliculas()
  },
  methods: {
    async getPeliculas (pag = 1) {
      try {
        const data = await this.Get('principal/peliculas/' + this.id, { 'page': pag })
        this.listado = data.results
        this.max_pagina = Math.ceil(data.count / 20)
      } catch ({ message }) {
        console.error(message)
      }
    },
    async dirigir (item) {
      console.log(item)
      item.vistas = item.vistas + 1
      try {
        await this.Get(`principal/peliculas/vista_categoria/${item.id}`)
        this.$router.push({ name: item.pelicula.ruta, params: { id: (item.pelicula_id).toString() } })
        // console.log('guardo')
      } catch ({ message }) {
        console.error(message)
        this.$router.push({ name: item.pelicula.ruta, params: { id: (item.pelicula_id).toString() } })
      }
    }
  }
}
</script>
