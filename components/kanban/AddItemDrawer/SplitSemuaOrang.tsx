'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { DrawerClose, DrawerFooter } from '@/components/ui/drawer';
import { TabsContent } from "@/components/ui/tabs";
import { initialItem } from '@/constants/kanban';
import { useDebounce } from '@/hooks/useDebounce';
import { IPropsColumns, Task } from '@/interfaces/kanban';
import { convertCurrencyToNumber, formatRupiah } from '@/lib/format';
import { useTaskStore } from '@/lib/store';
import { Terminal } from 'lucide-react';
import { useState } from 'react';

const SplitSemuaOrang = ({
    columns
}: IPropsColumns) => {

    const addTask = useTaskStore((state) => state.addTask)

    const [inputItem, setInputItem] = useState<Task>(initialItem)

    const handleSubmit = () => {
        columns.forEach((col) => {
            addTask({
                ...inputItem,
                status: col.status,
                price: inputItem.price / columns.length
            })
        })
    }

    const handleReset = () => {
        setInputItem(initialItem)
    }

    const total = useDebounce(inputItem.price / columns.length, 1000)
    const disabled = !Boolean(inputItem.title) || !Boolean(inputItem.price) || !Boolean(columns.length)

    return (

        <TabsContent value="split-semua-orang">
            <form
                className="grid gap-4 py-4"
            >
                <div className="grid grid-cols-2 items-center gap-4">
                    <Input
                        value={inputItem.title}
                        onChange={(e) => setInputItem({ ...inputItem, title: e.target.value })}
                        placeholder="Nama item..."
                    />
                    <Input
                        id="title"
                        name="title"
                        value={formatRupiah(inputItem.price)}
                        onChange={(e) => setInputItem({ ...inputItem, price: convertCurrencyToNumber(e.target.value) })}
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
    )
}

export default SplitSemuaOrang