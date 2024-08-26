'use client';

import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { useToast } from '@/components/ui/use-toast';
import { errorNameUsedAtom } from '@/lib/stateman';
import { useTaskStore } from '@/lib/store';
import { useAtom } from 'jotai';
import { Ellipsis } from 'lucide-react';
import { Input } from '../ui/input';
import { NewTaskDialog } from './new-task-dialog';
import { Fragment, useEffect, useRef, useState } from 'react';
import { Column } from '@/interfaces/kanban';

export const ColumnActions = ({
  status,
  user
}: Column) => {

  const [name, setName] = useState('');
  const updateCol = useTaskStore((state) => state.updateCol);
  const removeCol = useTaskStore((state) => state.removeCol);
  const [editDisable, setIsEditDisable] = useState(true);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const columns = useTaskStore((state) => state.columns);

  const [errorNameUsed, setErrorNameUsed] = useAtom(errorNameUsedAtom);

  const [isAdd, setIsAdd] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let error
    if (user !== e.target.value && columns.find((col) => col.user === e.target.value)) {
      error = true
    } else {
      error = false
    }

    setErrorNameUsed({
      error,
      user
    });
    setName(e.target.value);
  };

  const handleBlur = () => {
    if (!errorNameUsed.error) {
      updateCol(status, name);
      setIsEditDisable(true);
      toastUpdate()
    }
  };

  const toastUpdate = () => {
    toast({
      title: 'Nama diubah',
      variant: 'default',
      description: `${user} diubah menjadi ${name}`
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    if (errorNameUsed.error) return;
    e.preventDefault();
    setIsEditDisable(prev => !prev);
    updateCol(status, name);
    toastUpdate()
  }

  const handleDelete = () => {
    setTimeout(() => (document.body.style.pointerEvents = ''), 100);
    setShowDeleteDialog(false);
    removeCol(status);
    toast({
      description: `${user} telah di hapus`,
    });

  }

  useEffect(() => {
    setName(user);
  }, [user]);
  return (
    <Fragment>
      <NewTaskDialog open={isAdd} onClose={() => setIsAdd(false)} type='add' column={{ status, user }} />
      <form
        onSubmit={handleSubmit}
      >
        <Input
          value={name}
          onChange={handleChange}
          className="!mt-0 mr-auto text-base disabled:cursor-pointer disabled:border-none disabled:opacity-100"
          disabled={editDisable}
          ref={inputRef}
          onBlur={handleBlur}
        />
      </form>

      <DropdownMenu modal={false}>
        <DropdownMenuTrigger asChild>
          <Button variant="secondary" className="ml-1">
            <span className="sr-only">Actions</span>
            <Ellipsis className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem
            onSelect={() => {
              if (errorNameUsed.error) return;
              setIsEditDisable(prev => !prev);
              setTimeout(() => {
                inputRef.current && inputRef.current?.focus();
              }, 500);
            }}
          >
            {editDisable ? 'Ubah nama' : 'Simpan nama'}
          </DropdownMenuItem>
          <DropdownMenuSeparator />

          <DropdownMenuItem
            onSelect={() => setIsAdd(true)}
          >
            Tambah item ({name})
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onSelect={() => setShowDeleteDialog(true)}
            className="text-red-600 font-semibold"
          >
            Hapus ({user})
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Kamu yakin ingin menghapus {user}?
            </AlertDialogTitle>
            <AlertDialogDescription>
              Catatan: Setiap item {user} ini akan ikut terhapus!
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <Button
              variant="destructive"
              onClick={handleDelete}
            >
              Hapus
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Fragment>
  );
}
