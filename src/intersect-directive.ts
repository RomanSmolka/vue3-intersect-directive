import { ObjectDirective, DirectiveHook, DirectiveBinding, VNode } from '@vue/runtime-core'
import Intersect from './Intersect'

const intersectMap: Map<HTMLElement, Intersect> = new Map<HTMLElement, Intersect>()

/**
 *
 */
const beforeMount: DirectiveHook = (el: HTMLElement, binding: DirectiveBinding) => {
  const intersect: Intersect = new Intersect()
  intersectMap.set(el, intersect)
  intersect.bind(el, binding)
}

/**
 *
 */
const unmounted: DirectiveHook = (el: HTMLElement, binding: DirectiveBinding) => {
  const intersect: Intersect | undefined = intersectMap.get(el)
  if (intersect) {
    intersect.unbind(el, binding)
  }
}

/**
 *
 */
const IntersectDirective: ObjectDirective = {
  beforeMount,
  unmounted,
  getSSRProps: () => ({}) // for nuxt
}

export default IntersectDirective
