import { IsUUID } from 'class-validator';

import { Builder } from '../builder';
import { Initializer, UUIDOptions } from '../interfaces';
import { buildArrayPropertyDecorators } from './is-array.recipe';

export function IsUUIDRecipe<Options>(
    initializers: Initializer<Options>[],
): (options?: Options & UUIDOptions) => PropertyDecorator {
    return (
        options: Options & UUIDOptions = {} as Options & UUIDOptions,
    ): PropertyDecorator => new Builder({
        ...options,

        // OpenAPI expresses UUID as a string format
        type: 'string',
        format: 'uuid',
    }, initializers).add(
        ...buildArrayPropertyDecorators(options.isArray),

        // validate data as a string
        IsUUID(options?.version, { each: !!options.isArray }),
    ).build();
}
