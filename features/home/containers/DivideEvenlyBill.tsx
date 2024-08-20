'use client'
import {
    AccordionContent,
    AccordionItem,
    AccordionTrigger
} from "@/components/ui/accordion"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { divideEvenlyAtom, showDivideEvenlyAtom } from "@/lib/atom"
import { useAtom, useSetAtom } from "jotai"
import { Minus, Plus, Scale } from 'lucide-react'
import { initialItem } from "../constants/constant"
import { IItem } from "../interface"
import { Separator } from "@/components/ui/separator"

const DivideEvenlyBill = () => {
    const [divideEvenly, setDivideEvenly] = useAtom(divideEvenlyAtom)
    const setShowDivideEvenly = useSetAtom(showDivideEvenlyAtom)

    const handleInputChange = (indexItem: number, field: string, value: string) => {
        let newValue = value;

        if (field === 'price') {
            const numericValue = value.replace(/\D/g, '');
            const formattedValue = new Intl.NumberFormat('id-ID').format(Number(numericValue));

            newValue = `Rp. ${formattedValue}`;
        }

        setDivideEvenly(prev => {
            const newCustomer = [...prev];
            newCustomer[indexItem] = {
                ...newCustomer[indexItem],
                [field]: newValue
            };
            return newCustomer;
        });


    };

    const handleDeleteItem = (indexItem: number) => {
        setDivideEvenly(prev => prev.filter((_, i) => i !== indexItem));
    }

    const handleDeleteSection = () => {
        setDivideEvenly(initialItem)
        setShowDivideEvenly(false)
    }

    return (

        <AccordionItem value='bagi-rata' key='bagi-rata'>
            <AccordionTrigger className='hover:no-underline'>
                <Avatar>
                    <AvatarFallback>
                        <Scale className="h-4 w-4" />
                    </AvatarFallback>
                </Avatar>
                <Label className='text-xl'>Sama Rata</Label>

            </AccordionTrigger>
            <AccordionContent >

                <div className='flex flex-col gap-2 '>

                    <div className='flex flex-col gap-2'>

                        {divideEvenly.map((item: IItem, indexItem: number) => (

                            <div className="flex items-end gap-2" key={indexItem}>
                                <div>
                                    <Input
                                        placeholder='Pajak'
                                        value={item.item}
                                        onChange={(e) => handleInputChange(indexItem, 'item', e.target.value)}
                                    />
                                </div>
                                <div>
                                    <Input
                                        value={item.price}
                                        onChange={(e) => handleInputChange(indexItem, 'price', e.target.value)}
                                    />
                                </div>

                                <Button
                                    size="icon"
                                    variant="destructive"
                                    className="shrink-0 rounded-full "
                                    onClick={() => handleDeleteItem(indexItem)}
                                    disabled={divideEvenly.length === 1}
                                >
                                    <Minus className="h-6 w-6" />
                                </Button>

                            </div>
                        ))}

                    </div>
                    <div className='flex w-full items-center justify-center '>

                        <Button
                            variant="outline"
                            size="icon"
                            className="shrink-0 rounded-full"
                            onClick={() => setDivideEvenly(prev => [...prev, initialItem[0]])}
                        >
                            <Plus className="h-4 w-4" />
                        </Button>
                    </div>

                    <Separator />

                    <div className='flex w-full mt-4 items-center justify-center gap-2'>

                        <Button
                            variant="destructive"
                            className="shrink-0 rounded-full"
                            onClick={handleDeleteSection}
                        >
                            Hapus bill ini
                        </Button>

                    </div>

                </div>
            </AccordionContent>
        </AccordionItem>


    )
}

export default DivideEvenlyBill