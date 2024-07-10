import {
  TaskToUpdate,
  TaskList,
  TaskToCreate,
  ColumnsList,
  TaskProps,
} from "../types";
import { generateUniqueId } from "./mock";

function updateTask(modifiedFields: TaskToUpdate, tasks: TaskList): TaskProps {
  const currentTask = tasks[modifiedFields.id];

  return {
    ...currentTask,
    ...modifiedFields,
  };
}

function deleteTask(taskId: string, tasks: TaskList): TaskList {
  let modifiedTasks = { ...tasks };
  delete modifiedTasks[taskId];
  return modifiedTasks;
}

function createTask(
  newTask: TaskToCreate,
  tasks: TaskList,
  columns: ColumnsList
): { modifiedTasks: TaskList; modifiedColumns: ColumnsList } {
  const id = generateUniqueId("task");
  const task = { ...newTask, id };

  const modifiedTasks = {
    [id]: {
      ...task,
      id,
    },
    ...tasks,
  };

  const modifiedColumns = {
    ...columns,
    [task.category]: {
      ...columns[task.category],
      taskIds: [...columns[task.category].taskIds, id],
    },
  };

  return {
    modifiedTasks,
    modifiedColumns,
  };
}

export { updateTask, deleteTask, createTask };
