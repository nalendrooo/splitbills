'use client'

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
import { useTaskStore } from '@/lib/store';
import { Textarea } from '../ui/textarea';
import { useState } from 'react';
import axios from 'axios'
import { useRouter } from 'next/navigation';

const ActionSubmit = () => {
    const tasks = useTaskStore((state) => state.tasks);
    const columns = useTaskStore((state) => state.columns);
    const resetTasks = useTaskStore((state) => state.resetTasks);
    const resetCols = useTaskStore((state) => state.resetCols);
    const [keterangan, setKeterangan] = useState({
        creator: '',
        description: '',
    });
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [openModal, setOpenModal] = useState(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        setIsLoading(true);
        const data = await axios.post('/api/bills', {
            keterangan,
            tasks,
            columns
        })

        if (data?.status === 200) {
            router.push('/bills/' + data.data.data.code)
            setKeterangan({
                creator: '',
                description: '',
            })
            resetCols()
            resetTasks()
        }
        setOpenModal(false)

        setIsLoading(false)
    }
    return (
        <Dialog open={openModal} onOpenChange={isLoading ? () => { } : setOpenModal}>
            <DialogTrigger asChild onClick={() => setOpenModal(true)} >
                <div className='w-full'>
                    <Button
                        className='w-full'
                        disabled={tasks.length === 0}
                    >
                        Lanjutkan
                    </Button>
                </div>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Keterangan</DialogTitle>
                    <DialogDescription>
                        Tambahkan keterangan (optional)
                    </DialogDescription>
                </DialogHeader>
                <form
                    id="todo-form"
                    className="grid gap-4 py-4"
                    onSubmit={handleSubmit}
                >
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Input
                            placeholder="Nama pembuat..."
                            className="col-span-4"
                            disabled={isLoading}
                            value={keterangan.creator}
                            onChange={(e) => setKeterangan({ ...keterangan, creator: e.target.value })}
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Textarea
                            placeholder="Description..."
                            className="col-span-4"
                            disabled={isLoading}
                            value={keterangan.description}
                            onChange={(e) => setKeterangan({ ...keterangan, description: e.target.value })}
                        />
                    </div>
                </form>
                <DialogFooter>
                    {/* <DialogTrigger asChild> */}
                    <Button disabled={isLoading} className='w-full' type="submit" size="sm" form="todo-form">
                        {isLoading ? 'Loading...' : 'Submit'}
                    </Button>
                    {/* </DialogTrigger> */}
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}

export default ActionSubmit