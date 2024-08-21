'use client'
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import {
    Avatar,
    AvatarFallback
} from "@/components/ui/avatar"
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { individualAtom, usersAtom } from '@/lib/atom'
import { useAtom, useAtomValue } from 'jotai'
import { Minus, Plus } from 'lucide-react'
import { useEffect } from 'react'
import { IItem } from '../interface'


const IndividualBill = () => {
    const users = useAtomValue(usersAtom)

    const structuredData = users.map((_, index) => ({
        items: [
            {
                item: '',
                price: 'Rp. 0'
            },
        ]
    }));

    const [customer, setCustomer] = useAtom(individualAtom)

    useEffect(() => {
        setCustomer(structuredData)
    }, [users])

    const handleAddItem = (indexUser: number) => {

        setCustomer(prev => {
            const newCustomer = [...prev];
            newCustomer[indexUser] = {
                ...newCustomer[indexUser],
                items: [
                    ...newCustomer[indexUser].items,
                    {
                        item: '',
                        price: 'Rp. 0'
                    }
                ]
            };
            return newCustomer;
        });
    }

    const handleDeleteItem = (indexUser: number, indexItem: number) => {
        setCustomer(prev => {
            const newCustomer = [...prev];
            newCustomer[indexUser] = {
                ...newCustomer[indexUser],
                items: newCustomer[indexUser].items.filter((_: IItem, i: number) => i !== indexItem)
            };
            return newCustomer;
        });
    }

    const handleInputChange = (indexUser: number, indexItem: number, field: string, value: string) => {
        let newValue = value;

        if (field === 'price') {
            const numericValue = value.replace(/\D/g, '');
            const formattedValue = new Intl.NumberFormat('id-ID').format(Number(numericValue));

            newValue = `Rp. ${formattedValue}`;
        }

        setCustomer(prev => {
            const newCustomer = [...prev];
            newCustomer[indexUser] = {
                ...newCustomer[indexUser],
                items: newCustomer[indexUser].items.map((item: IItem, i: number) =>
                    i === indexItem ? { ...item, [field]: newValue } : item
                )
            };
            return newCustomer;
        });
    };


    // const validateItems = () => {
    //     return customer.some(user =>
    //         user.items.some((item: IItem) =>
    //             item.item.trim() === '' || item.price === 'Rp. 0'
    //         )
    //     );
    // };

    // useEffect(() => {
    //     setIsSubmitDisabled(validateItems());
    // }, [customer]);

    // const handleReset = () => {
    //     setCustomerAtom([''])
    //     setCustomer(prev => {
    //         return prev.map(user => ({
    //             ...user,
    //             items: user.items.map(() => ({
    //                 item: '',
    //                 price: 'Rp. 0'
    //             }))
    //         }));
    //     });

    // };
    return (
        <Accordion type='multiple' className="w-full px-2">
            {customer.map((cust, indexUser) => (

                <AccordionItem value={indexUser.toString()} key={indexUser}>
                    <AccordionTrigger className='hover:no-underline'>
                        <Avatar>
                            <AvatarFallback>{users[indexUser][0] + (users[indexUser][1] ? users[indexUser][1] : '')}</AvatarFallback>
                        </Avatar>
                        <Label className='text-xl'>{users[indexUser]}</Label>
                    </AccordionTrigger>
                    <AccordionContent >

                        <div className='flex flex-col gap-2 '>

                            <div className='flex flex-col gap-2'>

                                {cust.items.map((item: IItem, indexItem: number) => (

                                    <div className="flex items-end gap-2" key={indexItem}>

                                        <div>
                                            <Input
                                                placeholder='Matcha Latte'
                                                value={item.item}
                                                onChange={(e) => handleInputChange(indexUser, indexItem, 'item', e.target.value)}
                                            />
                                        </div>
                                        <div>
                                            <Input
                                                value={item.price}
                                                onChange={(e) => handleInputChange(indexUser, indexItem, 'price', e.target.value)}
                                            />
                                        </div>

                                        <Button
                                            size="icon"
                                            variant="destructive"
                                            className="shrink-0 rounded-full "
                                            onClick={() => handleDeleteItem(indexUser, indexItem)}
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
                                    onClick={() => handleAddItem(indexUser)}
                                >
                                    <Plus className="h-4 w-4" />
                                </Button>
                            </div>




                        </div>
                    </AccordionContent>
                </AccordionItem>
            ))}





        </Accordion>
    )
}

export default IndividualBill