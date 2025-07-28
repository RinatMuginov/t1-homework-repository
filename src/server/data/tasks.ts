import { TaskItem } from "../types/task";

export const tasks: TaskItem[] = [
  {
    id: 1,
    taskHeader: "Do Homework",
    taskDescription: "Math T‑1",
    taskCategory: "Bug",
    taskStatus: "To Do",
    taskPriority: "Low",
    taskDate: "Today",
  },
  {
    id: 2,
    taskHeader: "Watch lesson",
    taskDescription: "React hooks",
    taskCategory: "Feature",
    taskStatus: "In Progress",
    taskPriority: "Medium",
    taskDate: "Tomorrow",
  },
  {
    id: 3,
    taskHeader: "Just sleep",
    taskDescription: "💤",
    taskCategory: "Documentation",
    taskStatus: "Done",
    taskPriority: "High",
    taskDate: "Next 7 days",
  },
];
