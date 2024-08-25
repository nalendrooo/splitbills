'use client';
// import { DotsHorizontalIcon } from '@radix-ui/react-icons';
import * as React from 'react';

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
import { useTaskStore } from '@/lib/store';
import { UniqueIdentifier } from '@dnd-kit/core';
import { Input } from '../ui/input';
import { Ellipsis, EllipsisVertical } from 'lucide-react';
import { Badge } from '../ui/badge';
import { useAtom } from 'jotai';
import { errorNameUsedAtom } from '@/lib/stateman';
import NewTaskDialog from './new-task-dialog';

export function ColumnActions({
  title,
  id
}: {
  title: string;
  id: UniqueIdentifier;
}) {
  const [open, setIsOpen] = React.useState(false);
  const [name, setName] = React.useState(title);
  const updateCol = useTaskStore((state) => state.updateCol);
  const removeCol = useTaskStore((state) => state.removeCol);
  const [editDisable, setIsEditDisable] = React.useState(true);
  const [showDeleteDialog, setShowDeleteDialog] = React.useState(false);
  const inputRef = React.useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const columns = useTaskStore((state) => state.columns);
  // console.log(title)
  // const name = columns.find((col) => col.id === id)?.title
  // React.useEffect(() => {
  //   if (columns.length === 1 && columns[0].title === 'Nama') {
  //     setIsEditDisable(false);
  //     setTimeout(() => {
  //       inputRef.current && inputRef.current?.focus();
  //     }, 500);
  //   }
  // }, []);
  const [errorNameUsed, setErrorNameUsed] = useAtom(errorNameUsedAtom);
  // const [rename, setRename] = React.useState('');

  const addTask = useTaskStore((state) => state.addTask);
  const [isAdd, setIsAdd] = React.useState(false);


  const handleAddTask = () => {
    // addTask({
    //   id: '',
    //   title: 'yam',
    //   price: 10000,
    //   status: id,
    //   type: 'INDIVIDUAL'
    // })
    setIsAdd(true)
    // console.log(title, id)
  };
  

  // React.useEffect(() => {
  //   if (columns.find((col) => col.title === name)) {
  //     setErrorNameUsed(true);
  //   } else {
  //     setErrorNameUsed(false);
  //   }
  // }, [name, columns]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (title !== e.target.value && columns.find((col) => col.title === e.target.value)) {
      setErrorNameUsed({
        error: true,
        title
      });
    } else {
      setErrorNameUsed({
        error: false,
        title
      });
    }
    setName(e.target.value);
  };

  const handleBlur = () => {
    if (!errorNameUsed.error) {
      updateCol(id, name);
      setIsEditDisable(true);
      toastUpdate()
    }
  };

  const toastUpdate = () => {
    toast({
      title: 'Nama diubah',
      variant: 'default',
      description: `${title} diubah menjadi ${name}`
    });
  };

  return (
    <>
     <NewTaskDialog open={isAdd} onClose={() => setIsAdd(false)} type='add' column={{id, title}}/>
      <form
        onSubmit={(e) => {
          if (errorNameUsed.error) return;
          e.preventDefault();
          setIsEditDisable(prev => !prev);
          updateCol(id, name);
          toastUpdate()
        }}
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
            onSelect={handleAddTask}
          // className="text-red-600"
          >
            Tambah item ({name})
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onSelect={() => setShowDeleteDialog(true)}
            className="text-red-600 font-semibold"
          >
            Hapus ({title})
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Kamu yakin ingin menghapus {title}?
            </AlertDialogTitle>
            <AlertDialogDescription>
              Catatan: Setiap item {title} ini akan ikut terhapus!
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <Button
              variant="destructive"
              onClick={() => {
                // yes, you have to set a timeout
                setTimeout(() => (document.body.style.pointerEvents = ''), 100);

                setShowDeleteDialog(false);
                removeCol(id);
                toast({
                  description: 'This column has been deleted.'
                });

              }}
            >
              Delete
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
