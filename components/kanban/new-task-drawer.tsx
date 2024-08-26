'use client';

import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useTaskStore } from '@/lib/store';
import { Drawer, DrawerContent, DrawerDescription, DrawerHeader, DrawerTitle, DrawerTrigger } from '../ui/drawer';
import Individu from './AddItemDrawer/Individu';
import SplitBeberapaOrang from './AddItemDrawer/SplitBeberapaOrang';
import SplitSemuaOrang from './AddItemDrawer/SplitSemuaOrang';


export const NewTaskDrawer = () => {
    const columns = useTaskStore((state) => state.columns);

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
                </div>

            </DrawerContent>
        </Drawer>
    )
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
