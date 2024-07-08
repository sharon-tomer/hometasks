import { ColumnsList, TaskList } from "./types";

export enum Category {
  lessThan15Minutes = "<15",
  moreThan15Minutes = ">15",
  done = "done",
}
export enum Assignee {
  tomer = "Tomer",
  nofar = "Nofar",
  both = "Both",
  either = "Either",
  unassigned = "Unassigned",
}

export const userColors = {
  [Assignee.tomer]: "#bcddf1",
  [Assignee.nofar]: "#beeeed",
  [Assignee.both]: "#44cfcb",
  [Assignee.either]: "#4ea5d9",
  [Assignee.unassigned]: "#e7e7e7",
};

export const columnPositions = {
  "<15": {
    column: 1,
    row: 1,
    size: 2,
  },
  ">15": {
    column: 2,
    row: 1,
    size: 2,
  },
  unassigned: {
    column: 3,
    row: 1,
    size: 1,
  },
  done: {
    column: 3,
    row: 2,
    size: 1,
  },
};

export const emptyColumns: ColumnsList = {
  "<15": {
    id: "<15",
    title: "< 15 Minutes",
    taskIds: [],
  },
  ">15": {
    id: ">15",
    title: "> 15 Minutes",
    taskIds: [],
  },
  unassigned: {
    id: "unassigned",
    title: "Unassigned",
    taskIds: [],
  },
  done: {
    id: "done",
    title: "Done",
    taskIds: [],
  },
};

export const emptyTasks: TaskList = {};
