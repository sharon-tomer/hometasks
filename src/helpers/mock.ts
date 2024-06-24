import moment from "moment";
import { Assignee, Category } from "../constants";
import { TaskList } from "../types";

let lastMS = 0;
let suffix = 0;

export function generateMockData() {
  let mockData: any = {};
  for (let i = 0; i <= 20; i++) {
    const randomCategory = Math.floor(Math.random() * 3);
    const randomAssignee = Math.floor(Math.random() * 3);
    const randomDays = Math.floor(Math.random() * 20) - 10;
    const verbs = ["write", "research", "clean", "order", "call", "meet with"];
    const nouns = [
      "report",
      "presentation",
      "client",
      "supplies",
      "doctor",
      "team",
    ];

    const title = `${verbs[Math.floor(Math.random() * verbs.length)]} ${
      nouns[Math.floor(Math.random() * nouns.length)]
    }`;
    const id = generateUniqueId("task");
    mockData[id] = {
      title,
      id,
      content: `Complete additional details for ${title}`,
      category: Object.values(Category)[randomCategory],
      assignee: Object.values(Assignee)[randomAssignee],
      completeBy: moment().add(randomDays, "days"),
    };
  }

  return mockData as TaskList;
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
