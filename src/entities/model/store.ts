// Zustand-хранилище задач

import { create } from "zustand";
import type { TaskItem, TaskDate } from "./types";
import { initialTasks } from "./types";

const STORAGE_KEY = "tasks";

// Загружаем задачи из localStorage (если есть)
const loadFromLocalStorage = (): TaskItem[] => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : initialTasks;
  } catch {
    return initialTasks;
  }
};

// Сохраняем задачи в localStorage
const saveToLocalStorage = (tasks: TaskItem[]) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
};

type TaskStore = {
  tasks: TaskItem[];
  updateTask: (updatedTask: TaskItem) => void;
  addTask: (task: TaskItem) => void;
  deleteTask: (id: number) => void;
  createEmptyTask: (date: TaskDate) => TaskItem;
};

export const useTaskStore = create<TaskStore>((set, get) => ({
  tasks: loadFromLocalStorage(),

  // Обновление задачи по id
  updateTask: (updatedTask) => {
    set((state) => {
      const updated = state.tasks.map((t) =>
        t.id === updatedTask.id ? updatedTask : t
      );
      saveToLocalStorage(updated);
      return { tasks: updated };
    });
  },

  // Добавление новой задачи
  addTask: (task) => {
    set((state) => {
      const updated = [...state.tasks, task];
      saveToLocalStorage(updated);
      return { tasks: updated };
    });
  },

  // Удаление задачи по id
  deleteTask: (id) => {
    set((state) => {
      const updated = state.tasks.filter((t) => t.id !== id);
      saveToLocalStorage(updated);
      return { tasks: updated };
    });
  },

  // Создание новой пустой задачи с уникальным id
  createEmptyTask: (date) => {
    const tasks = get().tasks;
    const maxId = tasks.length > 0 ? Math.max(...tasks.map((t) => t.id)) : 0;

    return {
      id: maxId + 1,
      taskHeader: "New Task",
      taskDescription: "",
      taskCategory: "Feature",
      taskStatus: "To Do",
      taskPriority: "Medium",
      taskDate: date,
    };
  },
}));

// Вспомогательная функция (вне Zustand) — создать новую задачу
export const createEmptyTask = (date: TaskDate): TaskItem => {
  const tasks = useTaskStore.getState().tasks;
  const maxId = tasks.length > 0 ? Math.max(...tasks.map((t) => t.id)) : 0;

  return {
    id: maxId + 1,
    taskHeader: "New Task",
    taskDescription: "",
    taskCategory: "Feature",
    taskStatus: "To Do",
    taskPriority: "Medium",
    taskDate: date,
  };
};
