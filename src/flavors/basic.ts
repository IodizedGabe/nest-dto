/* Defines a basic set of decorators.
 */
import { createBuilder } from '../builder-factory';
import {
    BooleanOptions,
    DateOptions,
    EnumOptions,
    IntegerOptions,
    IsBooleanFactory,
    IsDateFactory,
    IsEnumFactory,
    IsIntegerFactory,
    IsNestedFactory,
    IsNumberFactory,
    IsStringFactory,
    IsUUIDFactory,
    NestedOptions,
    NumberOptions,
    StringOptions,
    UUIDOptions,
} from '../factories';
import {
    TransformerOptions,
    ValidatorOptions,
    withTransformer,
    withValidator,
} from '../mixins';

export interface MixinOptions extends TransformerOptions, ValidatorOptions {}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function createBuilderWithMixins<Options>() {
    return withTransformer(
        withValidator(
            createBuilder<Options>(),
        ),
    );
}

export const IsBoolean = IsBooleanFactory(createBuilderWithMixins<MixinOptions & BooleanOptions>());
export const IsDate = IsDateFactory(createBuilderWithMixins<MixinOptions & DateOptions>());
export const IsEnum = IsEnumFactory(createBuilderWithMixins<MixinOptions & EnumOptions>());
export const IsInteger = IsIntegerFactory(createBuilderWithMixins<MixinOptions & IntegerOptions>());
export const IsNested = IsNestedFactory(createBuilderWithMixins<MixinOptions & NestedOptions>());
export const IsNumber = IsNumberFactory(createBuilderWithMixins<MixinOptions & NumberOptions>());
export const IsString = IsStringFactory(createBuilderWithMixins<MixinOptions & StringOptions>());
export const IsUUID = IsUUIDFactory(createBuilderWithMixins<MixinOptions & UUIDOptions>());
