import { TaskList, TaskToCreate, TaskToUpdate } from "../types";
import { Category } from "../constants";

function addTask(taskToAdd: TaskToCreate) {
  return {
    type: "added",
    taskToAdd,
  };
}

function changeTask(taskToUpdate: TaskToUpdate) {
  return {
    type: "changed",
    taskToUpdate,
  };
}

function deleteTask(taskId: string) {
  return {
    type: "deleted",
    id: taskId,
  };
}

function bulkAddTasks(tasksToAdd: TaskList) {
  return {
    type: "bulk_added",
    tasksToAdd,
  };
}

function moveTask(
  taskId: string,
  fromCategory: Category,
  toCategory: Category,
  fromIndex: number,
  toIndex: number
) {
  return {
    type: "moved",
    taskId,
    fromCategory,
    toCategory,
    fromIndex,
    toIndex,
  };
}

export const actions = {
  addTask,
  changeTask,
  deleteTask,
  bulkAddTasks,
  moveTask,
};
