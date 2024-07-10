import moment, { Moment } from "moment";
import { TaskList } from "../types";

function isInThePast(time: Moment) {
  return moment(time).isBefore(moment());
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
