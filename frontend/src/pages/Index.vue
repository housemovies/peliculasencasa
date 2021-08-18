<template>

  <div class="q-pa-md">
    <div class="row q-pl-xl q-pr-xl q-pb-sm justify-center text-h6 text-white">
      Ultimas Peliculas
    </div>
    <q-carousel
      v-model="slide"
      transition-prev="slide-right"
      transition-next="slide-left"
      swipeable
      animated
      control-color="white"
      :autoplay="true"
      arrows
      height="260px"
      infinite
      style="background-color: rgba(0, 0, 0, 0.3);"
    > 
      <q-carousel-slide :name="1" >
        <div class="row items-start q-gutter-md justify-center">
          <q-card class="my-card col-xs-5 col-sm-2 col-md-2 col-lg-2 col-xl-2" v-for="(item, key) in top1" :key="key" v-ripple clickable @click="redirigir(item)" >
            <q-img :src="item.imagen" style="height: 230px;">
              <div class="text-h7 absolute-bottom text-right">
                {{item.titulo}}
              </div>
            </q-img>
          </q-card>
        </div>
      </q-carousel-slide>
     <q-carousel-slide :name="2" class="column no-wrap">
        <div class="row items-start q-gutter-md justify-center">
          <q-card class="my-card col-xs-5 col-sm-2 col-md-2 col-lg-2 col-xl-2" v-for="(item, key) in top2" :key="key" v-ripple clickable @click="redirigir(item)" >
            <q-img :src="item.imagen" style="height: 230px;">
              <div class="text-h7 absolute-bottom text-right">
                {{item.titulo}}
              </div>
            </q-img>
          </q-card>
        </div>
      </q-carousel-slide>
      <q-carousel-slide :name="3" class="column no-wrap">
        <div class="row items-start q-gutter-md justify-center">
          <q-card class="my-card col-xs-5 col-sm-2 col-md-2 col-lg-2 col-xl-2" v-for="(item, key) in top3" :key="key" v-ripple clickable @click="redirigir(item)" >
            <q-img :src="item.imagen" style="height: 230px;">
              <div class="text-h7 absolute-bottom text-right">
                {{item.titulo}}
              </div>
            </q-img>
          </q-card>
        </div>
      </q-carousel-slide> 
    </q-carousel>

    <div class="row q-pl-xl q-pr-xl q-pb-sm q-pt-sm justify-center text-h6 text-white">
      Mas Vistas
    </div>

    <div class="q-pa-md row items-start q-gutter-md justify-center">
      <q-card class="my-card col-xs-5 col-sm-2 col-md-2 col-lg-2 col-xl-2" v-for="(item, key) in vistas" :key="key" v-ripple clickable @click="redirigir(item)" >
        <q-img :src="item.imagen" style="height: 230px;">
          <div class="text-h7 absolute-bottom text-right">
            {{item.titulo}}
          </div>
        </q-img>
      </q-card>
    </div>
    <div class="q-pa-lg flex flex-center ">
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
  layout: 'main',
  name: 'PageIndex',
  data () {
    return { 
      pagina: 1,
      max_pagina: 1,
      slide: 1,
      top1: [],
      top2: [],
      top3: [],
      vistas: [],
    }
  },
  watch: {
    'pagina' (val) {
      this.getMasVistas(val)
    }
  },
  mounted () {
    this.$store.commit('head/texto', "Categorias")
    this.getUltimas()
    this.getMasVistas()
  },
  methods: {
    async getUltimas () {
      try {
        const data = await this.Get('principal/pelicula/ultimas')
        for(var i = 0;i<data.length;i++){
          if (i >= 0 && i < 5){
            this.top1.push(data[i])
          } else if (i >= 5 && i < 10) {
            this.top2.push(data[i])
          } else if (i >= 10 && i < 15) {
            this.top3.push(data[i])
          } 
        }
      } catch ({ message }) {
        console.error(message)
      }
    },
    async getMasVistas (pag = 1) {
      try {
        const data = await this.Get('principal/pelicula', { 'page': pag })      
        this.vistas = data.results
        this.max_pagina = Math.ceil(data.count / 20)
      } catch ({ message }) {
        console.error(message)
      }
    },
    redirigir (item) {
      this.$router.push({ name: item.ruta, params: { id: (item.id).toString() } })
    }
  }
}
</script>
