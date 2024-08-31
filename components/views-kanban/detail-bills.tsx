import { Badge } from '@/components/ui/badge';
import { Breadcrumbs } from '@/components/ui/breadcrumbs';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { DropdownMenu, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Heading } from '@/components/ui/heading';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { formatDateToIndonesian, formatRupiah, groupByToArray } from '@/lib/format';
import { cva } from 'class-variance-authority';
import { Ellipsis, GripVertical } from 'lucide-react';
// import { useParams } from 'next/navigation'
import ItemCard from './item-card';
import Header from './header';
import UserCard from './user-card';
import Action from './action';


const DetailBills = ({
    data
}: any) => {
    const breadcrumbItems = [
        { title: 'Home', link: '/' },
        { title: 'Bills', link: '/bills' },
        { title: data?.code, link: '/bills' + data?.code },
    ];
    const itemsData = groupByToArray(data.items, (item: any) => item.status);

    const total = data.items.map((item: any) => item.price).reduce((a: any, b: any) => a + b, 0);
    return (

        <div className="h-full  p-4 md:px-8 ">

            <div className="space-y-4">
                <Breadcrumbs items={breadcrumbItems} />

                <Header createdAt={data?.createdAt} description={data?.description} creator={data?.creator} />
                <Action />

                <div className='w-full sm:w-[300px] flex  justify-between top-10'>
                    <Badge variant='outline' >{data?.userBills?.length} Orang</Badge>
                    <Badge >Total: {formatRupiah(total)}</Badge>
                </div>

                <div className="w-full whitespace-nowrap rounded-md">
                    <div className="flex flex-wrap sm:justify-start sm:flex-row flex-col items-start justify-center gap-4">
                        {itemsData.map((itemParent) => {
                            const totalPerUser = itemParent.items.map((item: any) => item.price).reduce((a: any, b: any) => a + b, 0);
                            const totalUser = itemParent.items.length;
                            return <UserCard item={{ ...itemParent, totalPerUser, totalUser }} />
                        })}
                    </div>
                </div>


            </div>
        </div>
    )
}

export default DetailBills