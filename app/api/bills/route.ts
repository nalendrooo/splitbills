// app/api/hello/route.js

import prisma from "@/lib/prisma";
import { customAlphabet } from 'nanoid';
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
    const data = {
        message: 'Hello, world!',
        timestamp: new Date().toISOString(),
    };

    return new Response(JSON.stringify(data), {
        status: 200,
        headers: {
            'Content-Type': 'application/json',
        },
    });
}

export async function POST(request: NextRequest) {

    const alphabet = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';

    const nanoid = customAlphabet(alphabet, 6);

    const body = await request.json();
    const { tasks, columns, keterangan } = body;
    
    const code = nanoid()
    const userBills = [...columns]
    const items = [...tasks]

    await prisma.bills.create({
        data: {
            code,
            creator: keterangan.creator,
            description: keterangan.description,
        }
    })

    const userBillEntries = await Promise.all(
        userBills.map(async (userBill) => {
            const createdUserBill = await prisma.userBill.create({
                data: {
                    billsCode: code,
                    status: userBill.status,
                    user: userBill.user,
                },
            });
    
            return {
                ...createdUserBill,
                userId: createdUserBill.id, 
            };
        })
    );
    
    await prisma.items.createMany({
        data: items.map((item) => {
            const matchingUserBill = userBillEntries.find(
                (userBillEntry) => userBillEntry.status === item.status
            );
    
            return {
                id: item.id,
                title: item.title,
                billsCode: code,
                price: item.price,
                status: item.status,
                type: item.type,
                userId: matchingUserBill ? matchingUserBill.userId : 0, 
            };
        }),
    });



    return new Response(JSON.stringify({
        status: 'success'   ,
        message: 'Success create bills',
        data: {
            code
        }
    }), {
        status: 200,
        headers: {
            'Content-Type': 'application/json',
        },
    });
}
