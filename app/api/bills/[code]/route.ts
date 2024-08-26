import prisma from "@/lib/prisma";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest, { params }: { params: { code: string } }) {

    const data = await prisma.bills.findUnique({
        where: {
            code: params.code
        },
        include: {
            userBills: true,
            items: true
        }
    })

    if (!data) {
        return new Response(JSON.stringify({ status: 'error', message: 'Not Found' }), {
            status: 404,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }
    const response = {
        status: 'success',
        message: 'Data Found',
        data: data
    }
    
    // const data = {
    //     message: 'Hello,' + params.code,
    //     timestamp: new Date().toISOString(),
    // };

    return new Response(JSON.stringify(response), {
        status: 200,
        headers: {
            'Content-Type': 'application/json',
        },
    });
}