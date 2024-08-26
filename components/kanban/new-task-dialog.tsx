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
import { initialItem } from '@/constants/kanban';
import { Column, Task, TaskType } from '@/interfaces/kanban';
import { convertCurrencyToNumber, formatRupiah } from '@/lib/format';
import { useTaskStore } from '@/lib/store';
import { useEffect, useState } from 'react';

interface NewTaskDialogProps {
  open: boolean
  onClose: () => void
  type: 'add' | 'edit'
  column: Column
  task?: Task
}

export const NewTaskDialog = ({
  open,
  onClose,
  task,
  type,
  column
}: NewTaskDialogProps) => {
  const addTask = useTaskStore((state) => state.addTask);
  const updateTask = useTaskStore((state) => state.updateTask);

  const [item, setItem] = useState<Task>(initialItem);

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
          status: column.status
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
            {type === 'add' ? `Mau nambahin item apa buat ${column?.user}?` : `Mau ubah item apa buat ${column?.user}?`}
          </DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-2 items-center gap-4">
          <Input
            placeholder="Nama item..."
            value={item.title}
            onChange={(e) => setItem({ ...item, title: e.target.value })}
          />
          <Input
            value={formatRupiah(item.price)}
            onChange={(e) => setItem({ ...item, price: convertCurrencyToNumber(e.target.value) })}
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
