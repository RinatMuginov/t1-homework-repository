import { Routes, Route } from "react-router-dom";
import TaskFormPage from "@pages/TaskFormPage";
import TaskListPage from "@pages/TaskListPage";

export default function App() {
  console.log("App rendered");
  return (
    <Routes>
      <Route path="/" element={<TaskListPage />} />
      <Route path="/task/new" element={<TaskFormPage />} />
      <Route path="/task/:id" element={<TaskFormPage />} />
    </Routes>
  );
}
