'use client'

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Badge } from "@/components/ui/badge"
import { Button } from '@/components/ui/button'
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
import { usersAtom } from '@/lib/atom'
import { useSetAtom } from 'jotai'
import { Plus } from "lucide-react"
import { useState } from 'react'

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"


const FormAddPeopleDrawer = () => {
    const setUsersAtom = useSetAtom(usersAtom)
    const [users, setUsers] = useState<string[]>([])
    const [input, setInput] = useState<string>('')

    const [selectedUser, setSelectedUser] = useState({
        name: '',
        index: 1000
    })

    const handleInputChange = (value: string) => {
        //Validate input number
        if (/\d/.test(value)) {
            return
        }

        setInput(value)
    }

    const handleSubmit = () => {
        setUsersAtom(users)
    }

    const handleAddUser = () => {
        setUsers(prev => [...prev, input])
        setInput('')
    }

    const handleDeleteUser = (index: number) => {
        setUsers(prev => prev.filter((_, i) => i !== index))
        resetSelectedUser()
    }

    const resetSelectedUser = () => {
        setSelectedUser({ name: '', index: 1000 })
    }

    const handleCancel = () => {
        setUsers([])
        resetSelectedUser()
    }

    return (
        <>

            <Drawer >
                <DrawerTrigger asChild>
                    <Button>Tambah penerima dulu!</Button>
                </DrawerTrigger>

                <DrawerContent >

                    <div className="mx-auto min-w-sm max-w-sm flex  flex-col " style={{ minHeight: '80vh ' }}>
                        <DrawerHeader>
                            <DrawerTitle>Yuk, Tambahin temenmu dulu!</DrawerTitle>
                            <DrawerDescription>Masukin temenmu yang jadi penerima splitbill.</DrawerDescription>
                        </DrawerHeader>

                        <div className="p-4 ">
                            <div className="rounded-md border p-4 gap-2  flex flex-col ">
                                <div className='max-w-sm  gap-2 flex justify-center items-center pb-4' style={{ flexWrap: 'wrap' }}>
                                    {users.map((item, index) => (
                                        <>
                                            <AlertDialog key={index}>
                                                <AlertDialogTrigger>
                                                    <Badge
                                                        variant={selectedUser.index === index ? 'destructive' : 'default'}
                                                        className='px-2 mx-2'
                                                        onClick={() => setSelectedUser(prev => ({ ...prev, name: item, index }))}>{item}
                                                    </Badge>
                                                </AlertDialogTrigger>
                                                <AlertDialogContent>
                                                    <AlertDialogHeader>
                                                        <AlertDialogTitle>Beneran mau hapus {selectedUser.name}?</AlertDialogTitle>
                                                        <AlertDialogDescription>
                                                            Kalo dihapus beneran, nanti masih bisa masukin lagi sih. Yaudah hapus aja!
                                                        </AlertDialogDescription>
                                                    </AlertDialogHeader>
                                                    <AlertDialogFooter>
                                                        <AlertDialogCancel
                                                            onClick={resetSelectedUser}
                                                        >
                                                            Ga
                                                        </AlertDialogCancel>
                                                        <AlertDialogAction
                                                            onClick={() => handleDeleteUser(index)}
                                                        >
                                                            Ya
                                                        </AlertDialogAction>
                                                    </AlertDialogFooter>
                                                </AlertDialogContent>
                                            </AlertDialog>


                                        </>
                                    ))}
                                </div>
                                <div className='gap-2 flex flex-col'>

                                    {/* {input.map((item, index) => ( */}
                                    <div className="flex items-center justify-center gap-2" >
                                        <Input
                                            placeholder='Nama temenmu...'
                                            type='text'
                                            value={input}
                                            onChange={e => handleInputChange(e.target.value)}
                                        // value={item}
                                        // onChange={e => handleInputChange(index, e.target.value)}
                                        />
                                        <Button
                                            variant="destructive"
                                            size="icon"
                                            className=" shrink-0 rounded-full"
                                            onClick={handleAddUser}
                                            // onClick={() => handleDeleteInput(index)}
                                            disabled={!input}
                                        >
                                            <Plus className="h-4 w-4" />
                                        </Button>
                                    </div>
                                    {/* ))} */}

                                </div>

                            </div>

                            {users.length === 1 &&
                                <Alert className='mt-4'>
                                    <AlertDescription>
                                        <p className='text-xs'>Minimal 2 temen dulu buat lanjut!</p>
                                    </AlertDescription>
                                </Alert>
                            }

                            {users.length > 0 &&
                                <Alert className='mt-4'>
                                    <AlertTitle>
                                        <p className='text-sm font-bold'>Mau hapus nama temenmu?</p>
                                    </AlertTitle>
                                    <AlertDescription>
                                        <p className='text-xs'>Klik nama temen kamu yang mau dihapus, terus "Ya"</p>
                                    </AlertDescription>
                                </Alert>
                            }

                        </div>

                        <DrawerFooter>
                            <div className="flex-1 text-center">
                                <div className="text-7xl font-bold tracking-tighter" style={{ fontSize: '5rem', fontWeight: 'bold' }}>
                                    {users.length}
                                </div>
                                <div className="text-[0.70rem] uppercase text-muted-foreground">
                                    Jumlah temen kamu.
                                </div>
                            </div>
                            <Button
                                disabled={users.length < 2}
                                onClick={handleSubmit}
                            >Submit</Button>
                            <DrawerClose asChild >
                                <Button variant="outline" onClick={handleCancel}>Gak jadi!</Button>
                            </DrawerClose>
                        </DrawerFooter>
                    </div>
                </DrawerContent>
            </Drawer>
        </>
    )
}

export default FormAddPeopleDrawer