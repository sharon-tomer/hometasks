import { Moment } from 'moment';
import { assignee, complexity } from './constants';

export interface AppState {
    columns: {[columnId: string]: ColumnProps},
    tasks: TaskList
} 

export interface ColumnProps extends Column {
    tasks: TaskList
}

export interface Column {
    id: string,
    title: string,
    taskIds: string[]
}

export interface ColumnsList {
    [columnId: string]: Column
}

export interface TaskProps {
    id: string,
    title: string,
    content: string,
    complexity: complexity;
    assignee?: assignee;
    completeBy?: Moment
}

export interface ColumnTask extends TaskProps {
    index: number
}

export type TaskToCreate = Omit<TaskProps, "id">;
export interface TaskList {
    [taskId: string]: TaskProps
}
