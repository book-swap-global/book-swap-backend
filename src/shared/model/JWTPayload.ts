import { FLAG, REGISTRATION_STATUS, ROLE } from '@prisma/client'

export type JWTPayload = {
    user: {
        user_id: string
        user_name: string
        firebase_uid: string
        phone_no: string
        role: ROLE
        registration_status: REGISTRATION_STATUS
        delete_flag: FLAG
    }
}
