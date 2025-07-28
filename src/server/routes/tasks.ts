import { Router } from "express";
import { tasks } from "../data/tasks";
import { TaskItem } from "../types/task";

const router = Router(); // Убрали лишний импорт express, так как Router уже из express

// GET /tasks?taskHeader=xxx&taskDate=Today
router.get("/", (req, res) => {
  const { taskHeader, taskDate } = req.query;

  let filtered = [...tasks]; // Создаем копию массива

  if (taskHeader) {
    filtered = filtered.filter((t) =>
      t.taskHeader.toLowerCase().includes((taskHeader as string).toLowerCase())
    );
  }

  if (taskDate) {
    filtered = filtered.filter((t) => t.taskDate === taskDate);
  }

  res.json(filtered);
});

// GET /tasks/:id
router.get("/:id", (req, res) => {
  const task = tasks.find((t) => t.id === Number(req.params.id));
  if (!task) return res.status(404).json({ message: "Task not found" });
  res.json(task);
});

// POST /tasks
router.post("/", (req, res) => {
  const {
    taskHeader,
    taskDescription,
    taskCategory,
    taskStatus,
    taskPriority,
    taskDate,
  } = req.body;

  if (
    !taskHeader ||
    !taskCategory ||
    !taskStatus ||
    !taskPriority ||
    !taskDate
  ) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  const newTask: TaskItem = {
    id: Date.now(),
    taskHeader,
    taskDescription: taskDescription || "",
    taskCategory,
    taskStatus,
    taskPriority,
    taskDate,
  };

  tasks.push(newTask);
  res.status(201).json(newTask);
});

// PATCH /tasks/:id
router.patch("/:id", (req, res) => {
  const id = Number(req.params.id);
  const task = tasks.find((t) => t.id === id);
  if (!task) return res.status(404).json({ message: "Task not found" });

  Object.assign(task, req.body);
  res.json(task);
});

// DELETE /tasks/:id
router.delete("/:id", (req, res) => {
  const id = Number(req.params.id);
  const index = tasks.findIndex((t) => t.id === id);
  if (index === -1) return res.status(404).json({ message: "Task not found" });

  tasks.splice(index, 1);
  res.status(204).send();
});

export default router;