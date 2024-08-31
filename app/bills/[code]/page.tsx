import DetailBills from '@/components/views-kanban/detail-bills';
import { BASE_URL } from '@/constants/env';
import axios, { AxiosError } from 'axios';

const page = async ({ params }: any) => {
    try {
        const [data] = await Promise.all([
            GetBill(params?.code)
        ]);
        return <DetailBills data={data?.data?.data} />
    } catch (error: AxiosError | any) {
        return <div>Not Found</div>
    }

}

function GetBill(code?: string) {
    if (!code) return

    return axios.get(BASE_URL + '/api/bills/' + code)
}

export default page