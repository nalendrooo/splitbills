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

const SplitBeberapaOrang = ({
    columns,
}: {
    columns: Column[]
}) => {
    const [inputItem, setInputItem] = useState<Task>({
        title: '',
        id: '',
        price: 0,
        status: '',
        type: 'SEVERAL'
    })

    const [person, setPerson] = useState<string[]>([])
    const addTask = useTaskStore((state) => state.addTask)

    const total = useDebounce(inputItem.price / person.length, 1000)

    const handleCheck = (id: string) => {
        if (person.includes(id)) {
            setPerson(person.filter((item) => item !== id))
        } else {
            setPerson([...person, id])
        }
    }

    const handleSubmit = () => {
        person.forEach((id) => {
            addTask({
                ...inputItem,
                status: id,
                price: inputItem.price / person.length
            })
        })
    }

    const handleReset = () => {
        setInputItem({
            title: '',
            id: '',
            price: 0,
            status: '',
            type: 'SEVERAL'
        })

        setPerson([])
    }

    const disabled = !Boolean(inputItem.title) || !Boolean(inputItem.price) || !Boolean(person.length)
    return (
        <>
            <TabsContent value="split-beberapa-orang">
                <form
                    id="todo-form"
                    className="grid gap-4 py-4"
                // onSubmit={handleSubmit}
                >
                    <div className="grid grid-cols-2 items-center gap-4">
                        <Input
                            id="title"
                            name="title"
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
                <Card>
                    {/* <CardHeader>
        </CardHeader> */}
                    <div className='px-6 py-4 w-full text-center'>

                        <h2 className="text-md font-semibold">Pilih penerima bills</h2>
                        {/* <Badge variant="outline" className='rounded '>Pilih penerima bills</Badge> */}
                    </div>
                    <Separator />
                    <CardContent>
                        <ScrollArea className="h-[210px] mt-2">
                            {columns.map((item: Column, index: number) => (

                                <div className="flex items-center gap-2 py-2" key={index}>
                                    <Checkbox
                                        id="terms"
                                        checked={person.includes(item.id as never)}
                                        onCheckedChange={() => handleCheck(item.id as never)}
                                    />
                                    <label
                                        htmlFor="terms"
                                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                    >
                                        <Badge variant="outline" className='rounded '>{item.title}</Badge>
                                        {/* {item.title} */}
                                    </label>
                                </div>
                            ))}
                        </ScrollArea>
                    </CardContent>

                </Card>
                <Alert className='mt-4'>
                    <Terminal className="h-4 w-4" />
                    <AlertDescription className='text-xs flex flex-col'>
                        <span>Bill dibagi ke {person.length} orang.</span>
                        <span> Setiap orang mendapat bills sebesar {person.length === 0 ? formatRupiah(0) : formatRupiah(Math.round(total))}</span>
                    </AlertDescription>
                </Alert>
                <DrawerFooter className='w-full p-0 mt-10'>
                    <DrawerClose asChild >

                        <Button className='w-full' onClick={handleSubmit}>Tambah</Button>

                    </DrawerClose>
                    <DrawerClose asChild >

                        <Button className='w-full' variant='outline' onClick={handleReset}>Batal</Button>

                    </DrawerClose>
                </DrawerFooter>
            </TabsContent>
        </>
    )
}

export default SplitBeberapaOrang