import fastifyAuth, { FastifyAuthFunction } from '@fastify/auth'
import { ROLE } from '@prisma/client/index'
import { FastifyInstance, FastifyPluginOptions } from 'fastify'
import fs from 'fastify-plugin'

import { JWTPayload } from '@/shared/model/JWTPayload'

declare module 'fastify' {
    interface FastifyInstance {
        verifyRO: FastifyAuthFunction
        verifyRW: FastifyAuthFunction
    }
}

const buildAuthFunction = (role: ROLE): FastifyAuthFunction => {
    const authFunction: FastifyAuthFunction = function (request, _reply, done: CallableFunction) {
        try {
            const jwtString = request.cookies.jwt ?? ''
            const incomingPayload = this.jwt.verify(jwtString).valueOf() as JWTPayload
            if (incomingPayload.user.role !== role) {
                throw this.httpErrors.forbidden('Not enough permission.')
            }
            done()
        } catch (error) {
            done(error)
        }
    }
    return authFunction
}

const verifyAdmin: FastifyAuthFunction = buildAuthFunction(ROLE.ADMIN)
const verifyUser: FastifyAuthFunction = buildAuthFunction(ROLE.USER)

export default fs(function (server: FastifyInstance, options: FastifyPluginOptions, done: CallableFunction) {
    server.decorate('verifyAdmin', verifyAdmin)
    server.decorate('verifyUser', verifyUser)
    server.register(fastifyAuth, options)
    done()
})
