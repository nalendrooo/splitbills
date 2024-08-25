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

import { Task, useTaskStore } from '@/lib/store';
import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from '../ui/drawer';
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
import { ScrollArea } from '../ui/scroll-area';
import { Badge } from '../ui/badge';
import { Separator } from '../ui/separator';
import Individu from './AddItemDrawer/Individu';
import SplitSemuaOrang from './AddItemDrawer/SplitSemuaOrang';
import SplitBeberapaOrang from './AddItemDrawer/SplitBeberapaOrang';
import { useState } from 'react';


export default function NewTaskDrawer() {
    // const addTask = useTaskStore((state) => state.addTask);
    const columns = useTaskStore((state) => state.columns);

    const [item, setItem] = useState<Task[]>([])


    const handleSubmit = () => {
        console.log(item)
        setItem([])
        // e.preventDefault();

        // const form = e.currentTarget;
        // const formData = new FormData(form);
        // const { title, description } = Object.fromEntries(formData);

        // if (typeof title !== 'string' || typeof description !== 'string') return;
        // addTask(title, description);
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
                            Masukin itemnya dan pilih orangnya.
                        </DrawerDescription>
                    </DrawerHeader>
                    <Tabs defaultValue="individu" className="w-[400px]">

                        <TabsList>
                            <TabsTrigger value="individu">Individu</TabsTrigger>
                            <TabsTrigger value="split-semua-orang">Split semua orang</TabsTrigger>
                            <TabsTrigger value="split-beberapa-orang">Split beberapa orang</TabsTrigger>
                        </TabsList>


                        <Individu columns={columns} />
                        <SplitSemuaOrang columns={columns} />
                        <SplitBeberapaOrang columns={columns} />

                    </Tabs>


                    {/* <DrawerFooter className='w-full'>
                        <DrawerClose asChild>

                            <Button onClick={() => handleSubmit()}>Tambah</Button>

                        </DrawerClose>
                        <DrawerClose asChild>

                            <Button variant='outline' onClick={() => alert('cancel')}>Batal</Button>

                        </DrawerClose>
                    </DrawerFooter> */}
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
