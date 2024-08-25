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

import { Task, TaskType, useTaskStore } from '@/lib/store';
import { useEffect, useState } from 'react';
import { convertCurrencyToNumber, formatRupiah } from '@/lib/format';
import { Column } from './board-column';

interface NewTaskDialogProps {
  open: boolean
  onClose: () => void
  type: 'add' | 'edit'
  column: Column
  task?: Task
}

export default function NewTaskDialog({
  open,
  onClose,
  task,
  type,
  column
}: NewTaskDialogProps) {
  const addTask = useTaskStore((state) => state.addTask);
  const updateTask = useTaskStore((state) => state.updateTask);

  const initialItem = {
    title: '',
    id: '',
    price: 0,
    status: '',
    type: 'INDIVIDUAL' as TaskType
  }

  const [item, setItem] = useState<Task>(initialItem);
  // console.log(task)

  const handleSubmit = () => {
    if (task) {
      updateTask(item.id, item)
    } else {
      addTask(item)
    }
  };

  const onClosed = () => {
    setItem(initialItem)
    onClose()
  }

  useEffect(() => {
    if (column) {
      if (task) {
        setItem(task)
      } else {
        setItem({
          ...item,
          status: column.id
        })
      }
    }
  }, [column, task])

  return (
    <Dialog open={open} onOpenChange={onClosed}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{type === 'add' ? 'Tambah item baru' : 'Ubah item Ayam'}</DialogTitle>
          <DialogDescription>
            {type === 'add' ? `Mau nambahin item apa buat ${column?.title}?` : `Mau ubah item apa buat ${column?.title}?`}
          </DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-2 items-center gap-4">
          <Input
            id="title"
            name="title"
            placeholder="Nama item..."
            value={item.title}
            onChange={(e) => setItem({ ...item, title: e.target.value })}
          // className="col-span-2"
          />
          <Input
            id="title"
            name="title"
            value={formatRupiah(item.price)}
            onChange={(e) => setItem({ ...item, price: convertCurrencyToNumber(e.target.value) })}
          // className="col-span-2"
          />
        </div>

        <DialogFooter>
          <DialogTrigger asChild>
            <Button onClick={handleSubmit} disabled={!Boolean(item.title) || !Boolean(item.price)} size="sm" form="todo-form">
              {type === 'add' ? 'Tambah' : 'Simpan'}
            </Button>
          </DialogTrigger>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
