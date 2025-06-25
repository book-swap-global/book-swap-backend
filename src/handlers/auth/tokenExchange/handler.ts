import { HttpErrors } from '@fastify/sensible/lib/httpError'
import { FLAG } from '@prisma/client'
import { RouteHandlerMethod } from 'fastify'
import { DecodedIdToken } from 'firebase-admin/auth'
import { StatusCodes } from 'http-status-codes'

import { JWTPayload } from '@/shared/model/JWTPayload'
import { dbUtils } from '@/utils/dbUtils'
import { firebaseAdmin } from '@/utils/firebase'

import { TokenExchangeResponse, TokenExchangeResult } from './response'

export const tokenExchangeHandler: RouteHandlerMethod = async function (request, reply): Promise<TokenExchangeResponse | HttpErrors['HttpError']> {
    const firebase_jwt = request.headers['firebase-jwt'] as string
    let decodedToken: DecodedIdToken

    // verify firebase jwt
    try {
        decodedToken = await firebaseAdmin.auth().verifyIdToken(firebase_jwt)
    } catch (e) {
        if (e instanceof Error) {
            return this.httpErrors.unauthorized(e.message)
        }
        return this.httpErrors.unauthorized()
    }

    // find user with firebase uid
    const user = await this.prisma.user.findFirst({
        where: {
            firebase_uid: decodedToken.uid,
        },
    })

    // if user is soft-deleted
    if (user && user.delete_flag == FLAG.ON) {
        return this.httpErrors.forbidden()
    }

    // if user exists
    if (user && user.registration_status == 'COMPLETE' && user.delete_flag == FLAG.OFF) {
        // set payload
        const payload: JWTPayload = {
            user: user,
        }

        // sign jwt
        const bsg_jwt = this.jwt.sign(payload)

        const result: TokenExchangeResult = {
            bsg_jwt,
        }
        const response: TokenExchangeResponse = {
            result: result,
            message: '',
            warning_flag: FLAG.OFF,
        }

        reply.status(StatusCodes.OK)

        return response
    } else {
        if (user) {
            // delete incomplete registration
            await this.prisma.user.deleteMany({
                where: {
                    firebase_uid: decodedToken.uid,
                },
            })
        }

        // temporary register
        const newUser = await this.prisma.user.create({
            data: {
                user_id: dbUtils.generateId(),
                user_name: '',
                firebase_uid: decodedToken.uid,
                phone_no: decodedToken.phone_number ?? '',
                role: 'USER',
                registration_status: 'TEMPORARY',
                delete_flag: FLAG.OFF,
            },
        })

        const payload: JWTPayload = {
            user: newUser,
        }

        const bsg_jwt = this.jwt.sign(payload)

        const result: TokenExchangeResult = {
            bsg_jwt,
        }
        const response: TokenExchangeResponse = {
            result: result,
            message: '',
            warning_flag: FLAG.OFF,
        }

        reply.status(StatusCodes.OK)

        return response
    }
}
