<template>
  <q-dialog v-model="fixed" :full-width="fullWidth">
    <q-card
      :style="style">
      <q-card-section class="bg-primary text-white">
        <slot name="title">
          <div class="text-h6">{{ $t('software') }}</div>
        </slot>
      </q-card-section>

      <q-separator/>

      <q-card-section :style="`max-height:  ${maxheight} `" class="scroll">
        <slot/>
      </q-card-section>

      <q-separator/>

      <q-card-actions align="right">
        <slot name="footer"/>
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
export default {
  name: 'LModal',
  props: {
    small: {
      type: Boolean,
      default: false
    },
    medium: {
      type: Boolean,
      default: false
    },
    fullWidth: {
      type: Boolean,
      default: false
    },
    maxheight: {
      type: String,
      default: '50vh'
    }
  },
  data: () => ({
    fixed: false
  }),
  computed: {
    style () {
      if (this.small) return { width: '300px' }
      if (this.medium) return { width: '700px', 'max-width': '80vw' }
      return { width: '512px' }
    }
  },
  methods: {
    toggle () {
      this.fixed = !this.fixed
    },
    open () {
      this.fixed = true
    },
    close () {
      this.fixed = false
    }
  }
}
</script>

<style scoped>

</style>
