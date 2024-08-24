import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Task, useTaskStore } from '@/lib/store';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { cva } from 'class-variance-authority';
import { Ellipsis, GripVertical, Menu, Move } from 'lucide-react';
import { Badge } from '../ui/badge';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '../ui/dropdown-menu';
import { formatRupiah } from '@/lib/format';
import NewTaskDialog from './new-task-dialog';
import { useState } from 'react';

// export interface Task {
//   id: UniqueIdentifier;
//   columnId: ColumnId;
//   content: string;
// }

interface TaskCardProps {
  task: Task;
  isOverlay?: boolean;
}

export type TaskType = 'Task';

export interface TaskDragData {
  type: TaskType;
  task: Task;
}

export function TaskCard({ task, isOverlay }: TaskCardProps) {

  const duplicateTask = useTaskStore((state) => state.duplicateTask);
  const removeTask = useTaskStore((state) => state.removeTask);


  const [isEdit, setIsEdit] = useState(false);

  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging
  } = useSortable({
    id: task.id,
    data: {
      type: 'Task',
      task
    } satisfies TaskDragData,
    attributes: {
      roleDescription: 'Task'
    }
  });

  const style = {
    transition,
    transform: CSS.Translate.toString(transform)
  };

  const variants = cva('', {
    variants: {
      dragging: {
        over: 'ring-2 opacity-30',
        overlay: 'ring-2 ring-primary'
      }
    }
  });


  const handleDuplicateTask = () => {
    duplicateTask(task, task.id)
  };

  const handleRemoveTask = () => {
    removeTask(task.id)
  };

  return (
    <Card
      ref={setNodeRef}
      style={style}
      className={variants({
        dragging: isOverlay ? 'overlay' : isDragging ? 'over' : undefined
      })}
    >
      <NewTaskDialog open={isEdit} task={task} onClose={() => setIsEdit(false)} type='edit'/>
      <CardHeader className="space-between relative flex flex-row border-b-2 border-secondary px-3 py-3">
        <Button
          variant={'ghost'}
          {...attributes}
          {...listeners}
          className="-ml-2 h-auto cursor-grab p-1 text-secondary-foreground/50"
        >
          <span className="sr-only">Move task</span>
          <GripVertical />
        </Button>
        <Badge variant='outline' className="ml-auto font-semibold">
          {formatRupiah(task.price)}
        </Badge>
        <DropdownMenu modal={false}>
          <DropdownMenuTrigger asChild>
            <Button size="sm" variant="ghost" className='ml-2'>
              <span className="sr-only">Actions</span>
              <Ellipsis className='h-4 w-4' />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem
              onSelect={() => setIsEdit(true)}
              className='text-xs'
            >
              Ubah
            </DropdownMenuItem>
            <DropdownMenuSeparator />

            <DropdownMenuItem
              onSelect={handleDuplicateTask}
              className="text-xs"
            >
              Duplikat
            </DropdownMenuItem>
            <DropdownMenuSeparator />

            <DropdownMenuItem
              onSelect={handleRemoveTask}
              className="text-red-600 text-xs"
            >
              Hapus
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

      </CardHeader>
      <CardContent className="whitespace-pre-wrap px-3 pb-6 pt-3 text-left flex flex-col relative">
        {task.title}
      </CardContent>
    </Card>
  );
}
