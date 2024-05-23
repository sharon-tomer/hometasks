import moment from "moment";
import { assignee, complexity } from "../constants";
import { TaskList } from "../types";

export default function generateMockData() {
  let mockData: any = new Object();
  for (let i = 0; i <= 20; i++) {
    const randomComplexity = Math.floor(Math.random() * 3);
    const randomAssignee = Math.floor(Math.random() * 3);
    const randomDays = Math.floor(Math.random() * 20) - 10;
    const verbs = ['write', 'research', 'clean', 'order', 'call', 'meet with'];
    const nouns = ['report', 'presentation', 'client', 'supplies', 'doctor', 'team'];
  
    const title = `${verbs[Math.floor(Math.random() * verbs.length)]} ${nouns[Math.floor(Math.random() * nouns.length)]}`;
    mockData[`task#${i}`] = {
      title,
      id: `task#${i}`,
      body: `Complete additional details for ${title}`,
      complexity: Object.values(complexity)[randomComplexity],
      assignee: Object.values(assignee)[randomAssignee],
      by: moment().add(randomDays, 'days'),
    };
  }
  
  return mockData as TaskList;
}