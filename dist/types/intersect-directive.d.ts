import { ObjectDirective } from '@vue/runtime-core';
import { IntersectOptions } from './Intersect';
export interface ObjectDirectiveWithOptions extends ObjectDirective {
    globalOptions?: IntersectOptions;
}
/**
 *
 */
declare const IntersectDirective: ObjectDirective;
declare const createIntersectDirective: (options: IntersectOptions) => ObjectDirectiveWithOptions;
export { IntersectDirective };
export default createIntersectDirective;
