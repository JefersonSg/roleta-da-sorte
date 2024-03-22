import prisma from "@/lib/db"
import { NextRequest, NextResponse } from "next/server"


export async function GET(req: NextRequest) {
    console.log(req.nextUrl.searchParams.get('id'))
  return   Response.json({
        message: 'Executando'    })
}

export async function POST(req: Request) {
    const {name} = await req.json()

    try {
        const user = await prisma.user.create({
            data: {
                name: 'teste',
                password:'1254'
            }
        })
         return NextResponse.json({
            message: user
         })
    } catch (error) {
        return NextResponse.json({
            message: "Error", error
        },
        {
            status: 500
        })
    }
}