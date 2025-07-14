import { useMemo, useState } from "react";
import { Routes, Route, Link, Navigate } from "react-router-dom";
import { Typography, Flex, Card, Tag, ConfigProvider } from "antd";
import TaskDetails from "./TaskDetails";
import { initialTasks } from "./types";
import type { TaskItem, TaskDate, TaskPriority, TaskStatus } from "./types";
import './App.css';

const priorityColor: Record<TaskPriority, string> = {
  High: "red",
  Medium: "orange",
  Low: "green",
};
const statusColor: Record<TaskStatus, string> = {
  Done: "green",
  "In Progress": "orange",
  "To Do": "red",
};

function TaskCard({ task }: { task: TaskItem }) {
  const { Paragraph } = Typography;
  return (
    <Card
      hoverable
      title={task.taskHeader}
      extra={
        <Tag color={priorityColor[task.taskPriority]}>
          {task.taskPriority}
        </Tag>
      }
    >
      <Paragraph>{task.taskDescription}</Paragraph>
      <Flex gap="small">
        <Tag>{task.taskCategory}</Tag>
        <Tag color={statusColor[task.taskStatus]}>{task.taskStatus}</Tag>
      </Flex>
    </Card>
  );
}

function TaskList({ tasks }: { tasks: TaskItem[] }) {
  const dates: TaskDate[] = ["Today", "Tomorrow", "Next 7 days"];

  const grouped = useMemo(
    () =>
      tasks.reduce<Record<TaskDate, TaskItem[]>>(
        (acc, t) => {
          acc[t.taskDate].push(t);
          return acc;
        },
        { Today: [], Tomorrow: [], "Next 7 days": [] }
      ),
    [tasks]
  );

  return (
  <main className="main-container">
    <Typography.Title level={1}>TaskManagerByRL</Typography.Title>

    <div className="task-list-wrapper">
      {dates.map((col) => (
        <div key={col} className="task-list-column">
          <Typography.Title level={4}>{col}</Typography.Title>
          {grouped[col].length === 0 ? (
            <Typography.Text type="secondary">No tasks</Typography.Text>
          ) : (
            grouped[col].map((task) => (
              <Link key={task.id} to={`/task/${task.id}`} className="card-link">
                <TaskCard task={task} />
              </Link>
            ))
          )}
        </div>
      ))}
    </div>
  </main>
  );
}

export default function RootApp() {
  const [tasks, setTasks] = useState<TaskItem[]>(initialTasks);

  return (
    <ConfigProvider theme={{ token: { borderRadius: 8 } }}>
      <Routes>
        <Route path="/" element={<TaskList tasks={tasks} />} />
        <Route
          path="/task/:id"
          element={<TaskDetails tasks={tasks} setTasks={setTasks} />}
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </ConfigProvider>
  );
}
