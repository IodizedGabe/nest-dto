import { IsEnum } from 'class-validator';
import 'reflect-metadata';

import { Builder } from '../builder';
import { EnumOptions, Initializer } from '../interfaces';
import { buildArrayPropertyDecorators } from './is-array.recipe';

export function IsEnumRecipe<Options>(
    initializers: Initializer<Options>[],
): (options: Options & EnumOptions) => PropertyDecorator {
    return (
        options: Options & EnumOptions,
    ): PropertyDecorator => new Builder({
        ...options,

        /* While @nestjs/swagger can implement enums without an explicit `enumName`, it will
         * not detect that the same enum is used in multiplace API locations unless a consistent
         * `enumName` is used.
         */
        enum: options.enum,
        enumName: options.enumName,
    }, initializers).add(
        ...buildArrayPropertyDecorators(options.isArray),

        // validate data as an enum
        IsEnum(options.enum, { each: !!options.isArray }),
    ).build();
}
