import { Routes, Route } from "react-router-dom";
import TaskList from "@pages/TaskListPage";
import TaskEditor from "@pages/TaskFormPage"; 

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<TaskList />} />
      <Route path="/task/new" element={<TaskEditor />} />
      <Route path="/task/:id" element={<TaskEditor />} />
    </Routes>
  );
}

