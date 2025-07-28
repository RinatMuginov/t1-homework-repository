export type TaskCategory = "Bug" | "Feature" | "Documentation" | "Refactor" | "Test";
export type TaskStatus   = "To Do" | "In Progress" | "Done";
export type TaskPriority = "Low" | "Medium" | "High";
export type TaskDate     = "Today" | "Tomorrow" | "Next 7 days";

export interface TaskItem {
  id: number;
  taskHeader: string;
  taskDescription: string;
  taskCategory: TaskCategory;
  taskStatus: TaskStatus;
  taskPriority: TaskPriority;
  taskDate: TaskDate;
}
