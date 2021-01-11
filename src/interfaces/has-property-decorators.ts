/* Something that contains a collection of PropertyDecorator.
 *
 * Allows mixins to require their own decorators.
 */
export interface HasPropertyDecorators {
    add(decorator: PropertyDecorator): this;
}