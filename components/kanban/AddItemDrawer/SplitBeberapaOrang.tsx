'use client';

import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { DrawerClose, DrawerFooter } from '@/components/ui/drawer';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { TabsContent } from "@/components/ui/tabs";
import { initialItem } from '@/constants/kanban';
import { useDebounce } from '@/hooks/useDebounce';
import { Column, IPropsColumns, Task, TaskType } from '@/interfaces/kanban';
import { convertCurrencyToNumber, formatRupiah } from '@/lib/format';
import { useTaskStore } from '@/lib/store';
import { Terminal } from 'lucide-react';
import { useState } from 'react';

const SplitBeberapaOrang = ({
    columns,
}: IPropsColumns) => {

    const addTask = useTaskStore((state) => state.addTask)

    const [inputItem, setInputItem] = useState<Task>(initialItem)
    const [person, setPerson] = useState<string[]>([])

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
        setInputItem(initialItem)
        setPerson([])
    }

    const total = useDebounce(inputItem.price / person.length, 1000)

    return (
        <>
            <TabsContent value="split-beberapa-orang">
                <form
                    className="grid gap-4 py-4"
                >
                    <div className="grid grid-cols-2 items-center gap-4">
                        <Input
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

                <Card>
                    <div className='px-6 py-4 w-full text-center'>
                        <h2 className="text-md font-semibold">Pilih penerima bills</h2>
                    </div>
                    <Separator />
                    <CardContent>
                        <ScrollArea className="h-[210px] mt-2">
                            {columns.map((item: Column, index: number) => (
                                <div className="flex items-center gap-2 py-2" key={index}>
                                    <Checkbox
                                        id="terms"
                                        checked={person.includes(item.status as never)}
                                        onCheckedChange={() => handleCheck(item.status as never)}
                                    />
                                    <label
                                        htmlFor="terms"
                                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                    >
                                        <Badge variant="outline" className='rounded '>{item.user}</Badge>
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
                        <span>Setiap orang mendapat bills sebesar {person.length === 0
                            ? formatRupiah(0)
                            : formatRupiah(Math.round(total))}
                        </span>
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