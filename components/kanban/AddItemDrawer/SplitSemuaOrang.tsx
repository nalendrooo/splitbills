'use client';

import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';

import { Task, useTaskStore } from '@/lib/store';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Terminal } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Column } from '../board-column';
import { Dispatch, SetStateAction, useState } from 'react';
import { DrawerClose, DrawerFooter } from '@/components/ui/drawer';
import { convertCurrencyToNumber, formatRupiah } from '@/lib/format';
import { useDebounce } from '@/hooks/useDebounce';

const SplitSemuaOrang = ({
    columns
}: {
    columns: Column[]
}) => {
    const [inputItem, setInputItem] = useState<Task>({
        title: '',
        id: '',
        price: 0,
        status: '',
        type: 'ALL'
    })

    const addTask = useTaskStore((state) => state.addTask)

    const total = useDebounce(inputItem.price / columns.length, 1000)

    const handleSubmit = () => {
        columns.forEach((col) => {
            addTask({
                ...inputItem,
                status: col.id,
                price: inputItem.price / columns.length
            })
        })
    }

    const handleReset = () => {
        setInputItem({
            title: '',
            id: '',
            price: 0,
            status: '',
            type: 'ALL'
        })

    }

    const disabled = !Boolean(inputItem.title) || !Boolean(inputItem.price) || !Boolean(columns.length)
    return (
        <>
            <TabsContent value="split-semua-orang">
                <form
                    id="todo-form"
                    className="grid gap-4 py-4"
                // onSubmit={handleSubmit}
                >
                    <div className="grid grid-cols-2 items-center gap-4">
                        <Input
                            id="title"
                            name="title"
                            value={inputItem.title}
                            onChange={(e) => setInputItem({ ...inputItem, title: e.target.value })}
                            placeholder="Nama item..."
                        // className="col-span-2"
                        />
                        <Input
                            id="title"
                            name="title"
                            value={formatRupiah(inputItem.price)}
                            onChange={(e) => setInputItem({ ...inputItem, price: convertCurrencyToNumber(e.target.value) })}
                        // className="col-span-2"
                        />
                    </div>



                </form>

                <Alert >
                    <Terminal className="h-4 w-4" />
                    <AlertDescription className='text-xs'>
                        Setiap orang mendapat bills {formatRupiah(Math.round(total))}
                    </AlertDescription>
                </Alert>
                <DrawerFooter className='w-full p-0 mt-10'>
                    <DrawerClose asChild >

                        <Button disabled={disabled} className='w-full' onClick={handleSubmit}>Tambah</Button>

                    </DrawerClose>
                    <DrawerClose asChild >

                        <Button className='w-full' variant='outline' onClick={handleReset}>Batal</Button>

                    </DrawerClose>
                </DrawerFooter>
            </TabsContent>

        </>
    )
}

export default SplitSemuaOrang