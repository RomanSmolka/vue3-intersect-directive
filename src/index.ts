import IntersectDirective from './intersect-directive'
import { ObjectPlugin, App } from '@vue/runtime-core'

declare global {
  interface Window {
    Vue: App | undefined
  }
}

const VueIntersect: ObjectPlugin = {
  install: (app: App) => {
    app.directive('intersect', IntersectDirective)
  }
}

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(VueIntersect.install)
}

export { IntersectDirective }
export default VueIntersect
