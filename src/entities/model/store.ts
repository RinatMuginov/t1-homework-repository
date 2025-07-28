import { create } from "zustand";
import { TaskItem } from "./types";

const API_URL = "http://localhost:3000/tasks"; // <-- Убедись, что сервер слушает 3000 порт

interface TaskState {
  tasks: TaskItem[];
  loadTasks: () => Promise<void>;
  addTask: (task: Omit<TaskItem, "id">) => Promise<void>;
  updateTask: (id: number, updates: Partial<TaskItem>) => Promise<void>;
  deleteTask: (id: number) => Promise<void>;
}

export const useTaskStore = create<TaskState>((set) => ({
  tasks: [],

  loadTasks: async () => {
    try {
      const res = await fetch(API_URL);
      const data: TaskItem[] = await res.json();
      set({ tasks: data });
    } catch (error) {
      console.error("Failed to load tasks", error);
    }
  },

  addTask: async (task) => {
    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(task),
      });
      const newTask: TaskItem = await res.json();
      set((state) => ({ tasks: [...state.tasks, newTask] }));
    } catch (error) {
      console.error("Failed to add task", error);
    }
  },

  updateTask: async (id, updates) => {
    try {
      const res = await fetch(`${API_URL}/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updates),
      });
      const updated: TaskItem = await res.json();
      set((state) => ({
        tasks: state.tasks.map((task) => (task.id === id ? updated : task)),
      }));
    } catch (error) {
      console.error("Failed to update task", error);
    }
  },

  deleteTask: async (id) => {
    try {
      await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
      });
      set((state) => ({
        tasks: state.tasks.filter((task) => task.id !== id),
      }));
    } catch (error) {
      console.error("Failed to delete task", error);
    }
  },
}));
