import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { Column, ColumnDragData, Task } from '@/interfaces/kanban';
import { formatRupiah } from '@/lib/format';
import { errorNameUsedAtom } from '@/lib/stateman';
import { useDndContext } from '@dnd-kit/core';
import { SortableContext, useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { cva } from 'class-variance-authority';
import { useAtomValue } from 'jotai';
import { GripVertical } from 'lucide-react';
import { useMemo } from 'react';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader } from '../ui/card';
import { ColumnActions } from './column-action';
import { TaskCard } from './task-card';

interface IPropsBoardColumn {
  column: Column;
  tasks: Task[];
  isOverlay?: boolean;
}

export const BoardColumn = ({ column, tasks, isOverlay }: IPropsBoardColumn) => {

  const errorNameUsed = useAtomValue(errorNameUsedAtom)

  const tasksIds = useMemo(() => {
    return tasks.map((task) => task.id);
  }, [tasks]);

  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging
  } = useSortable({
    id: column.status,
    data: {
      type: 'Column',
      column
    } satisfies ColumnDragData,
    attributes: {
      roleDescription: `Column: ${column.user}`
    }
  });

  const style = {
    transition,
    transform: CSS.Translate.toString(transform)
  };

  const variants = cva(
    'h-[75vh] max-h-[75vh] w-[300px] max-w-full bg-secondary flex flex-col flex-shrink-0 snap-center',
    {
      variants: {
        dragging: {
          default: 'border-2 border-transparent',
          over: 'ring-2 opacity-30',
          overlay: 'ring-2 ring-primary'
        }
      }
    }
  );

  const total = tasks.map((task) => task.price).reduce((a, b) => a + b, 0);
  const totalItem = tasks.map((task) => task.status === column.status).length

  return (
    <Card
      ref={setNodeRef}
      style={style}
      className={variants({
        dragging: isOverlay ? 'overlay' : isDragging ? 'over' : undefined
      })}
    >
      <CardHeader className="space-between flex flex-col items-center border-b-2 p-4 text-left font-semibold ">

        <div className='flex '>

          <Button
            variant={'ghost'}
            {...attributes}
            {...listeners}
            className=" relative -ml-2 h-auto cursor-grab p-1 text-primary/50"
          >
            <span className="sr-only">{`Move column: ${column.user}`}</span>
            <GripVertical />
          </Button>

          <ColumnActions status={column.status} user={column.user} />

        </div>
        <div className='w-full ps-6'>
          {
            errorNameUsed.error &&
            (column.user === errorNameUsed.user) &&
            <p className='text-red-600 text-start text-xs pt-2'>Error: Nama sudah digunakan</p>
          }
        </div>
      </CardHeader>
      <CardContent className="flex flex-grow flex-col gap-4 overflow-x-hidden p-2">
        <div className='flex justify-between items-end'>
          <p className='ml-2 font-semibold'>{formatRupiah(Math.round(total))}</p>
          <p className='ml-2 text-xs font-semibold'>{totalItem} Item</p>
        </div>
        <ScrollArea className="h-full">
          <SortableContext items={tasksIds}>
            {tasks.map((task) => (
              <TaskCard key={task.id} task={task} />
            ))}
          </SortableContext>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}

export const BoardContainer = ({ children }: { children: React.ReactNode }) => {
  const dndContext = useDndContext();

  const variations = cva(' pb-4 md:px-0 flex lg:justify-start', {
    variants: {
      dragging: {
        default: '',
        active: 'snap-none'
      }
    }
  });

  return (
    <ScrollArea className="w-full whitespace-nowrap rounded-md">
      <div
        className={variations({
          dragging: dndContext.active ? 'active' : 'default'
        })}
      >
        <div className="flex flex-row items-start justify-center gap-4">
          {children}
        </div>
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  );
}
