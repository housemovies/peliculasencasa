<template>
  <q-card :class="`col-${col} ${class_val}`"  flat bordered class="bg-grey-3">
    <q-item class="bg-primary text-white" >
      <q-item-section avatar>
        <div>{{titulo}}</div>
      </q-item-section>
      <slot  name="acciones"/>
    </q-item>
    <!-- <q-card-section class="bg-primary text-white">
      <div>{{titulo}}</div>
      <slot  name="acciones"/>
    </q-card-section> -->
    <q-separator />
    <q-card-section class="row justify-left  content-center q-col-gutter-sm">
      <slot />
    </q-card-section>
  </q-card>
</template>

<script>
export default {
  name: 'LCard',
  props: {
    col: {
      type: String,
      default: '12'
    },
    class_val: {
      type: String,
      default: ''
    },
    titulo: {
      type: String,
      default: ''
    }
  },
  data: () => ({
    fixed: false
  })
}
</script>

<style scoped>

</style>
