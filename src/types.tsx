import { Moment } from "moment";
import { Assignee, Category } from "./constants";

export interface AppState {
  columns: { [columnId: string]: ColumnProps };
  tasks: TaskList;
}

export interface ColumnProps extends Column {
  tasks: TaskList;
}

export interface Column {
  id: string;
  title: string;
  taskIds: string[];
}

export interface ColumnsList {
  [columnId: string]: Column;
}

export interface Position {
  column: number;
  row: number;
  size: number;
}

export interface ColumnPositions {
  [category: string]: Position;
}

export interface TaskList {
  [taskId: string]: TaskProps;
}

export interface TaskProps {
  id: string;
  title: string;
  content: string;
  category: Category;
  assignee?: Assignee;
  completeBy?: Moment;
  isUrgent?: boolean;
}

export interface ColumnTask extends TaskProps {
  index: number;
}

export type TaskToCreate = Omit<TaskProps, "id">;

export type TaskToUpdate = Partial<TaskProps> & { id: string };
