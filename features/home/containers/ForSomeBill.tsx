'use client'
import {
    AccordionContent,
    AccordionItem,
    AccordionTrigger
} from "@/components/ui/accordion"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from '@/components/ui/button'
import {
    Card,
    CardContent,
    CardHeader
} from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Separator } from "@/components/ui/separator"
import { forSomeAtom, usersAtom } from '@/lib/atom'
import { useAtom, useAtomValue } from 'jotai'
import { Minus, Plus, Users } from 'lucide-react'
import { initialItem } from "../constants/constant"
import { IItem, IForSome } from '../interface'
import { convertCurrencyToNumber, formatRupiah } from "@/lib/format"

const ForSomeBill = ({ indexMain, itemSection }: { indexMain: number, itemSection: IForSome }) => {
    const users = useAtomValue(usersAtom)
    const [section, setSection] = useAtom(forSomeAtom)

    const handleDeleteSection = (index: number) => {
        const newSection = section.filter((_, i) => i !== index)
        setSection(newSection)
    }

    const handleAddItem = (indexSection: number) => {
        const newSection = [...section]
        newSection[indexSection] = {
            ...newSection[indexSection],
            items: [...newSection[indexSection].items, initialItem[0]]
        }
        setSection(newSection)
    }

    const handleDeleteItem = (indexSection: number, indexItem: number) => {
        const newSection = [...section]
        newSection[indexSection] = {
            ...newSection[indexSection],
            items: newSection[indexSection].items.filter((_: IItem, i: number) => i !== indexItem)
        }
        setSection(newSection)
    }

    const handleInputChange = (indexSection: number, indexItem: number, field: string, value: string) => {
        let newValue: number | string = value;

        if (field === 'price') {
            // const numericValue = value.replace(/\D/g, '');
            // const formattedValue = new Intl.NumberFormat('id-ID').format(Number(numericValue));

            // newValue = `Rp. ${formattedValue}`;

            newValue = convertCurrencyToNumber(value);
        }

        const newSection = [...section]
        newSection[indexSection] = {
            ...newSection[indexSection],
            items: newSection[indexSection].items.map((item: IItem, i: number) =>
                i === indexItem ? { ...item, [field]: newValue } : item
            )
        }

        setSection(newSection)
    }

    const handleCheckboxChange = (indexSection: number, indexCustomer: number) => {
        const newSection: IForSome[] = [...section]
        newSection[indexSection] = {
            ...newSection[indexSection],
            customers: newSection[indexSection].customers.includes(indexCustomer)
                ? newSection[indexSection].customers.filter((cust: number,) => cust !== indexCustomer)
                : [...newSection[indexSection].customers, indexCustomer]
        }
        setSection(newSection)
    }

    return (
        <AccordionItem value={'bagi-sebagian-' + indexMain} key={0}>
            <AccordionTrigger className='hover:no-underline'>
                <Avatar>
                    <AvatarFallback>
                        <Users className="h-4 w-4" />
                    </AvatarFallback>
                </Avatar>
                <Label className='text-xl'>Beberapa orang aja ({indexMain + 1})</Label>

            </AccordionTrigger>
            <AccordionContent >

                <div className='flex flex-col gap-2 '>

                    <div className='flex flex-col gap-2'>

                        {itemSection.items.map((item: IItem, indexItem: number) => (

                            <div className="flex items-end gap-2" key={indexItem}>

                                <div>
                                    <Input
                                        placeholder='Bensin'
                                        value={item.item}
                                        onChange={(e) => handleInputChange(indexMain, indexItem, 'item', e.target.value)}
                                    />
                                </div>
                                <div>
                                    <Input
                                        // value={item.price}
                                        value={formatRupiah(item.price)}
                                        onChange={(e) => handleInputChange(indexMain, indexItem, 'price', e.target.value)}
                                    />
                                </div>

                                <Button
                                    size="icon"
                                    variant="destructive"
                                    className="shrink-0 rounded-full "
                                    onClick={() => handleDeleteItem(indexMain, indexItem)}
                                    disabled={itemSection.items.length === 1}
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
                            onClick={() => handleAddItem(indexMain)}
                        >
                            <Plus className="h-4 w-4" />
                        </Button>
                    </div>
                    <Card>
                        <CardHeader>
                            <h2 className="text-lg font-semibold">Pilih penerima bill</h2>
                        </CardHeader>
                        <CardContent>
                            {users.map((item: string, index: number) => (

                                <div className="flex items-center gap-2 py-2" key={index}>
                                    <Checkbox
                                        id="terms"
                                        checked={section[indexMain].customers.includes(index as never)}
                                        onCheckedChange={() => handleCheckboxChange(indexMain, index)}
                                    />
                                    <label
                                        htmlFor="terms"
                                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                    >
                                        {item}
                                    </label>
                                </div>
                            ))}
                        </CardContent>

                    </Card>

                    <Separator />

                    <div className='flex w-full mt-4 items-center justify-center gap-2'>

                        <Button
                            variant="destructive"
                            className="shrink-0 rounded-full"
                            onClick={() => handleDeleteSection(indexMain)}
                        >
                            Hapus bill ini
                        </Button>

                    </div>

                </div>
            </AccordionContent>
        </AccordionItem>
    )
}

export default ForSomeBill