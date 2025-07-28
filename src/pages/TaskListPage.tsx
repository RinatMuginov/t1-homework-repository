import { Button, Typography } from "antd";
import { useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import TaskCard from "../entities/ui/TaskCard";
import { useTaskStore } from "@entities/model/store";
import type { TaskItem, TaskDate } from "@entities/model/types";

const DATES: TaskDate[] = ["Today", "Tomorrow", "Next 7 days"];

export default function TaskList() {
  const { tasks, loadTasks } = useTaskStore();
  const navigate = useNavigate();

  useEffect(() => {
    loadTasks();
  }, [loadTasks]);

  const groupedTasks = useMemo(() => {
    const groups: Record<TaskDate, TaskItem[]> = {
      Today: [],
      Tomorrow: [],
      "Next 7 days": [],
    };

    tasks.forEach((task) => {
      if (task && groups[task.taskDate]) {
        groups[task.taskDate].push(task);
      }
    });

    return groups;
  }, [tasks]);

  return (
    <main className="main-container">
      <Typography.Title level={1} className="main-title">
        TaskManagerByRL
      </Typography.Title>

      <div className="task-list-wrapper">
        {DATES.map((dateKey) => (
          <div key={dateKey} className="task-list-column">
            <div className="task-list-header">
              <Typography.Title level={4} style={{ margin: 0 }}>
                {dateKey}
              </Typography.Title>

              {dateKey === "Today" && (
                <Button
                  className="add-task-button"
                  onClick={() => navigate("/task/new")}
                >
                  Add Task
                </Button>
              )}
            </div>

            {groupedTasks[dateKey].length === 0 ? (
              <Typography.Text type="secondary">No tasks</Typography.Text>
            ) : (
              groupedTasks[dateKey].map((task) =>
                task ? (
                  <TaskCard
                    key={task.id}
                    task={task}
                    onCardClick={() => navigate(`/task/${task.id}`)}
                  />
                ) : null
              )
            )}
          </div>
        ))}
      </div>
    </main>
  );
}
