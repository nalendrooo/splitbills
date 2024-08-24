import { create } from 'zustand';
import { v4 as uuid } from 'uuid';
import { persist } from 'zustand/middleware';
import { Column } from '@/components/kanban/board-column';
import { UniqueIdentifier } from '@dnd-kit/core';

// export type Status = 'Nama' | 'IN_PROGRESS' | 'DONE';

export type TaskType = 'INDIVIDUAL' | 'ALL' | 'SEVERAL';

const defaultCols = [
  {
    id: 'adil' as const,
    title: 'adil'
  }
] satisfies Column[];

export type ColumnId = (typeof defaultCols)[number]['id'];

export type Task = {
  id: string;
  title: string;
  price: number;
  status: UniqueIdentifier ;
  type: TaskType
};

export type State = {
  tasks: Task[];
  columns: Column[];
  draggedTask: string | null;
};

const initialTasks: Task[] = [
  {
    id: 'task1',
    status: 'adil',
    title: 'Matcha Latte',
    price: 20000,
    type: 'INDIVIDUAL'
  },
  {
    id: 'task2',
    status: 'adil',
    title: 'Ayam geprek (sambal matah)',
    price: 10000,
    type: 'INDIVIDUAL'
  }
];

export type Actions = {
  addTask: ({title, price, status, type}: Task) => void;
  duplicateTask: ({title, price, status, type}: Task, lastId: string) => void;
  addCol: (title: string) => void;
  dragTask: (id: string | null) => void;
  removeTask: (title: string) => void;
  removeCol: (id: UniqueIdentifier) => void;
  setTasks: (updatedTask: Task[]) => void;
  setCols: (cols: Column[]) => void;
  updateCol: (id: UniqueIdentifier, newName: string) => void;
  resetTasks: () => void;
  resetCols: () => void;
};

export const useTaskStore = create<State & Actions>()(
  persist(
    (set) => ({
      tasks: initialTasks,
      columns: defaultCols,
      draggedTask: null,
      addTask: ({title, price, status, type}) =>
        set((state) => ({
          tasks: [
            ...state.tasks,
            {
              id: uuid(),
              title,
              price,
              status,
              type
            }
          ]
        })),
      duplicateTask: ({title, price, status, type}, lastId) =>
        set((state) => {
          const index = state.tasks.findIndex((task) => task.id === lastId);
          const newTask = {
            id: uuid(),
            title,
            price,
            status,
            type
          };
          
          const updatedTasks = [...state.tasks];
          updatedTasks.splice(index + 1, 0, newTask);
      
          return {
            tasks: updatedTasks,
          }
        }),
      updateCol: (id: UniqueIdentifier, newName: string) =>
        set((state) => ({
          columns: state.columns.map((col) =>
            col.id === id ? { ...col, title: newName, id: newName } : col
          ),
          tasks: state.tasks.map((task) => ({
            ...task,
            status: task.status === id ? newName : task.status
          }))
        })),
      addCol: (title: string) =>
        set((state) => ({
          columns: [
            { title, id: title },
            ...state.columns
          ]
        })),
      dragTask: (id: string | null) => set({ draggedTask: id }),
      removeTask: (id: string) =>
        set((state) => ({
          tasks: state.tasks.filter((task) => task.id !== id)
        })),
      removeCol: (id: UniqueIdentifier) =>
        set((state) => ({
          columns: state.columns.filter((col) => col.id !== id)
        })),
      setTasks: (newTasks: Task[]) => set({ tasks: newTasks }),
      setCols: (newCols: Column[]) => set({ columns: newCols }),
      resetTasks: () => set({ tasks: initialTasks }),
      resetCols: () => set({ columns: defaultCols })
    }),
    { name: 'task-store', skipHydration: true }
  )
);
