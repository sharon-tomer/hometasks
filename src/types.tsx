import { Moment } from 'moment';
import { assignee, complexity } from './constants';

export interface AppState {
    columns: {[columnId: string]: ColumnProps},
    tasks: TaskList
} 

export interface ColumnProps {
    id: string,
    title: string,
    taskIds: string[],
    tasks: TaskList
}

export interface ColumnsList {
    [columnId: string]: ColumnProps
}

export interface TaskProps {
    id: string,
    index: number,
    title: string,
    content: string,
    complexity: complexity;
    assignee?: assignee;
    completeBy?: Moment
}

export interface TaskList {
    [taskId: string]: TaskProps
}
