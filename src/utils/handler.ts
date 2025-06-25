import { TObject, TRef, TSchema, Type } from '@sinclair/typebox'

import { SYS_CONSTANTS } from '@/constants/systemConstants'
import { fields } from '@/shared/schema/fields'

const messageSchema = Type.Optional(Type.String())
const flagSchema = fields.common.flag

const buildParamSchema = <T extends TSchema = TSchema>(requestSchema: T): T => {
    if (!requestSchema.$id) {
        throw new Error('Missing schema $id property')
    }
    Reflect.defineProperty(requestSchema, SYS_CONSTANTS.SCHEMA_SYMBOL, { value: true })
    return requestSchema
}

const buildQuerySchema = <T extends TSchema = TSchema>(requestSchema: T): T => {
    if (!requestSchema.$id) {
        throw new Error('Missing schema $id property')
    }
    Reflect.defineProperty(requestSchema, SYS_CONSTANTS.SCHEMA_SYMBOL, { value: true })
    return requestSchema
}

const buildRequestSchema = <T extends TSchema = TSchema>(requestSchema: T): T => {
    if (!requestSchema.$id) {
        throw new Error('Missing schema $id property')
    }
    Reflect.defineProperty(requestSchema, SYS_CONSTANTS.SCHEMA_SYMBOL, { value: true })
    return requestSchema
}

type DefaultResponse<T extends TSchema = TSchema> = TObject<{
    result: TRef<T>
    message: typeof messageSchema
    warning_flag: typeof flagSchema
}>

const buildResponseSchema = <T extends TSchema = TSchema>(resultSchema: T, $id: string): DefaultResponse<T> => {
    Reflect.defineProperty(resultSchema, SYS_CONSTANTS.SCHEMA_SYMBOL, { value: true })
    const responseSchema = Type.Object(
        {
            result: Type.Ref(resultSchema),
            message: messageSchema,
            warning_flag: flagSchema,
        },
        { $id: $id },
    )
    Reflect.defineProperty(responseSchema, SYS_CONSTANTS.SCHEMA_SYMBOL, { value: true })
    return responseSchema
}

export const handlerUtils = {
    buildParamSchema,
    buildQuerySchema,
    buildRequestSchema,
    buildResponseSchema,
}
