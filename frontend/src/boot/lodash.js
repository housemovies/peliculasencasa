// import something here
import lodash from 'lodash'
import Vue2Filters from 'vue2-filters'
export default async ({ Vue }) => {
  // something to do
  Vue.prototype._ = lodash
  Vue.use(Vue2Filters)
}
