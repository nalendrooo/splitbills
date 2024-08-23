'use client';

import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '../ui/textarea';

import { useTaskStore } from '@/lib/store';
import { Drawer, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from '../ui/drawer';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Terminal } from 'lucide-react';
import { Alert, AlertDescription } from '../ui/alert';
import { Card, CardContent, CardHeader } from '../ui/card';
import { Checkbox } from '../ui/checkbox';
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"


export default function NewTaskDrawer() {
    const addTask = useTaskStore((state) => state.addTask);
    const columns = useTaskStore((state) => state.columns);
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const form = e.currentTarget;
        const formData = new FormData(form);
        const { title, description } = Object.fromEntries(formData);

        if (typeof title !== 'string' || typeof description !== 'string') return;
        addTask(title, description);
    };

    return (
        <Drawer >
            <DrawerTrigger asChild>
                <Button variant="secondary" size="sm">
                    ＋ Tambah item
                </Button>
            </DrawerTrigger>

            <DrawerContent >

                <div className="mx-auto min-w-sm max-w-sm flex  flex-col " style={{ minHeight: '80vh ' }} >
                    <DrawerHeader>
                        <DrawerTitle>Tambah item</DrawerTitle>
                        <DrawerDescription>
                            <p>Masukin itemnya dan pilih orangnya.</p>

                        </DrawerDescription>
                    </DrawerHeader>
                    <Tabs defaultValue="perorangan" className="w-[400px]">
                        <TooltipProvider delayDuration={100} >
                            <Tooltip defaultOpen>
                                <TooltipTrigger>
                                    <TabsList>
                                        <TabsTrigger value="perorangan">Perorangan</TabsTrigger>
                                        <TabsTrigger value="semua-orang">Semua orang</TabsTrigger>
                                        <TabsTrigger value="bagi-beberapa-orang">Bagi beberapa orang</TabsTrigger>
                                    </TabsList>
                                </TooltipTrigger>
                                <TooltipContent >
                                    <p>Kamu bisa pilih satu dari beberapa tipe penghitungan item</p>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>

                        <TabsContent value="perorangan">
                            <form
                                id="todo-form"
                                className="grid gap-4 py-4"
                                onSubmit={handleSubmit}
                            >
                                <div className="grid grid-cols-2 items-center gap-4">
                                    <Input
                                        id="title"
                                        name="title"
                                        placeholder="Nama item..."
                                    // className="col-span-2"
                                    />
                                    <Input
                                        id="title"
                                        name="title"
                                        value='Rp. 73.000'
                                        placeholder="Nama item..."
                                    // className="col-span-2"
                                    />
                                </div>



                            </form>
                            <Card>
                                <CardHeader>
                                    <h2 className="text-md font-semibold">Pilih penerima bill</h2>
                                </CardHeader>
                                <CardContent>
                                    {columns.map((item: any, index: number) => (

                                        <div className="flex items-center gap-2 py-2" key={index}>
                                            <Checkbox
                                                id="terms"
                                            // checked={section[indexMain].customers.includes(index as never)}
                                            // onCheckedChange={() => handleCheckboxChange(indexMain, index)}
                                            />
                                            <label
                                                htmlFor="terms"
                                                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                            >
                                                {item.title}
                                            </label>
                                        </div>
                                    ))}
                                </CardContent>

                            </Card>
                            <Alert className='mt-4'>
                                <Terminal className="h-4 w-4" />
                                <AlertDescription>
                                    <p className='text-xs'>Setiap orang mendapat bills Rp. 73.000</p>
                                </AlertDescription>
                            </Alert>
                        </TabsContent>
                        <TabsContent value="semua-orang">
                            <form
                                id="todo-form"
                                className="grid gap-4 py-4"
                                onSubmit={handleSubmit}
                            >
                                <div className="grid grid-cols-2 items-center gap-4">
                                    <Input
                                        id="title"
                                        name="title"
                                        placeholder="Nama item..."
                                    // className="col-span-2"
                                    />
                                    <Input
                                        id="title"
                                        name="title"
                                        value='Rp. 100.000'
                                        placeholder="Nama item..."
                                    // className="col-span-2"
                                    />
                                </div>



                            </form>

                            <Alert className='mt-4'>
                                <Terminal className="h-4 w-4" />
                                <AlertDescription>
                                    <p className='text-xs'>Setiap orang mendapat bills Rp. 40.000</p>
                                </AlertDescription>
                            </Alert>
                        </TabsContent>
                        <TabsContent value="bagi-beberapa-orang">
                            <form
                                id="todo-form"
                                className="grid gap-4 py-4"
                                onSubmit={handleSubmit}
                            >
                                <div className="grid grid-cols-2 items-center gap-4">
                                    <Input
                                        id="title"
                                        name="title"
                                        placeholder="Nama item..."
                                    // className="col-span-2"
                                    />
                                    <Input
                                        id="title"
                                        name="title"
                                        value='Rp. 120.000'
                                        placeholder="Nama item..."
                                    // className="col-span-2"
                                    />
                                </div>



                            </form>
                            <Card>
                                <CardHeader>
                                    <h2 className="text-md font-semibold">Pilih penerima bill</h2>
                                </CardHeader>
                                <CardContent>
                                    {columns.map((item: any, index: number) => (

                                        <div className="flex items-center gap-2 py-2" key={index}>
                                            <Checkbox
                                                id="terms"
                                            // checked={section[indexMain].customers.includes(index as never)}
                                            // onCheckedChange={() => handleCheckboxChange(indexMain, index)}
                                            />
                                            <label
                                                htmlFor="terms"
                                                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                            >
                                                {item.title}
                                            </label>
                                        </div>
                                    ))}
                                </CardContent>

                            </Card>
                            <Alert className='mt-4'>
                                <Terminal className="h-4 w-4" />
                                <AlertDescription>
                                    <p className='text-xs'>Bill dibagi ke 3 orang.</p>
                                    <p className='text-xs'>Setiap orang mendapat bills Rp. 60.000</p>
                                </AlertDescription>
                            </Alert>
                        </TabsContent>
                    </Tabs>


                    <DrawerFooter className='  w-full'>
                        <Button>Tambah</Button>
                        <Button variant='outline'>Batal</Button>
                    </DrawerFooter>
                </div>

            </DrawerContent>
        </Drawer>
    )

    //   return (
    //     <Dialog>
    //       <DialogTrigger asChild>
    //         <Button variant="secondary" size="sm">
    //           ＋ Tambah item
    //         </Button>
    //       </DialogTrigger>
    //       <DialogContent className="sm:max-w-[425px]">
    //         <DialogHeader>
    //           <DialogTitle>Add New Item</DialogTitle>
    //           <DialogDescription>
    //             What do you want to get done today?
    //           </DialogDescription>
    //         </DialogHeader>
    //         <form
    //           id="todo-form"
    //           className="grid gap-4 py-4"
    //           onSubmit={handleSubmit}
    //         >
    //           <div className="grid grid-cols-4 items-center gap-4">
    //             <Input
    //               id="title"
    //               name="title"
    //               placeholder="Todo title..."
    //               className="col-span-4"
    //             />
    //           </div>
    //           <div className="grid grid-cols-4 items-center gap-4">
    //             <Textarea
    //               id="description"
    //               name="description"
    //               placeholder="Description..."
    //               className="col-span-4"
    //             />
    //           </div>
    //         </form>
    //         <DialogFooter>
    //           <DialogTrigger asChild>
    //             <Button type="submit" size="sm" form="todo-form">
    //               Add Todo
    //             </Button>
    //           </DialogTrigger>
    //         </DialogFooter>
    //       </DialogContent>
    //     </Dialog>
    //   );
}
