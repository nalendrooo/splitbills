import { Column, Task, TaskType } from "@/interfaces/kanban";


export const initialItem = {
    title: '',
    id: '',
    price: 0,
    status: '',
    type: 'INDIVIDUAL' as TaskType
}

export const defaultCols = [
    // {
    //   id: 'adil' as const,
    //   title: 'adil'
    // }
  ] satisfies Column[];
  
export const initialTasks: Task[] = [
    // {
    //   id: 'task1',
    //   status: 'adil',
    //   title: 'Matcha Latte',
    //   price: 20000,
    //   type: 'INDIVIDUAL'
    // },
    // {
    //   id: 'task2',
    //   status: 'adil',
    //   title: 'Ayam geprek (sambal matah)',
    //   price: 10000,
    //   type: 'INDIVIDUAL'
    // }
  ];
export const initialTasks2: Task[] = [
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

  export const defaultCols2: Column[] = [
    {
    status: 'adil' as const,
      user: 'adil'
    }
  ] satisfies Column[];