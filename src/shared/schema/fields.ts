import {
    FLAG,
    REGISTRATION_STATUS,
    ROLE,
} from '@prisma/client'
import { Type } from '@sinclair/typebox'

const sharedField = {
    id: Type.String({ minLength: 12, maxLength: 12 }),
    barcode: Type.String({ maxLength: 50 }),
    price: Type.Number({ minimum: 1 }),
    zip_code: Type.String({ minLength: 7, maxLength: 7 }),
    address: Type.String({ minLength: 1, maxLength: 350 }),
    phone_no: Type.String({ pattern: '^\\+[1-9]\\d{1,14}$' }),
    phone_no_local: Type.String({ pattern: '^\\d{1,14}$' }),
    email: Type.String({ format: 'email' }),
    name_100: Type.String({ minLength: 1, maxLength: 100 }),
    url: Type.String({ format: 'uri' }),
    flag: Type.Enum(FLAG),
    sort_order: Type.Number({ minimum: 1 }),
    text: Type.String({ maxLength: 5000 }),
    quantity: Type.Number({ multipleOf: 1 }),
    weight: Type.Number({ minimum: 0.01, maximum: 300 }), //kg
    length: Type.Number({ minimum: 0.01, maximum: 200 }), // cm
    width: Type.Number({ minimum: 0.01, maximum: 200 }), // cm
    height: Type.Number({ minimum: 0.01, maximum: 200 }), // cm
    date: Type.String({ format: 'date' }),
    date_time: Type.String({ format: 'date-time' }),
    remark: Type.String({ maxLength: 500 }),
}

const fields = {
    common: sharedField,
    user: {
        user_id: sharedField.id,
        user_name: sharedField.name_100,
        phone_no: sharedField.phone_no,
        role: Type.Enum(ROLE),
        registration_status: Type.Enum(REGISTRATION_STATUS),
        delete_flag: Type.Enum(FLAG),
    },
}

export { fields }
