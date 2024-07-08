// import { TaskToCreate } from "../types";
// import { generateUniqueId } from "./mock";

// function handleNewTask(newTask: TaskToCreate) {
//   const id = generateUniqueId("task");
//   const task = { ...newTask, id };
//   return {
//     [id]: {
//       ...task,
//       id,
//     },
//     ...tasks,
//   };
//   setColumns({
//     ...columns,
//     [task.category]: {
//       ...columns[task.category],
//       taskIds: [...columns[task.category].taskIds, id],
//     },
//   });
// }

// function updateTask(modifiedFields: TaskToUpdate) {
//   if (!tasks[modifiedFields.id]) {
//     return;
//   }
//   const currentTask = tasks[modifiedFields.id];

//   const modifiedTask = {
//     ...currentTask,
//     ...modifiedFields,
//   };

//   setTasks({
//     ...tasks,
//     [modifiedFields.id]: modifiedTask,
//   });
//   if (currentTask.category !== modifiedFields.category) {
//     setColumns({
//       ...columns,
//       [currentTask.category]: {
//         ...columns[currentTask.category],
//         taskIds: columns[currentTask.category].taskIds.filter(
//           (id) => id !== modifiedFields.id
//         ),
//       },
//       [modifiedTask.category]: {
//         ...columns[modifiedTask.category],
//         taskIds: [...columns[modifiedTask.category].taskIds, modifiedFields.id],
//       },
//     });
//   }
// }

// function deleteTask(taskId: string) {
//   let modifiedTasks = { ...tasks };
//   delete modifiedTasks[taskId];
//   setTasks(modifiedTasks);
// }

export default {};
