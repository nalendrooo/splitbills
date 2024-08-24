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

import { useTaskStore } from '@/lib/store';
import { useState } from 'react';

export default function NewSectionDialog() {
  const addCol = useTaskStore((state) => state.addCol);
  const columns = useTaskStore((state) => state.columns);

  const [errorNameUsed, setErrorNameUsed] = useState(false);
  const [name, setName] = useState('')

  const handleSubmit = () => {
    if (errorNameUsed) return;
    addCol(name);
    setErrorNameUsed(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (columns.find((col) => col.title === e.target.value)) {
      setErrorNameUsed(true);
    } else {
      setErrorNameUsed(false);
    }
    setName(e.target.value);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="secondary" size="lg" className="w-full">
          ＋ Tambah orang
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Tambahin nama temen kamu!</DialogTitle>
          <DialogDescription>
            Temen kamu yang akan ditambahkan sebagai penerima splitbill.
          </DialogDescription>
        </DialogHeader>
        <form
          id="todo-form"
          className="grid gap-2 py-4"
          onSubmit={handleSubmit}
        >
          <div className="grid grid-cols-4 items-center gap-4">
            <Input
              id="title"
              name="title"
              placeholder="Nama temen kamu..."
              className="col-span-4"
              onChange={handleChange}
            />
          </div>
          {errorNameUsed && <p className='text-red-600 font-semibold text-start text-xs pt-2'>Error: Nama sudah digunakan</p>}
        </form>
        <DialogFooter>
          <DialogTrigger asChild>
            <Button type="submit" size="sm" form="todo-form" disabled={errorNameUsed || !name}>
              Tambah
            </Button>
          </DialogTrigger>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
