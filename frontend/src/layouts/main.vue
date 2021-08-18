<template>
  <div class="position-relative" :style="style">
    <div class="WAL" :style="`height: ${(control ? '300px;':'100px;')}`">
      <q-carousel
        animated
        v-model="slide"
        infinite
        :autoplay="autoplay"
        arrows
        transition-prev="slide-right"
        transition-next="slide-left"
        @mouseenter="autoplay = false"
        @mouseleave="autoplay = true"
        style="height: 550px;opacity: 0.9;"
      > 
        <q-carousel-slide  position="top" :name="key"  v-for="(item, key) in imagenes" :key="key"  :style="`background-image: linear-gradient(to bottom,rgba(0,0,0,0) 70%, #69140f 100%), url(${item.imagen_carousel})`"  >
          <div class="row" style="flex-wrap: initial;" @mouseover="ponerhoverh" >
            <div class="col-lg-2 col-xl-2 " >&nbsp;</div>
            <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3 col-xl-2 text-center" v-if="control == false" >
              <q-img
                src="~assets/logo128.png"
                style="height: 70px; max-width: 80px"
              >
                <template v-slot:loading>
                  <div class="text-yellow">
                    <q-spinner-ios />
                    <div class="q-mt-md">Loading...</div>
                  </div>
                </template>
              </q-img>
            </div>
            <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3 col-xl-2 text-center " v-else >
              <q-img
                src="~assets/logo256.png"
                style="height: 266px; max-width: 266px"
                class="gt-sm"
              >
                <template v-slot:loading>
                  <div class="text-yellow">
                    <q-spinner-ios />
                    <div class="q-mt-md">Loading...</div>
                  </div>
                </template>
              </q-img>
              <q-img
                src="~assets/logo192.png"
                style="height: 192px; max-width: 192px"
                class="sm"
              >
                <template v-slot:loading>
                  <div class="text-yellow">
                    <q-spinner-ios />
                    <div class="q-mt-md">Loading...</div>
                  </div>
                </template>
              </q-img>
              <q-img
                src="~assets/logo128.png"
                style="height: 128px; max-width: 128px"
                class="xs"
              >
                <template v-slot:loading>
                  <div class="text-yellow">
                    <q-spinner-ios />
                    <div class="q-mt-md">Loading...</div>
                  </div>
                </template>
              </q-img>
            </div>
            <div class="col-xs-9 col-sm-9 col-md-8 col-lg-6 col-xl-6 rounded-borders" style="background-color: rgba(0,0,0,0.7);" v-if="control" >
              <div class="titu col-6 col-sm-6  text-h3 q-pl-sm q-pa-md  text-white">
                {{item.titulo}}
              </div>
              <div class="col-6  text-subtitle1 q-pl-md  q-pb-md text-white ">
                <q-icon class="text-h6 q-pb-sm" color="white" name="theaters" /> {{item.año}} <q-icon class="text-h6 q-pb-sm" color="white" name="alarm" /> {{item.duracion}}
              </div>
              <div class="col-6  text-subtitle1 q-pl-md q-pb-md text-white " >
                <p id="puntos" style="height: 75px;">
                  {{item.sinopsis}}
                </p>
              </div>
              <div class="col-2 text-subtitle2 q-pl-md text-white">
                <q-btn clickable  outline rounded  color="white" size="md" label="Ver Pelicula" style="margin-left: 5px;"  type="a" target="_blank" @click="redirigir(item)" />
                <q-btn clickable  outline rounded  color="white" size="md" label="Ver Triller" style="margin-left: 5px;"  type="a" target="_blank"  :href="item.triller" />
              </div>
              <br>
            </div>
            <div class="col-xs-9 col-sm-9 col-md-8 col-lg-7 col-xl-6 rounded-borders" :style="`background-color: rgba(0,0,0,0.7);`" v-else >
              <div   class="text-h6 q-pl-sm q-pa-md  text-white">
                <div class="row">
                  <div class="titud col-xs-6 col-sm-5 col-md-7 col-lg-7 col-xl-6">
                    {{item.titulo}}
                  </div>
                  <div class="col-xs-6 col-sm-7 col-md-5 col-lg-5 col-xl-6">
                    <q-btn clickable  outline rounded  color="white" size="sm" label="Ver Pelicula" style="margin-left: 5px;"  type="a" target="_blank" @click="redirigir(item)" />
                    <q-btn clickable  outline rounded  color="white" size="sm" label="Ver Triller" style="margin-left: 5px;"  type="a" target="_blank" class="gt-sm"  :href="item.triller" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </q-carousel-slide>
      </q-carousel>
    </div>
    <q-layout  view="lHh Lpr lFf" class="WAL__layout shadow-9 q-mb-sm" :style="`height: ${(control ? '60%;':'84%;')};margin-bottom: 2%;`" container>
      <q-header elevated >
        <q-toolbar class="text-black row bg-yellow-12" >
          <div class="col-1">
            <q-btn v-if="leftDrawerOpen == true" round flat icon="close" class="WAL__drawer-close" @click="leftDrawerOpen = !leftDrawerOpen"  />
            <q-btn v-if="leftDrawerOpen == false" round flat icon="menu" class="q-mr-sm" @click="leftDrawerOpen = !leftDrawerOpen" />
          </div>
          <div class="col-7  text-h5 q-pl-sm">
            {{texto}}
          </div>
          <div class="col-4">
            <q-select
              rounded
              outlined
              dense
              v-model="search"
              use-input
              input-debounce="0"
              label="Bucar Pelicula"
              :options="options"
              @filter="filterFn"
              style="width: 250px"
              class="WAL__field full-width" bg-color="white"
            >
              <template slot="prepend">
                <q-icon name="search" />
              </template>
              <template v-slot:no-option>
                <q-item :name="key"  v-for="(item, key) in opciones" :key="key"  @click="redirigir(item)" clickable v-ripple style="background-color: #FFEE05;">
                  <q-item-section class="col-3" >
                    <q-avatar square  size="70px">
                      <img :src="`/media/${item.imagen}`">
                    </q-avatar>
                  </q-item-section>
                  <q-item-section top class="col-8" >
                    <div class="text-h6">
                      {{item.titulo}}
                    </div>
                    <div v-if="_.get(item,'subtitulo',false)" class="text-subtitle1">
                      {{item.subtitulo}}
                    </div>
                    <div class="text-subtitle1">
                      <q-icon class="text-h6 q-pb-sm" color="primary" name="theaters" /> {{item.año}} <q-icon class="text-h6 q-pb-sm" color="primary" name="alarm" /> {{item.duracion}}
                    </div>
                  </q-item-section>
                </q-item>
              </template>
            </q-select>
          </div>
        </q-toolbar>
      </q-header>

      <q-drawer
        v-model="leftDrawerOpen"
        bordered
        :breakpoint="690"
        content-style="background: rgba(0,0,0,0.7);"
        content-class="text-white"
      >
        <q-toolbar >
          <q-avatar class="cursor-pointer">
            <img src="~assets/logo128.png" />
            <!-- <q-img
              src="~assets/logo128.png"
              style="height: 128px; max-width: 128px"
              class="xs"
            >
              <template v-slot:loading>
                <div class="text-yellow">
                  <q-spinner-ios />
                  <div class="q-mt-md">Loading...</div>
                </div>
              </template>
            </q-img> -->
          </q-avatar>
          <div class="text-subtitle1 q-pl-md ">
            Categorias
          </div>
          <q-space />
        </q-toolbar>
        <q-scroll-area style="height: calc(100% - 100px)">
          <menu-modulos @close="leftDrawerOpen = false"/>
          
        </q-scroll-area>
      </q-drawer>

      <q-page-container @mouseover="ponerhoverb" style="background-color: rgba(0,0,0,0.7);">
        <router-view :key="$route.fullPath" />
      </q-page-container>

    </q-layout>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'MainLayout',
  middleware: 'guest',
  data () {
    return {
      leftDrawerOpen: false,
      links: [],
      left: false,
      right: false,
      search: '',
      message: '',
      slide: 1,
      autoplay: true,
      imagenes: [],
      options: [],
      opciones: [],
      posicion: 0, 
      posicionNueva : 0,
      control: true,
      url: 'https://placeimg.com/500/300/nature'
    }
  },
  computed: {
    ...mapGetters('menu', ['sub_menu_active']),
    ...mapGetters('head', ['texto']),
    style () {
      console.log(this.$q)
      return {
        height: this.$q.screen.height + 'px'
      }
    }
  },
  mounted () {
    this.getMenus()
    this.getImagenesMuestra()
  },
  methods: {
    ponerhoverh () {
      this.control = true
    },
    ponerhoverb () {
      this.control = false
    },
    async getMenus () {
      try {
        const data = await this.Get('principal/menus')
        this.$store.commit('menu/modulos', data)
      } catch ({ message }) {
        console.error(message)
      }
    },
    async getImagenesMuestra () {
      try {
        this.imagenes = await this.Get('principal/pelicula/carousel')
      } catch ({ message }) {
        console.error(message)
      }
    },
    redirigir (item) {
      this.$router.push({ name: item.ruta, params: { id: (item.id).toString() } })
    },
    async filterFn (val, update) {
      if (val.length > 0) {
        const opciones = {
            search: val
        }
        const data = await this.Get('principal/pelicula/select', opciones)
        this.opciones = data
        update(() => {
          this.options = []
        })
      }
    }
  }
}
</script>

<style lang="sass">

.q-drawer
  background: #69140f !important

p
  max-height: 75px;
  overflow: auto;
  line-height: 1.2rem;
  margin-bottom: 0rem;

.titu
  width: 95%;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;

.titud
  width: 55%;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;

::-webkit-scrollbar 
  display: none

.my-card
  height: 230px
  
.WAL
  width: 100%
  padding-bottom: 20px

  &:before
    content: ''
    height: 1270px
    position: fixed
    top: 0
    width: 100%
    background-color: #69140f


  &__layout
    margin: 0 auto
    z-index: 4000
    
    width: 90%
    max-width: 1124px
    border-radius: 5px
  &__field.q-field--outlined .q-field__control:before
    border: none
  .q-drawer--standard
    .WAL__drawer-close
      display: none
@media (max-width: 850px)
  .WAL
    padding: 0
    &__layout
      width: 100%
      border-radius: 0


@media (min-width: 691px)
  .WAL
    &__drawer-open
      display: none


.conversation__summary
  margin-top: 4px
.conversation__more
  margin-top: 0!important
  font-size: 1.4rem
</style>
