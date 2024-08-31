import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { DropdownMenu, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { formatRupiah } from '@/lib/format';
import { Ellipsis, GripVertical } from 'lucide-react';
import ItemCard from './item-card';

const UserCard = ({
    item,
}: any) => {
    return (
        <Card
            key={item.creator}
            className='h-[75vh] max-h-[75vh] w-full sm:w-[300px] max-w-full bg-secondary flex flex-col flex-shrink-0 snap-center border-2 bordere-transparent'
        >
            <CardHeader className="justify-between flex flex-row items-center border-b-2 p-4 text-left font-semibold ">
                <Button
                    variant='ghost'
                    disabled
                    className="-ml-2 h-auto cursor-grab p-1 text-secondary-foreground/50"
                >
                    <GripVertical />
                </Button>
                <div className='flex '>

                    <Input
                        value={item.key}
                        className="!mt-0 mr-auto text-base disabled:cursor-pointer disabled:border-none disabled:opacity-100"
                        disabled
                    />
                </div>
                <DropdownMenu modal={false}>
                    <DropdownMenuTrigger asChild>
                        <Button variant="secondary" disabled className="ml-1">
                            <Ellipsis className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                </DropdownMenu>
            </CardHeader>
            <CardContent className="flex flex-grow flex-col gap-4 overflow-x-hidden p-2">
                <div className='flex justify-between items-end'>
                    <p className='ml-2 font-semibold'>{formatRupiah(Math.round(item.totalPerUser))}</p>
                    <p className='ml-2 text-xs font-semibold'>{item.totalUser} Item</p>
                </div>
                <ScrollArea className="h-full">
                    {
                        item.items.map((item: any) => (
                            <ItemCard index={item.id} item={item} />
                        ))
                    }
                </ScrollArea>
            </CardContent>
        </Card>
    )
}

export default UserCard