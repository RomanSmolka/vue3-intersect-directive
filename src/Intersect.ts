import { DirectiveBinding } from '@vue/runtime-core'
import { nextTick } from 'vue'
import { ObjectDirectiveWithOptions } from './intersect-directive'

type StyleOptions = string | string[] | { [prop: string]: any }

export interface IntersectOptions {
  observerOptions?: IntersectionObserverInit
  true?: StyleOptions
  false?: StyleOptions
  onChange?: IntersectChangeHandler
  disposeWhen?: boolean
}

type IntersectChangeHandler = (isInterSecting: boolean, el: HTMLElement, options: IntersectOptions) => any

// --------------------------------------------------------------------------
// Intersect
// --------------------------------------------------------------------------
export default class Intersect {
  protected interSectionObserver!: IntersectionObserver
  protected el!: HTMLElement
  protected options!: IntersectOptions
  protected callback!: IntersectChangeHandler

  /**
   *
   */
  public async bind(el: HTMLElement, binding: DirectiveBinding) {
    await nextTick()
    //
    const globalOptions: IntersectOptions = (binding.dir as ObjectDirectiveWithOptions).globalOptions || {}
    const observerOptions: IntersectionObserverInit = { ...binding.value?.observerOptions }

    this.interSectionObserver = new IntersectionObserver(this.onIntersectChange.bind(this), observerOptions)
    this.interSectionObserver.observe(el)
    //
    this.el = el


    this.options = {
      true: binding.value?.true || globalOptions?.true,
      false: binding.value?.false || globalOptions?.false,
      disposeWhen: binding.value?.disposeWhen || globalOptions?.disposeWhen,
    }
    this.callback = binding.value?.onChange || globalOptions?.onChange
  }

  /**
   *
   */
  public unbind(el: HTMLElement, binding?: DirectiveBinding) {
    if (this.interSectionObserver) {
      this.interSectionObserver.unobserve(el)
    }
  }

  /**
   *
   */
  protected onIntersectChange(entries: IntersectionObserverEntry[], observer: IntersectionObserver): void {
    const entry: IntersectionObserverEntry = entries[0]
    if (!entry) return
    //
    if (entry.isIntersecting) {
      if (this.options.true) this.addStyleOptions(this.options.true)
      if (this.options.false) this.removeStyleOptions(this.options.false)
    } else {
      if (this.options.true) this.removeStyleOptions(this.options.true)
      if (this.options.false) this.addStyleOptions(this.options.false)
    }
    //
    if (this.callback) {
      this.callback(entry.isIntersecting, this.el, this.options)
    }
    //
    if (this.options.disposeWhen !== undefined) {
      const shouldDispose: boolean = entry.isIntersecting === this.options.disposeWhen
      if (shouldDispose) this.unbind(this.el)
    }
  }

  /**
   *
   */
  protected addStyleOptions(options: StyleOptions): void {
    // Classes array
    if (Array.isArray(options)) {
      this.el.classList.add(...options)
    }
    // Single class
    else if (typeof options === 'string') {
      this.el.classList.add(options)
    }
    else {
      for (const prop of Object.keys(options)) {
        // Custom attribute
        if (prop === 'attr') {
          this.el.setAttribute(options[prop], '')
        }
        // Inline style
        else {
          this.el.style[prop as any] = options[prop]
        }
      }
    }
  }

  /**
   *
   */
  protected removeStyleOptions(options: StyleOptions): void {
    // Classes array
    if (Array.isArray(options)) {
      this.el.classList.remove(...options)
    }
    // Single class
    else if (typeof options === 'string') {
      this.el.classList.remove(options)
    }
    else {
      for (const prop of Object.keys(options)) {
        // Custom attribute
        if (prop === 'attr') {
          this.el.removeAttribute(options[prop])
        }
        // Inline style
        else {
          this.el.style.removeProperty(prop)
        }
      }
    }
  }

}
