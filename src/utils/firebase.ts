import * as firebaseAdmin from 'firebase-admin'
import { ServiceAccount } from 'firebase-admin'
import { readFileSync } from 'fs'

import env from '@/utils/env'

const privateKeyJSON = readFileSync(env.FIREBASE_SERVICE_PK, 'utf-8')
const privateKeyObject = <ServiceAccount>JSON.parse(privateKeyJSON)

firebaseAdmin.initializeApp({
    credential: firebaseAdmin.credential.cert(privateKeyObject),
    // databaseURL: env.FIREBASE_DATABASE_URL,
    // storageBucket: env.FIREBASE_STORAGE_BUCKET,
})

// const realtimeDB = firebaseAdmin.database()
// const storage = firebaseAdmin.storage()

// const getActiveOrderPath = (firebase_uid: string, order_id: string) => `/orders/active/${firebase_uid}/${order_id}`
// const getArchivedOrderPath = (firebase_uid: string, order_id: string) => `/orders/archived/${firebase_uid}/${order_id}`
// const getOrderStatsPath = (shop_id: string) => `/stats/${shop_id}`
// const getRefKey = () => Date.now()
// const realtimeDBPaths = {
//     getActiveOrderPath,
//     getArchivedOrderPath,
//     getOrderStatsPath,
//     getRefKey,
// }

// const storagePaths = {
//     getUploadDir: () => 'upload/',
// }

export { firebaseAdmin }
