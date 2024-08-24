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

export default function NewTaskDialog({
  open,
  task,
  onClose,
  type
}: any) {
  const addTask = useTaskStore((state) => state.addTask);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;
    const formData = new FormData(form);
    const { title, description } = Object.fromEntries(formData);

    if (typeof title !== 'string' || typeof description !== 'string') return;
    // addTask(title, description);
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{type === 'add' ? 'Tambah item baru' : 'Ubah item Ayam'}</DialogTitle>
          <DialogDescription>
            {type === 'add' ? 'Mau nambahin item apa buat Nalendro?' : 'Mau ubah item apa buat Nalendro?'}
          </DialogDescription>
        </DialogHeader>
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
              onChange={() => { }}
              placeholder="Nama item..."
            // className="col-span-2"
            />
          </div>



        </form>
        <DialogFooter>
          <DialogTrigger asChild>
            <Button type="submit" size="sm" form="todo-form">
              {type === 'add' ? 'Tambah' : 'Simpan'}
            </Button>
          </DialogTrigger>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
