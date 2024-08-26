import { create } from 'zustand';
import { v4 as uuid } from 'uuid';
import { persist } from 'zustand/middleware';
import { UniqueIdentifier } from '@dnd-kit/core';
import { Column, State, Task } from '@/interfaces/kanban';
import { defaultCols, initialTasks } from '@/constants/kanban';

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
  updateTask: (id: UniqueIdentifier, task: Task) => void;
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
      updateCol: (status: UniqueIdentifier, newName: string) =>
        set((state) => ({
          columns: state.columns.map((col) =>
            col.status === status ? { ...col, user: newName, status: newName } : col
          ),
          tasks: state.tasks.map((task) => ({
            ...task,
            status: task.status === status ? newName : task.status
          }))
        })),
      updateTask: (id, task) =>
        set((state) => ({
          tasks: state.tasks.map((t) => (t.id === id ? task : t))
        })),
      addCol: (user: string) =>
        set((state) => ({
          columns: [
            { user, status: user },
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
          columns: state.columns.filter((col) => col.status !== id)
        })),
      setTasks: (newTasks: Task[]) => set({ tasks: newTasks }),
      setCols: (newCols: Column[]) => set({ columns: newCols }),
      resetTasks: () => set({ tasks: initialTasks }),
      resetCols: () => set({ columns: defaultCols })
    }),
    { name: 'task-store', skipHydration: true }
  )
);
