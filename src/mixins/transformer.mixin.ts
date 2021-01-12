import { ExposeOptions, TransformOptions, TypeOptions } from 'class-transformer';

import {
    ExposePropertyDecorator,
    TransformFunction,
    TransformPropertyDecorator,
    TypeFunction,
    TypePropertyDecorator,
} from '../adapters';
import { BuilderClass } from '../interfaces';

export interface TransformerOptions {
    expose?: boolean;
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function withTransformer<B extends BuilderClass<TransformerOptions>>(Base: B) {
    return class ClassTransformerMixin extends Base {

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        constructor(...args: any[]) {
            super(...args);

            if (this.options.expose) {
                this.expose();
            }
        }

        /* Mark property as an exposed transformation target.
         *
         * Required if `class-transformer` is invoked with the `excludeExtraneousValues` option.
         */
        public expose(options?: ExposeOptions): this {
            this.add(ExposePropertyDecorator(options));
            return this;
        }

        /* Mark property as having a specific transformation.
         *
         * Required if `class-transformer` is invoked with the `excludeExtraneousValues` option.
         */
        public transform(transformFn: TransformFunction, options?: TransformOptions): this {
            this.add(TransformPropertyDecorator(transformFn, options));
            return this;
        }

        /* Mark property as having a specific type.
         *
         * Required if `class-transformer` is invoked with the `excludeExtraneousValues` option.
         */
        public type(typeFn: TypeFunction, options?: TypeOptions): this {
            this.add(TypePropertyDecorator(typeFn, options));
            return this;
        }
    };
}
