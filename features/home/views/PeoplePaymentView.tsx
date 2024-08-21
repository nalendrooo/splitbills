import React from 'react'
import Action from '../components/Menu/Action'
import { Progress } from '@/components/ui/progress'
import { Button } from '@/components/ui/button'
import { CircleDollarSign, Minus, Plus, Scale, Wallet } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { IAlreadyPaid, IItem } from '../interface'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Label } from '@/components/ui/label'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { initialAlreadyPaid, placeholder2 } from '../constants/constant'
import { useAtom, useAtomValue } from 'jotai'
import { alreadyPaidAtom, usersAtom } from '@/lib/atom'
import { Separator } from '@/components/ui/separator'


const PeoplePaymentView = () => {
    const users = useAtomValue(usersAtom)

    const [alreadyPaid, setAlreadyPaid] = useAtom(alreadyPaidAtom)

    const handleAddPerson = () => {
        setAlreadyPaid(prev => [...prev, initialAlreadyPaid])
    }

    const handleDeletePerson = (index: number) => {

        setAlreadyPaid(prev => prev.filter((_, i) => i !== index))
    }
    return (
        <>
            <div className='min-h-screen flex p-4 gap-2 flex-col justify-between'>

                <div className='border border-slate-300 rounded-lg px-2'>
                    <Accordion type='single' className="w-full px-2" defaultValue='udah-bayar'>
                        <AccordionItem value='udah-bayar' key='yang udah bayar'>
                            <AccordionTrigger className='hover:no-underline'>
                                <Avatar>
                                    <AvatarFallback>
                                        <Wallet className="h-4 w-4" />
                                    </AvatarFallback>
                                </Avatar>
                                <Label className='text-xl'>Yang udah bayar</Label>

                            </AccordionTrigger>
                            <AccordionContent >

                                <div className='flex flex-col gap-2 '>

                                    <div className='flex flex-col gap-2'>

                                        {alreadyPaid.map((item: IAlreadyPaid, indexItem: number) => (
                                            <div className="flex items-end gap-2" key={indexItem}>
                                                <div style={{ width: '70%' }}>
                                                    <Select>
                                                        <SelectTrigger >
                                                            <SelectValue placeholder="Pilih orangnya" />
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            {users.map((item, index) => (
                                                                <SelectItem key={index} value={item}>{item}</SelectItem>
                                                            ))}
                                                        </SelectContent>
                                                    </Select>

                                                </div>
                                                <div>
                                                    <Input
                                                        // value={item.price}
                                                        value="Rp. 0"
                                                        onChange={() => { }}
                                                    // onChange={(e) => handleInputChange(indexItem, 'price', e.target.value)}
                                                    />
                                                </div>

                                                <Button
                                                    size="icon"
                                                    variant="destructive"
                                                    className="shrink-0 rounded-full "
                                                    onClick={() => handleDeletePerson(indexItem)}
                                                    disabled={alreadyPaid.length === 1}
                                                >
                                                    <Minus className="h-6 w-6" />
                                                </Button>

                                            </div>
                                        ))}

                                    </div>
                                    {alreadyPaid.length !== users.length && (
                                        <div className='flex w-full items-center justify-center '>

                                            <Button
                                                variant="outline"
                                                size="icon"
                                                className="shrink-0 rounded-full"
                                                onClick={handleAddPerson}
                                            >
                                                <Plus className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    )}


                                </div>

                                <Separator style={{ marginBlock: '1rem' }} />

                                <div className='flex flex-col gap-2 mt-2'>

                                    <div className='flex flex-col gap-2'>


                                        <div className="flex items-end gap-2">
                                            <div style={{ width: '70%' }}>
                                                <Input
                                                    // value={item.price}
                                                    value="Total terkumpul"
                                                    disabled
                                                    onChange={() => { }}
                                                />

                                            </div>
                                            <div>
                                                <Input
                                                    // value={item.price}
                                                    value="Rp. 75.000"
                                                    disabled
                                                    onChange={() => { }}
                                                // onChange={(e) => handleInputChange(indexItem, 'price', e.target.value)}
                                                />
                                            </div>

                                        </div>


                                        <div className="flex items-end gap-2">
                                            <div style={{ width: '70%' }}>
                                                <Input
                                                    // value={item.price}
                                                    value="Total pengeluaran"
                                                    disabled
                                                    onChange={() => { }}
                                                />
                                            </div>
                                            <div>
                                                <Input
                                                    // value={item.price}
                                                    value="Rp. 100.000"
                                                    disabled
                                                    onChange={() => { }}
                                                // onChange={(e) => handleInputChange(indexItem, 'price', e.target.value)}
                                                />
                                            </div>
                                        </div>

                                        <Button className="rounded-full">- Rp. 25.000</Button>

                                    </div>

                                </div>
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>
                </div>
                <Action />
            </div >
        </>
    )
}

export default PeoplePaymentView