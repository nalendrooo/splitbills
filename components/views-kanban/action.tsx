import { Button } from '@/components/ui/button'
import { BookmarkCheck, House, Share2 } from 'lucide-react'
import React from 'react'

const Action = () => {
    return (
        <>
            <Button variant='ghost' size='sm' >
                <House size={16} />
            </Button>
            <Button variant='ghost' size='sm'>
                <Share2 size={16} />
            </Button>
            <Button variant='ghost' size='sm'>
                <BookmarkCheck size={16} />
            </Button>
        </>
    )
}

export default Action