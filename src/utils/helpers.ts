import moment, { Moment } from "moment";
import { TaskList } from "../types";

let lastMS = 0;
let suffix = 0;

function isInThePast(time: Moment) {
  return moment(time).isBefore(moment());
}

export function generateUniqueId(prefix = "") {
  // this is unique, not random.
  const currentMS = Date.now();
  if (currentMS === lastMS) {
    suffix++;
  } else {
    suffix = 0;
  }
  lastMS = currentMS;
  return `${prefix}-${currentMS}${suffix ? "-" + suffix : ""}`;
}

// function orderTasks(tasks: TaskList, taskIds: string[]) {
//   return [...taskIds].sort((taskAID, taskBID) => {
//     const taskA = tasks[taskAID];
//     const taskB = tasks[taskBID];
//     if (taskA.isUrgent && !taskB.isUrgent) {
//       return 1;
//     } else if (!taskA.isUrgent && taskB.isUrgent) {
//       return -1;
//     } else return 0;
//   });
// }

export { isInThePast };
