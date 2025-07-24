// Компонент одной карточки задачи

import { Typography, Flex, Card, Tag, Button } from "antd";
import type { TaskItem, TaskPriority, TaskStatus } from "@entities/model/types";
import { useTaskStore } from "@entities/model/store";
import { useNavigate } from "react-router-dom";

// Цвета для приоритета и статуса задачи
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

type TaskCardProps = {
  task: TaskItem;
  onCardClick?: () => void; // Клик по всей карточке
};

export default function TaskCard({ task, onCardClick }: TaskCardProps) {
  const { Paragraph } = Typography;
  const deleteTask = useTaskStore((state) => state.deleteTask);
  const navigate = useNavigate();

  // Удаление задачи
  const handleDelete = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation(); // Чтобы не сработал onClick карточки
    deleteTask(task.id);
    navigate("/");
  };

  // Переход на страницу редактирования
  const handleEdit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    navigate(`/task/${task.id}`);
  };

  return (
    <Card
      hoverable
      onClick={onCardClick}
      className="non-clickable-card"
      title={task.taskHeader}
      extra={<Tag color={priorityColor[task.taskPriority]}>{task.taskPriority}</Tag>}
    >
      {/* Описание задачи */}
      <Paragraph>{task.taskDescription}</Paragraph>

      {/* Метки: категория и статус */}
      <Flex gap="small">
        <Tag>{task.taskCategory}</Tag>
        <Tag color={statusColor[task.taskStatus]}>{task.taskStatus}</Tag>
      </Flex>

      {/* Кнопки: редактировать и удалить */}
      <div className="delete-container" style={{ marginTop: "1rem", display: "flex", gap: "0.5rem" }}>
        <Button className="dark-button" onClick={handleEdit}>
          Edit
        </Button>
        <Button className="dark-button" onClick={handleDelete}>
          Delete
        </Button>
      </div>
    </Card>
  );
}
