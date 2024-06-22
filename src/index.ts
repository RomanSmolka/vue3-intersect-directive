import createIntersectDirective, { IntersectDirective } from './intersect-directive'
import { ObjectPlugin, App } from '@vue/runtime-core'
import { IntersectOptions } from './Intersect'

declare global {
  interface Window {
    Vue: App | undefined
  }
}

const VueIntersect: ObjectPlugin = {
  install: (app: App, options: IntersectOptions) => {
    app.directive('intersect', createIntersectDirective(options))
  }
}

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(VueIntersect.install)
}

export { createIntersectDirective, IntersectDirective }
export default VueIntersect
