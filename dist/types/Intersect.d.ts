import { DirectiveBinding } from '@vue/runtime-core';
type StyleOptions = string[] | {
    [prop: string]: any;
};
interface IntersectOptions {
    observerOptions?: IntersectionObserverInit;
    true?: StyleOptions;
    false?: StyleOptions;
    onChange?: IntersectChangeHandler;
    disposeWhen?: boolean;
}
type IntersectChangeHandler = (isInterSecting: boolean, el: HTMLElement, options: IntersectOptions) => any;
export default class Intersect {
    protected interSectionObserver: IntersectionObserver;
    protected el: HTMLElement;
    protected options: IntersectOptions;
    protected callback: IntersectChangeHandler;
    /**
     *
     */
    bind(el: HTMLElement, binding: DirectiveBinding): Promise<void>;
    /**
     *
     */
    unbind(el: HTMLElement, binding?: DirectiveBinding): void;
    /**
     *
     */
    protected onIntersectChange(entries: IntersectionObserverEntry[], observer: IntersectionObserver): void;
    /**
     *
     */
    protected addStyleOptions(options: StyleOptions): void;
    /**
     *
     */
    protected removeStyleOptions(options: StyleOptions): void;
}
export {};
