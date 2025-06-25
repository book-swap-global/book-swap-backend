import { Type } from '@sinclair/typebox'
import { FastifySchema } from 'fastify'

import { tokenExchangeResponse } from './response'

const description = `
# TOKEN EXCHANGE
- book-swap-global မှာ register လုပ်ထားပြီးသား user ပဲဖြစ်ဖြစ် user အသစ်ဖြစ်ဖြစ် Login ဝင်မယ်ဆိုရင် ဒီ api ကိုခေါ်ပါ
- ဒီ api ကိုမခေါ်ခင်မှာ အရင်ဆုံး firebase နဲ့ချိတ်ပြီး phone auth လုပ်ပါ
- firebase ကနေ issued လုပ်ပေးတဲ့ jwt တစ်ခုပြန်ရလာလိမ့်မယ် (firebase-jwt လို့ခေါ်ပါမယ်)
- firebase-jwt ကို header မှာထည့်ပြီး ဒီ api ကိုခေါ်ပါ
- backend မှာ process လိုအပ်တဲ့ verification တွေ လုပ်ပြီးရင် response မှာ jwt အသစ်တစ်ခုပြန်ပေးမယ် (bsg_jwt လို့ခေါ်ပါမယ်)
- bsg_jwt ရဲ့ payload ထဲမှာ user object ပါတယ် 
- uesr.registration_status == "COMPLETE" ဆိုရင် register လုပ်ထားပြီးသား user မို့လို့ login process ကဒီမှာတင်ပြီးပြီ
- uesr.registration_status == "TEMPORARY" ဆိုရင် user အသစ်မို့လို့ \`POST /auth/register-user\` ကိုဆက်ပြီးအသုံးပြုပါ
`

export const tokenExchangeSchema: FastifySchema = {
    operationId: 'tokenExchange',
    summary: `Token exchange`,
    tags: ['Auth'],
    description: description,
    security: [{ 'firebase-jwt': [] }],
    response: {
        200: Type.Ref(tokenExchangeResponse),
    },
}
