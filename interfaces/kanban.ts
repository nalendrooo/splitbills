// import { Column } from "@/components/kanban/board-column"

import { UniqueIdentifier } from "@dnd-kit/core";

export interface Column {
    status: UniqueIdentifier;
    user: string;
}

export type Task = {
    id: string;
    title: string;
    price: number;
    status: UniqueIdentifier;
    type: TaskType
};

export type State = {
    tasks: Task[];
    columns: Column[];
    draggedTask: string | null;
};

export type TaskType = 'INDIVIDUAL' | 'ALL' | 'SEVERAL';

export interface IPropsColumns {
    columns: Column[]
}

export interface IPropsColumn {
    column: Column
}



export type ColumnType = 'Column';

export interface ColumnDragData {
    type: ColumnType;
    column: Column;
}

//   export 

export type ColumnId = UniqueIdentifier;

//   export type ColumnId = (typeof defaultCols)[number]['id'];

