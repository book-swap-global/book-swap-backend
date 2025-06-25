import { FastifyInstance } from 'fastify'
import fs from 'fastify-plugin'

import { tokenExchangeHandler } from '@/handlers/auth/tokenExchange/handler'
import { tokenExchangeSchema } from '@/handlers/auth/tokenExchange/schema'

const rootRoute = '/auth'

// Router plugin
export default fs(async function (server: FastifyInstance) {
    // token-exchange
    server.post(`${rootRoute}/token-exchange`, { schema: tokenExchangeSchema }, tokenExchangeHandler)
})
