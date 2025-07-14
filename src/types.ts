export type TaskCategory = "Bug" | "Feature" | "Documentation" | "Refactor" | "Test";
export type TaskStatus   = "To Do" | "In Progress" | "Done";
export type TaskPriority = "Low"   | "Medium"     | "High";
export type TaskDate     = "Today" | "Tomorrow"   | "Next 7 days";

export interface TaskItem {
  id: number;
  taskHeader: string;
  taskDescription: string;
  taskCategory: TaskCategory;
  taskStatus: TaskStatus;
  taskPriority: TaskPriority;
  taskDate: TaskDate;
}

export const initialTasks: TaskItem[] = [
  { id: 1, taskHeader: "Do Homework", taskDescription: "Math T‑1",
    taskCategory: "Bug", taskStatus: "To Do", taskPriority: "Low", taskDate: "Today" },
  { id: 2, taskHeader: "Watch lesson", taskDescription: "React hooks",
    taskCategory: "Feature", taskStatus: "In Progress", taskPriority: "Medium", taskDate: "Tomorrow" },
  { id: 3, taskHeader: "Just sleep", taskDescription: "💤",
    taskCategory: "Documentation", taskStatus: "Done", taskPriority: "High", taskDate: "Next 7 days" },
];
