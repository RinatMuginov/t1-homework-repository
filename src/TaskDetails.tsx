import { useParams, useNavigate } from "react-router-dom";
import { Form, Input, Select, Button, Space, Result } from "antd";
import { useTaskStore } from "@entities/model/store";
import type { TaskItem, TaskDate } from "@entities/model/types";

export default function TaskDetails() {
  const { id } = useParams<{ id?: string }>();
  const navigate = useNavigate();

  const { tasks, addTask, updateTask } = useTaskStore();
  const [form] = Form.useForm<TaskItem>();

  const isCreating = id === "new";
  const task = !isCreating ? tasks.find((t) => t.id === Number(id)) : null;

  // Если редактируем и задача не найдена — 404
  if (!isCreating && !task) {
    return (
      <Result
        status="404"
        title="Task not found"
        extra={
          <Button type="primary" onClick={() => navigate("/")}>
            Back to tasks
          </Button>
        }
      />
    );
  }

  // Начальные значения для новой задачи
  const initialValues: Omit<TaskItem, "id"> = task ?? {
    taskHeader: "",
    taskDescription: "",
    taskCategory: "Feature",
    taskStatus: "To Do",
    taskPriority: "Medium",
    taskDate: "Today",
  };

  const handleFinish = (values: Omit<TaskItem, "id">) => {
    if (isCreating) {
      addTask(values);
    } else if (task) {
      updateTask(task.id, values);
    }
    navigate("/");
  };

  return (
    <div className="task-details-container">
      <Button type="text" onClick={() => navigate(-1)} className="back-button">
        Back to list
      </Button>

      <Form
        form={form}
        initialValues={initialValues}
        layout="vertical"
        onFinish={handleFinish}
      >
        <Form.Item name="taskHeader" label="Header" rules={[{ required: true }]}>
          <Input />
        </Form.Item>

        <Form.Item name="taskDescription" label="Description">
          <Input.TextArea rows={3} />
        </Form.Item>

        <Form.Item name="taskCategory" label="Category">
          <Select options={["Bug", "Feature", "Documentation", "Refactor", "Test"].map(v => ({ value: v }))} />
        </Form.Item>

        <Form.Item name="taskStatus" label="Status">
          <Select options={["To Do", "In Progress", "Done"].map(v => ({ value: v }))} />
        </Form.Item>

        <Form.Item name="taskPriority" label="Priority">
          <Select options={["Low", "Medium", "High"].map(v => ({ value: v }))} />
        </Form.Item>

        <Form.Item name="taskDate" label="Date" rules={[{ required: true }]}>
          <Select options={["Today", "Tomorrow", "Next 7 days"].map(v => ({ value: v }))} />
        </Form.Item>

        <Form.Item>
          <Button className="add-task-button">
            {isCreating ? "Create Task" : "Save"}
          </Button>
          <Button onClick={() => navigate(-1)} className="add-task-button">
            Cancel
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
