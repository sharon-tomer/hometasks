import { Moment } from "moment";
import { Assignee, Category } from "./constants";
import { Dispatch } from "react";
import { UseFormRegister } from "react-hook-form";

export interface AppState {
  columns: ColumnsList;
  tasks: TaskList;
  localVersion: number;
}

export interface ApiResponse {
  record: {
    tasks: TaskList;
    version: number;
  };
  metadata: any;
}

export interface ColumnProps {
  id: string;
  title: string;
  taskIds: string[];
}

export type ColumnsList = Record<string, ColumnProps>;

export interface Position {
  column: number;
  row: number;
  size: number;
}

export type ColumnPositions = Record<string, Position>;
export type TaskList = Record<string, TaskProps>;

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

export type AllowedActions =
  | "added"
  | "changed"
  | "deleted"
  | "moved"
  | "bulk_added";

export interface CreateTaskAction {
  type: "added";
  taskToAdd: TaskToCreate;
}

export interface ChangeTaskAction {
  type: "changed";
  taskToUpdate: TaskToUpdate;
}

export interface DeleteTaskAction {
  type: "deleted";
  id: string;
}

export interface BulkAddTasksAction {
  type: "bulk_added";
  tasksToAdd: TaskList;
  version: number;
}

export interface MoveTaskAction {
  type: "moved";
  taskId: string;
  fromCategory: Category;
  toCategory: Category;
  fromIndex: number;
  toIndex: number;
}

export type KnownTaskAction =
  | CreateTaskAction
  | ChangeTaskAction
  | DeleteTaskAction
  | BulkAddTasksAction
  | MoveTaskAction;

export type UnknownAction = {
  type: Exclude<string, AllowedActions>;
  [key: string]: unknown;
};

export type TaskAction = KnownTaskAction | UnknownAction;

export type DispatchType = Dispatch<TaskAction>;

export interface CommonInputProps {
  field: ValidCreationFormField;
  register: UseFormRegister<TaskToCreate>;
  lineNumber: number;
  placeholder?: string;
  displayName: string;
  errorMessage?: string;
  inputType: "input" | "select" | "textarea" | "checkbox" | "date";
  children?: React.ReactNode;
  noLabel?: boolean;
}

export interface InputProps
  extends CommonInputProps,
    React.InputHTMLAttributes<HTMLInputElement> {}

export interface SelectProps
  extends CommonInputProps,
    React.SelectHTMLAttributes<HTMLSelectElement> {}

export interface TextAreaProps
  extends CommonInputProps,
    React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

export type FormInputProps = InputProps | SelectProps | TextAreaProps;

export type ValidCreationFormField =
  | "title"
  | "content"
  | "category"
  | "assignee"
  | "completeBy"
  | "isUrgent";
