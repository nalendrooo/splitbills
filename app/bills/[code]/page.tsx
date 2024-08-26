import axios from 'axios'
// import { useParams } from 'next/navigation'
import React from 'react'
const page = async ({ params }: any) => {
    // const params = useParams()
    const data = await GetBill(params?.code)

    // console.log(params.code)
    // console.log(params)
    console.log(data?.data?.data)
    return (
        <div>{params.code}</div>
    )
}

function GetBill(code?: string) {
    if (!code) return

    return axios.get('http://localhost:3000/api/bills/5MSDVM')
}

export default page