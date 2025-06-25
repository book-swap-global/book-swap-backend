import { PrismaClient } from '@prisma/client'
import { customAlphabet } from 'nanoid'

import { SYS_CONSTANTS } from '@/constants/systemConstants'

const nanoid = customAlphabet('ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789')

export const dbUtils = {
    generateId: () => {
        return nanoid(SYS_CONSTANTS.NANOID_LENGTH)
    },
    getSysDate: async (
        prisma: PrismaClient | Omit<PrismaClient, '$connect' | '$disconnect' | '$on' | '$transaction' | '$use' | '$extends'>,
    ): Promise<Date> => {
        const result: { sysdate: Date }[] = await prisma.$queryRaw`select now() as sysdate;`
        return result[0].sysdate
    },
    getSysDateWithoutTime: async (
        prisma: PrismaClient | Omit<PrismaClient, '$connect' | '$disconnect' | '$on' | '$transaction' | '$use' | '$extends'>,
    ): Promise<Date> => {
        const result: { sysdate: Date }[] = await prisma.$queryRaw`select date_trunc('day', now()) as sysdate;`
        return result[0].sysdate
    },
    encodeOrderNo: (no: number) => {
        return '#' + String(no).padStart(7, '0')
    },
    getUTCFromJST(value: string) {
        if (!value || value.length < 10) {
            return value
        }
        const currentDate = new Date(value.substring(0, 10))
        currentDate.setHours(currentDate.getHours() - 9) // UTC +09:00
        return currentDate.toISOString()
    },
}
