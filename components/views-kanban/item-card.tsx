import { formatRupiah } from '@/lib/format'
import { GripVertical } from 'lucide-react'
import { Badge } from '../ui/badge'
import { Button } from '../ui/button'
import { Card, CardContent, CardHeader } from '../ui/card'
import { Fragment } from 'react'

const ItemCard = ({
    item,
    index
}: any) => {
    return (
        <Card key={index}>
            <CardHeader className="space-between relative flex flex-row border-b-2 border-secondary px-3 py-3">
                <Button
                    variant='ghost'
                    disabled
                    className="-ml-2 h-auto cursor-grab p-1 text-secondary-foreground/50"
                >
                    <GripVertical />
                </Button>
                <Badge variant='outline' className="ml-auto font-semibold">
                    {formatRupiah(Math.round(item.price))}
                </Badge>

            </CardHeader>
            <CardContent className="whitespace-pre-wrap px-3 pb-6 pt-3 text-left flex flex-col relative">
                {item.title}
            </CardContent>
        </Card>
    )
}

export default ItemCard