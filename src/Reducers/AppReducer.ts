import { Category } from "../constants";
import {
  AppState,
  TaskAction,
  KnownTaskAction,
  TaskList,
  ColumnsList,
} from "../types";
import { generateUniqueId } from "../utils/helpers";

export default function appReducer(state: AppState, action: TaskAction) {
  console.log("got action", action);
  console.log("state before", state);
  if (isKnownAction(action)) {
    switch (action.type) {
      case "added": {
        const id = generateUniqueId("task");
        const newTask = {
          ...action.taskToAdd,
          id,
        };
        const category = newTask.category;
        return {
          tasks: {
            ...state.tasks,
            [id]: {
              ...action.taskToAdd,
              id,
            },
          },
          columns: {
            ...state.columns,
            [category]: {
              ...state.columns[category],
              taskIds: [...state.columns[category].taskIds, id],
            },
          },
        };
      }
      case "changed": {
        return {
          tasks: {
            ...state.tasks,
            [action.taskToUpdate.id]: {
              ...state.tasks[action.taskToUpdate.id],
              ...action.taskToUpdate,
            },
          },
          columns: state.columns,
        };
      }
      case "deleted": {
        const modifiedTasks = { ...state.tasks };
        delete modifiedTasks[action.id];
        return {
          tasks: modifiedTasks,
          columns: state.columns,
        };
      }
      case "moved": {
        const modifiedColumns = moveTaskToColumnAndPosition(
          state.columns,
          action.taskId,
          action.fromCategory,
          action.toCategory,
          action.fromIndex,
          action.toIndex
        );
        const modifiedTasks = {
          ...state.tasks,
          [action.taskId]: {
            ...state.tasks[action.taskId],
            category: action.toCategory,
          },
        };
        return {
          tasks: modifiedTasks,
          columns: modifiedColumns,
        };
      }
      case "bulk_added": {
        console.log("got bulk action", action);
        const modifiedTasks = { ...state.tasks, ...action.tasksToAdd };
        const modifiedColumns = sortTasksToColumns(
          modifiedTasks,
          state.columns
        );
        return {
          tasks: modifiedTasks,
          columns: modifiedColumns,
        };
      }
    }
  } else {
    console.warn("Unknown action type:", action.type);
    return state;
  }
}

function isKnownAction(action: TaskAction): action is KnownTaskAction {
  return ["added", "changed", "deleted", "moved", "bulk_added"].includes(
    action.type
  );
}

function sortTasksToColumns(
  tasks: TaskList,
  columns: ColumnsList
): ColumnsList {
  let initialColumns = JSON.parse(JSON.stringify(columns));

  Object.values(tasks).forEach((task) => {
    if (initialColumns[task.category]) {
      initialColumns[task.category].taskIds.push(task.id);
    }
  });

  return initialColumns;
}

function moveTaskToColumnAndPosition(
  columns: ColumnsList,
  taskId: string,
  fromCategory: Category,
  toCategory: Category,
  fromIndex: number,
  toIndex: number
): ColumnsList {
  let modifiedColumns = JSON.parse(JSON.stringify(columns));

  // same column drop
  if (fromCategory === toCategory) {
    const column = columns[fromCategory];
    const newTaskIds = Array.from(column.taskIds);
    newTaskIds.splice(fromIndex, 1);
    newTaskIds.splice(toIndex, 0, taskId);

    return {
      columns: {
        ...modifiedColumns,
        taskIds: newTaskIds,
      },
    };
  }

  // different column drop
  else {
    const sourceColumn = columns[fromCategory];
    const destColumn = columns[toCategory];

    const newSouceTasks = Array.from(sourceColumn.taskIds);
    const newDestTasks = Array.from(destColumn.taskIds);

    newSouceTasks.splice(fromIndex, 1);
    newDestTasks.splice(toIndex, 0, taskId);

    const newSouceColumn = {
      ...sourceColumn,
      taskIds: newSouceTasks,
    };

    const newDestColumn = {
      ...destColumn,
      taskIds: newDestTasks,
    };

    return {
      ...columns,
      [newSouceColumn.id]: newSouceColumn,
      [newDestColumn.id]: newDestColumn,
    };
  }
}
