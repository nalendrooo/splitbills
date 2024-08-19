'use client'

import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Minus, Plus } from "lucide-react"
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer"
import { Input } from '@/components/ui/input'
import { ScrollArea } from '@/components/ui/scroll-area'
import { placeholder } from '../../constants/constant'
import { useAtom, useSetAtom } from 'jotai'
import { customerAtom } from '@/lib/atom'

const FormAddPeopleDrawer = () => {
    const [customer, setCustomer] = useAtom(customerAtom)
    const [input, setInput] = useState<string[]>([''])

    const handleInputChange = (index: number, value: string) => {
        //Validate input number
        if (/\d/.test(value)) {
            return
        }

        setInput(prev => {
            const newInput = [...prev]
            newInput[index] = value
            return newInput
        })
    }

    const handleDeleteInput = (index: number) => {
        const newInput = input.filter((_, i) => i !== index)
        setInput(newInput)
    }

    const isDisabled = () => {
        return input.length <= 1 || input.some(item => item === '')
    }

    return (
        <Drawer onClose={() => setInput([''])}>
            <DrawerTrigger asChild>
                <Button>Tambah orang</Button>
            </DrawerTrigger>

            <DrawerContent>
                <div className="mx-auto max-h-[500px] w-full max-w-sm overflow-scroll">
                    <DrawerHeader>
                        <DrawerTitle>Yuk, Tambahin temenmu dulu!</DrawerTitle>
                        <DrawerDescription>Masukin temenmu yang jadi penerima splitbill.</DrawerDescription>
                    </DrawerHeader>

                    <div className="p-4 overflow-scroll">
                        <ScrollArea className="max-h-[120px]">


                            <div className='gap-2 flex flex-col'>

                                {input.map((item, index) => (
                                    <div className="flex items-center justify-center gap-2" key={index}>
                                        <Input
                                            // placeholder={placeholder[index]}
                                            placeholder='Nama temenmu...'
                                            type='text'
                                            value={item}
                                            onChange={e => handleInputChange(index, e.target.value)}
                                        />
                                        <Button
                                            variant="destructive"
                                            size="icon"
                                            className=" shrink-0 rounded-full"
                                            onClick={() => handleDeleteInput(index)}
                                            disabled={input.length === 1}
                                        >
                                            <Minus className="h-4 w-4" />
                                        </Button>
                                    </div>
                                ))}


                            </div>

                        </ScrollArea>
                        <div className="mt-4 h-[120px]">
                            <div className="flex items-center justify-center space-x-2">

                                <Button
                                    variant="outline"
                                    size="icon"
                                    className="shrink-0 rounded-full"
                                    onClick={() => setInput(prev => [...prev, ''])}
                                >
                                    <Plus className="h-4 w-4" />
                                </Button>
                            </div>
                        </div>
                    </div>

                    <div className="flex-1 text-center">
                        <div className="text-7xl font-bold tracking-tighter" style={{ fontSize: '5rem', fontWeight: 'bold' }}>
                            {input.length}
                        </div>
                        <div className="text-[0.70rem] uppercase text-muted-foreground">
                            Jumlah temen kamu
                        </div>
                    </div>

                    <DrawerFooter>
                        <Button
                            disabled={isDisabled()}
                            onClick={() => setCustomer(input)}>Submit</Button>
                        <DrawerClose asChild >
                            <Button variant="outline" onClick={() => setInput([''])}>Gak jadi!</Button>
                        </DrawerClose>
                    </DrawerFooter>
                </div>
            </DrawerContent>
        </Drawer>
    )
}

export default FormAddPeopleDrawer