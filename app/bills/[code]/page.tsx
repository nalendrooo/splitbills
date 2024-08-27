import axios from 'axios'
// import { useParams } from 'next/navigation'
import React from 'react'
const page = async ({ params }: any) => {
    // const params = useParams()
    try {

        const data = await GetBill(params?.code)
        console.log(data?.data?.data)
    } catch (error) {
        console.log(error)
    }

    // console.log(params.code)
    // console.log(params)
    return (
        <div>{params.code}</div>
    )
}

function GetBill(code?: string) {
    if (!code) return

    return axios.get('http://localhost:3000/api/bills/' + code)
}

export default page