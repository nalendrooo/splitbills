import React from 'react'
import { Alert, AlertDescription, AlertTitle } from '../ui/alert'
import { GripVertical, Terminal, X } from 'lucide-react'
import { Badge } from '../ui/badge'
import { Button } from '../ui/button'

const AlertHowToUse = () => {
    const [show, setShow] = React.useState(true)
    if (!show) return null
    return (
        <Alert className='cursor-pointer'>
            <X className="h-4 w-4" onClick={() => setShow(false)}/>
            <AlertTitle>Masih bingung pakenya?</AlertTitle>
            <AlertDescription >
                Kamu bisa klik dan tahan icon
                <Badge className='rounded mx-2 hover:cursor-grab' variant="secondary" ><GripVertical className='h-4 w-4' /></Badge>
                pada setiap item untuk memindahkannya ke temenmu.
            </AlertDescription>
        </Alert>
    )
}

export default AlertHowToUse