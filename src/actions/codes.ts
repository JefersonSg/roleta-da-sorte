'use server'
import { PrismaClient } from "@prisma/client"


const prisma = new PrismaClient()

export async function createCode(code: string, secretCode: string) {
    const secret = 'lalalaBisola123'

    if (secretCode !== secret) {
        return {error: 'O codigo secreto esta errada'}
    }
    try {
        const oldCode = await prisma.codes.findFirst({
            where: {
                code         
            }
        })

        if (oldCode) {
            return {
                error: 'codigo ja existente'
            }
        }
        const newCode = await prisma.codes.create({
            data:{
                code,
                used: false
            }
        })
        if (newCode) {
            return {message: 'Codigo criado com sucesso'}
        }
    } catch (error) {
        console.log(error)
        return {error: 'Erro ao criar o codigo'}
    }
}

export async function checkCodeAndSetAward(code: string, name: string) {
    const codeToUse = await prisma.codes.findFirst({
        where: {
            code: code,
        }
    })
    if (!codeToUse) {
        return {
            error: 'Nenhum codigo encontrado',
        }
    }

    if (  codeToUse.used ) {
        return {error: 'Codigo já resgatado'}
    }

    const numeroSorteio = Math.floor(Math.random() * 13) + 1

   const data = await prisma.codes.update({
        where: {
            id: codeToUse.id
        },
        data: {
            award: numeroSorteio,
            user: name
        }
    })
    return {message: 'Codigo resgatado'}
}

export async function reedemCode(code: string) {
    const codeToUse = await prisma.codes.findFirst({
        where: {
            code: code
        }
    })

    if (!codeToUse) {
        return {
            error: 'Nenhum codigo encontrado',
        }
    }
    if (codeToUse.used) {
        return {error: "Codigo já usado"}
    }

    const response = await prisma.codes.update({
        where: {
            id: codeToUse.id
        },
        data: {
            used: true
        }
    })

    return {message: response}
}

export async function getCodesUsed() {
    try {
        const response = await prisma.codes.findMany({
            where:{
                used: true
            },
            orderBy: {
                updatedAt: 'desc'
            }
        })

    return response
    } catch (error) {
        console.log(error)
    }
}