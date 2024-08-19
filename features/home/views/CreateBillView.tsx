'use client'
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { customerAtom } from '@/lib/atom'
import { useAtom } from 'jotai'
import { Minus, Plus, Scale, Users } from 'lucide-react'
import { useEffect, useState } from 'react'
import { ICustomer, IItem } from '../interface'
import { placeholder } from "../constants/constant"
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { Checkbox } from "@/components/ui/checkbox"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"



const CreateBillView = () => {
    const [customerAtomValue, setCustomerAtom] = useAtom(customerAtom)
    const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);

    const structuredData = placeholder.map(name => ({
        name: name,
        items: [
            {
                item: '',
                price: 'Rp. 0'
            },
        ]
    }));

    const [customer, setCustomer] = useState<ICustomer[]>(structuredData)


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


    const validateItems = () => {
        return customer.some(user =>
            user.items.some((item: IItem) =>
                item.item.trim() === '' || item.price === 'Rp. 0'
            )
        );
    };

    useEffect(() => {
        setIsSubmitDisabled(validateItems());
    }, [customer]);

    const handleReset = () => {
        setCustomerAtom([''])
        setCustomer(prev => {
            return prev.map(user => ({
                ...user,
                items: user.items.map(() => ({
                    item: '',
                    price: 'Rp. 0'
                }))
            }));
        });

    };

    return (
        <div className='min-h-screen flex p-4 gap-2 flex-col justify-between'>

            <div>
                <Accordion type='multiple' className="w-full px-2">
                    {customer.map((cust, indexUser) => (

                        <AccordionItem value={indexUser.toString()} key={indexUser}>
                            <AccordionTrigger className='hover:no-underline'>
                                <Avatar>
                                    {/* <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" /> */}
                                    <AvatarFallback>{cust.name[0] + cust.name[1]}</AvatarFallback>
                                </Avatar>
                                <Label className='text-xl'>{cust.name}</Label>
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
                                                    disabled={cust.items.length === 1}
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

                <Accordion type='multiple' className="w-full px-2">
                    <AccordionItem value={'new'} key={210}>
                        <AccordionTrigger className='hover:no-underline'>
                            <Button
                                variant="outline"
                                size="icon"
                                className="shrink-0 rounded-full"
                            // onClick={() => handleAddItem(indexUser)}
                            >
                                <Scale className="h-4 w-4" />
                            </Button>
                            <Label className='text-xl'>Bagi Rata</Label>

                        </AccordionTrigger>
                        <AccordionContent >

                            <div className='flex flex-col gap-2 '>

                                <div className='flex flex-col gap-2'>

                                    {/* {cust.items.map((item: IItem, indexItem: number) => ( */}

                                    <div className="flex items-end gap-2" key={0}>

                                        <div>
                                            <Input
                                                placeholder='Pajak'
                                            // value={item.item}
                                            // onChange={(e) => handleInputChange(indexUser, indexItem, 'item', e.target.value)}
                                            />
                                        </div>
                                        <div>
                                            <Input
                                            // value={item.price}
                                            // onChange={(e) => handleInputChange(indexUser, indexItem, 'price', e.target.value)}
                                            />
                                        </div>

                                        <Button
                                            size="icon"
                                            variant="destructive"
                                            className="shrink-0 rounded-full "
                                        // onClick={() => handleDeleteItem(indexUser, indexItem)}
                                        // disabled={cust.items.length === 1}
                                        >
                                            <Minus className="h-6 w-6" />
                                        </Button>


                                    </div>
                                    {/* ))} */}


                                </div>
                                <div className='flex w-full items-center justify-center '>

                                    <Button
                                        variant="outline"
                                        size="icon"
                                        className="shrink-0 rounded-full"
                                    // onClick={() => handleAddItem(indexUser)}
                                    >
                                        <Plus className="h-4 w-4" />
                                    </Button>
                                </div>




                            </div>
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value={'news'} key={0}>
                        <AccordionTrigger className='hover:no-underline'>
                            <Button
                                variant="outline"
                                size="icon"
                                className="shrink-0 rounded-full"
                            // onClick={() => handleAddItem(indexUser)}
                            >
                                <Users className="h-4 w-4" />
                            </Button>
                            <Label className='text-xl'>Bagi Sebagian 1</Label>

                        </AccordionTrigger>
                        <AccordionContent >

                            <div className='flex flex-col gap-2 '>

                                <div className='flex flex-col gap-2'>

                                    {/* {cust.items.map((item: IItem, indexItem: number) => ( */}

                                    <div className="flex items-end gap-2" key={1212}>

                                        <div>
                                            <Input
                                                placeholder='Bensin'
                                            // value={item.item}
                                            // onChange={(e) => handleInputChange(indexUser, indexItem, 'item', e.target.value)}
                                            />
                                        </div>
                                        <div>
                                            <Input
                                            // value={item.price}
                                            // onChange={(e) => handleInputChange(indexUser, indexItem, 'price', e.target.value)}
                                            />
                                        </div>

                                        <Button
                                            size="icon"
                                            variant="destructive"
                                            className="shrink-0 rounded-full "
                                        // onClick={() => handleDeleteItem(indexUser, indexItem)}
                                        // disabled={cust.items.length === 1}
                                        >
                                            <Minus className="h-6 w-6" />
                                        </Button>


                                    </div>
                                    {/* ))} */}


                                </div>
                                <div className='flex w-full items-center justify-center '>

                                    <Button
                                        variant="outline"
                                        size="icon"
                                        className="shrink-0 rounded-full"
                                    // onClick={() => handleAddItem(indexUser)}
                                    >
                                        <Plus className="h-4 w-4" />
                                    </Button>
                                </div>
                                <Card>
                                    <CardHeader>
                                        {/* <CardTitle>Tambah penerima</CardTitle> */}
                                        <h2 className="text-lg font-semibold">Pilih penerima bill</h2>
                                        {/* <CardDescription>Card Description</CardDescription> */}
                                    </CardHeader>
                                    <CardContent>
                                        {placeholder.map((item: string, index: number) => (

                                            <div className="flex items-center gap-2 py-2">
                                                <Checkbox id="terms" />
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
                                        // size="icon"
                                        className="shrink-0 rounded-full"
                                    // onClick={() => handleAddItem(indexUser)}
                                    >
                                        Hapus bill
                                    </Button>

                                </div>




                            </div>
                        </AccordionContent>
                    </AccordionItem>


                </Accordion>
            </div>


            <div className='flex gap-2 w-full flex-col px-2'>
                <DropdownMenu >
                    <DropdownMenuTrigger asChild>
                        <Button
                            // variant="secondary"
                            size="icon"
                            className="shrink-0 rounded-full "
                        // onClick={() => handleAddItem(indexUser)}
                        >
                            <Plus className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuLabel>Type bills</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>Bagi Sebagian</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>


                <Button
                    disabled={isSubmitDisabled}
                >
                    Buat Bills Sekarang!
                </Button>
                <Button
                    variant="outline"
                    onClick={handleReset}
                >
                    Gak jadi!
                </Button>
            </div>
        </div >
    )
}

export default CreateBillView