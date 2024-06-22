import IntersectDirective from './intersect-directive';
import { ObjectPlugin, App } from '@vue/runtime-core';
declare global {
    interface Window {
        Vue: App | undefined;
    }
}
declare const VueIntersect: ObjectPlugin;
export { IntersectDirective };
export default VueIntersect;
