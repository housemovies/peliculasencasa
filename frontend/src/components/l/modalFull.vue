<template>
  <div class="q-pa-md q-gutter-sm">
    <q-dialog v-model="fixed" :maximized="true">
      <q-card>
        <q-card-section>
          <div class="text-h6">
            <slot name="title">
              <div class="text-h6">{{ $t('software') }}</div>
            </slot>
          </div>
        </q-card-section>

        <q-separator />

        <q-card-section style="max-height: 80vh" class="scroll">
          <slot/>
        </q-card-section>

        <q-separator />

        <q-card-actions align="right">
          <slot name="footer"/>
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>
<script>
export default {
  name: 'LModalFull',
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
    }
  },
  data: () => ({
    dialog: false,
    maximizedToggle: true,
    basic: false,
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
