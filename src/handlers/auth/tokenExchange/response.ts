import { Static, Type } from '@sinclair/typebox'

import { handlerUtils } from '@/utils/handler'

export const tokenExchangeResult = Type.Object(
    {
        bsg_jwt: Type.String(),
    },
    { $id: 'tokenExchangeResult' },
)

export const tokenExchangeResponse = handlerUtils.buildResponseSchema(tokenExchangeResult, 'tokenExchangeResponse')

export type TokenExchangeResult = Static<typeof tokenExchangeResult>

export type TokenExchangeResponse = Static<typeof tokenExchangeResponse>
