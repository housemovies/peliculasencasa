<template>
  <div >
    <q-tab-panels v-model="tab2" animated >
      <q-tab-panel class="q-pa-none" :name="item.servidor" v-for="(item, key) in pelicula.sp_pelicula" :key="key" >
        <div class="q-video" style="height: 500px;">
          <iframe :src="item.link" scrolling="no" frameborder="0" width="700" height="430" allowfullscreen="true" webkitallowfullscreen="true" mozallowfullscreen="true"></iframe>
        </div>  
      </q-tab-panel>
    </q-tab-panels>
    <q-tabs
      v-model="tab2"
      indicator-color="yellow"
      class="bg-yellow-12 text-black shadow-2"
    >
      <q-tab :name="item.servidor" icon="videocam" :label="item.servidor" v-for="(item, key) in pelicula.sp_pelicula" :key="key" />     
    </q-tabs>
    <div class="row q-pa-lg">

        <div class="col-xs-4 col-sm-3 col-md-3 col-lg-3 col-xl-3" >
          <q-img
            style="width: 165px;height: 230px"
            :ratio="1"
            class="rounded-borders gt-sm"
            :src="pelicula.imagen"
          />
          <q-img
            style="width: 125px;height: 190px"
            :ratio="1"
            class="rounded-borders sm"
            :src="pelicula.imagen"
          />
          <q-img
            style="width: 85px;height: 150px"
            :ratio="1"
            class="rounded-borders xs"
            :src="pelicula.imagen"
          />
        </div>
        <div class="col-xs-8 col-sm-9 col-md-9 col-lg-9 col-xl-9 text-white" >
          <div class="row">
            <div class="titu col-xs-12 col-sm-10 col-md-10 col-lg-10 col-xl-10 text-h4"  style="color: #FAECEC;">
              {{pelicula.titulo}}
            </div>
            <div class="col-2 text-subtitle2 gt-xs">
              <q-btn clickable  outline rounded  size="md" label="Triller" style="margin-left: 5px;color: #FAECEC;"  type="a" target="_blank" :href="pelicula.triller" />
            </div>
            <div class="titu col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 text-subtitle1" style="color: #FAECEC;">
              {{pelicula.subtitulo}}
            </div>
            <div class="titu col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 text-subtitle1" style="color: #FAECEC;">
              <label style="color: #E18585;" >Año: </label> {{pelicula.año}}  <label style="color: #E18585;" > -  Duración:</label> {{pelicula.duracion}}
            </div>
            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 text-subtitle2" style="color: #E18585;">
              {{pelicula.sinopsis}}
            </div>
            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 text-subtitle2" style="color: #FAECEC;">
              <label style="color: #E18585;" >Actores: </label> 
              {{pelicula.reparto}}
            </div>
             <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 text-subtitle2" style="color: #E18585;">
              <label style="color: #E18585;" >Generos: </label> 
              <q-btn v-for="(item, key) in pelicula.mp_pelicula" :key="key" clickable  outline rounded  color="white" size="sm" :label="item.menu.nombre" style="margin-left: 5px;"  @click="redirigir(item)" />
            </div>
          </div>         
        </div>
    </div>

  </div>
</template>

<script>
export default {
  name: 'pelicula',
  layout: 'peliculamain',
  data () {
    return { 
      pelicula: {},
      tab: 'sinopsis',
      splitterModel: 20,
      tab2: ''
    }
  },
  props: {
    id: {
      type: String,
      default: null
    }
  },
  mounted () {
    this.getPelicula()
  },
  methods: {
    async getPelicula () {
      try {
        this.pelicula = await this.Get('principal/pelicula/' + this.id)
        this.tab2 = this.pelicula.sp_pelicula[0].servidor
      } catch ({ message }) {
        console.error(message)
      }
    },
    redirigir (item) {
      this.$router.push({ name: item.menu.ruta, params: { id: (item.menu.id).toString() } })
    }
  }
}
</script>
