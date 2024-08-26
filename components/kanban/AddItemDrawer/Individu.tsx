'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { DrawerClose, DrawerFooter } from '@/components/ui/drawer';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { TabsContent } from "@/components/ui/tabs";
import { useDebounce } from '@/hooks/useDebounce';
import { convertCurrencyToNumber, formatRupiah } from '@/lib/format';
import { useTaskStore } from '@/lib/store';
import { Terminal } from 'lucide-react';
import { useState } from 'react';
import { Column, IPropsColumns, Task } from '@/interfaces/kanban';
import { initialItem } from '@/constants/kanban';

const Individu = ({
    columns,
}: IPropsColumns
) => {
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
                status: id
            })
        })
    }

    const handleReset = () => {
        setInputItem(initialItem)
        setPerson([])
    }

    const total = useDebounce(inputItem.price, 1000)
    const disabled = !Boolean(inputItem.title) || !Boolean(inputItem.price) || !Boolean(person.length)

    return (
        <TabsContent value="individu">
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
                        onChange={(e) => setInputItem({ ...inputItem, price: convertCurrencyToNumber(e.target.value) })}
                        value={formatRupiah(inputItem.price)}
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
                <AlertDescription className='text-xs'>
                    Setiap orang mendapat bills sebesar {formatRupiah(total)}
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

export default Individu