import { Dialog } from 'quasar'
export default {
  methods: {
    LConfim (title = '', message = '', callback) {
      Dialog.create({
        title: title,
        message: message,
        cancel: true,
        persistent: true
      }).onOk(callback)
    },
    LAlert (title = '', message = '', cancel = true, persistent = true) {
      Dialog.create({
        title: title,
        message: message,
        cancel: cancel,
        persistent: persistent
      }).onOk(() => {
        console.log('>>>> OK')
      }).onCancel(() => {
        console.log('>>>> Cancel')
      }).onDismiss(() => {
        console.log('I am triggered on both OK and Cancel')
      })
      // setTimeout(() => {
      //   dialog.hide()
      // }, 3000)
    },
    LPrompt (title = '', message = '', length = 10, callback) {
      this.$q.dialog({
        title: title,
        message: message,
        prompt: {
          model: '',
          type: 'text',
          isValid: val => val.length > length
        },
        cancel: true,
        persistent: true
      }).onOk(data => {
        callback(data)
      }).onCancel(() => {
        // console.log('>>>> Cancel')
      }).onDismiss(() => {
        // console.log('I am triggered on both OK and Cancel')
      })
    },
    LRadio (title = '', message = '', opc, callback) {
      this.$q.dialog({
        title: title,
        message: message,
        options: {
          type: 'radio',
          model: '1',
          // inline: true
          items: opc
        },
        cancel: true,
        persistent: true
      }).onOk(data => {
        callback(data)
      }).onCancel(() => {
        // console.log('>>>> Cancel')
      }).onDismiss(() => {
        // console.log('I am triggered on both OK and Cancel')
      })
    }
  }
}
