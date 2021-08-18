// import something here
import VueMask from 'v-mask'
import money from 'v-money'
export default async ({ Vue }) => {
  // something to do
  Vue.use(VueMask)
  Vue.use(money, { precision: 4 })
}
