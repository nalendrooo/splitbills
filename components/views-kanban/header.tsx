import React from 'react'
import { Heading } from '../ui/heading'
import { formatDateToIndonesian } from '@/lib/format'

const Header = ({
    createdAt,
    description,
    creator,
}: any) => {
    return (
        <div className="flex items-start justify-between flex-col gap-2">
            <Heading
                title="Makan di E'tala cafe"
                description={`Dibuat oleh ${creator} / ${formatDateToIndonesian(new Date(createdAt))}`}
            />
            <p className="text-xs text-muted-foreground">
                {description}
            </p>
        </div>
    )
}

export default Header