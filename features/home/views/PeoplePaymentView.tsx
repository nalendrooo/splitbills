import React, { useEffect, useMemo } from 'react'
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
import { alreadyPaidAtom, divideEvenlyAtom, forSomeAtom, individualAtom, usersAtom } from '@/lib/atom'
import { Separator } from '@/components/ui/separator'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { convertCurrencyToNumber, formatRupiah } from '@/lib/format'
import { format } from 'path'


const PeoplePaymentView = () => {
    const users = useAtomValue(usersAtom)



    const [alreadyPaid, setAlreadyPaid] = useAtom(alreadyPaidAtom)

    // console.log('unSelectedUser', unSelectedUser)



    const handleDeletePerson = (index: number) => {
        setAlreadyPaid(prev => prev.filter((_, i) => i !== index))
    }

    const structuredUser = users.map((user, index) => ({
        total: 0
    }))

    useEffect(() => {
        setAlreadyPaid(structuredUser)
    }, [users])

    const handleInputChange = (indexUser: number, value: number | string) => {

        let newValue = value

        newValue = convertCurrencyToNumber(value as string)


        setAlreadyPaid(prev => {
            const newAlreadyPaid = [...prev]
            newAlreadyPaid[indexUser] = {
                ...newAlreadyPaid[indexUser],
                total: newValue
            }
            return newAlreadyPaid
        })


        // setAlreadyPaid(prev => {
        //     const newAlreadyPaid = [...prev]
        //     newAlreadyPaid[indexItem] = {
        //         ...newAlreadyPaid[indexItem],
        //         [field]: newValue
        //     }
        //     return newAlreadyPaid
        // })
    }
    console.log('alreeady', alreadyPaid)

    const jumlahTerkumpul = alreadyPaid.map((item) => item.total).reduce((a, b) => a + b, 0)

    const [forSome] = useAtom(forSomeAtom)
    const [divideEvenly] = useAtom(divideEvenlyAtom)
    const [individual] = useAtom(individualAtom)

    const totalDivideEvenly = useMemo(() =>
        divideEvenly
            .map((item) => item.price)
            .reduce((a, b) => a + b, 0), [divideEvenly])

    const totalForSome = useMemo(() =>
        forSome.map((item) =>
            item.items
                .map((item) => item.price)
                .reduce((a, b) => a + b, 0))
            .reduce((a, b) => a + b, 0), [forSome])

    const totalIndividual = useMemo(() =>
        individual
            .map((item) =>
                item.items
                    .map((item) => item.price)
                    .reduce((a, b) => a + b, 0))
            .reduce((a, b) => a + b, 0), [individual])

    const totalPengeluaran = useMemo(() =>
        totalDivideEvenly + totalForSome + totalIndividual,
        [totalDivideEvenly, totalForSome, totalIndividual])

        const kurang =  totalPengeluaran - jumlahTerkumpul 

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
                            <Alert style={{ marginBlockEnd: '1rem' }} >
                                <AlertTitle>
                                    <p className='text-sm font-bold'>Jumlah pengeluaran tiap orang tidak termasuk kembalian!</p>
                                </AlertTitle>
                                <AlertDescription>
                                    <p className='text-xs'>Contoh: <span style={{ fontWeight: 'bold', textDecoration: 'underline' }}>{users[0]}</span> mengeluarkan <span style={{ fontStyle: 'italic' }}>Rp. 100.000</span> dan mendapat kembalian <span style={{ fontStyle: 'italic' }}>Rp. 20.000</span></p>
                                </AlertDescription>
                                <AlertDescription>
                                    <p className='text-xs ' style={{ marginBlockStart: '0.5rem' }}>Maka inputkan <span style={{ fontStyle: 'italic' }}>Rp. 80.000</span></p>
                                </AlertDescription>
                            </Alert>
                            <AccordionContent >

                                <div className='flex flex-col gap-2 '>

                                    <div className='flex flex-col gap-2'>

                                        {users.map((user: string, indexUser: number) => (
                                            <div className="flex items-end gap-2" key={indexUser}>
                                                <div>
                                                    <Input
                                                        value={user}
                                                        readOnly
                                                    // value={formatRupiah(item.total)}
                                                    />
                                                </div>
                                                <div>
                                                    <Input
                                                        value={alreadyPaid.length ? formatRupiah(alreadyPaid[indexUser].total) : formatRupiah(0)}
                                                        onChange={(e) => handleInputChange(indexUser, e.target.value)}
                                                    // value={formatRupiah(item.total)}
                                                    // onChange={(e) => handleInputChange(indexItem, 'total', e.target.value)}
                                                    />
                                                </div>

                                            </div>
                                        ))}

                                    </div>


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
                                                    
                                                    value={formatRupiah(jumlahTerkumpul)}
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
                                                />
                                            </div>
                                            <div>
                                                <Input
                                                    // value={item.price}
                                                    value={formatRupiah(totalPengeluaran)}
                                                    disabled
                                                // onChange={(e) => handleInputChange(indexItem, 'price', e.target.value)}
                                                />
                                            </div>
                                        </div>

                                        <Button className="rounded-full">{kurang > 0 ? `Kurang ${formatRupiah(kurang)}` : `Lebih ${formatRupiah(Math.abs(kurang))}`}</Button>

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