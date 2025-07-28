import { useParams, useNavigate, useLocation } from "react-router-dom";
import { Form, Input, Select, Button, Space, Result } from "antd";
import { useTaskStore } from "@entities/model/store";
import type { TaskItem } from "@entities/model/types";

const defaultValues: Partial<TaskItem> = {
  taskCategory: "Bug",
  taskStatus: "To Do",
  taskPriority: "Medium",
  taskDate: "Today",
};

export default function TaskFormPage() {
  const { id } = useParams();
  const location = useLocation();
  const isCreating = location.pathname === "/task/new" || id === "new";
  const navigate = useNavigate();

  const tasks = useTaskStore((state) => state.tasks);
  const addTask = useTaskStore((state) => state.addTask);
  const updateTask = useTaskStore((state) => state.updateTask);

  const task = !isCreating ? tasks.find((t) => t.id === Number(id)) : null;

  const [form] = Form.useForm<TaskItem>();

  if (!isCreating && !task) {
    return (
      <div className="main-container">
        <Result
          status="404"
          title="Task not found"
          extra={<Button onClick={() => navigate("/")}>Back</Button>}
        />
      </div>
    );
  }

const handleFinish = (values: Partial<TaskItem>) => {
  if (isCreating) {
    addTask(values as Omit<TaskItem, "id">);
  } else if (task) {
    updateTask(task.id, values);
  }
  navigate("/");
};

  return (
    <div className="main-container">
      <div className="task-details-container">
        <Button className="dark-button" onClick={() => navigate("/")}>
          Back to List
        </Button>

        <Form
          form={form}
          layout="vertical"
          initialValues={task ?? defaultValues}
          onFinish={handleFinish}
        >
          <Form.Item
            name="taskHeader"
            label="Header"
            rules={[{ required: true, message: "Header is required" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item name="taskDescription" label="Description">
            <Input.TextArea />
          </Form.Item>

          <Form.Item
            name="taskCategory"
            label="Category"
            rules={[{ required: true, message: "Category is required" }]}
          >
            <Select options={["Bug", "Feature", "Task"].map((v) => ({ value: v }))} />
          </Form.Item>

          <Form.Item
            name="taskStatus"
            label="Status"
            rules={[{ required: true, message: "Status is required" }]}
          >
            <Select options={["To Do", "In Progress", "Done"].map((v) => ({ value: v }))} />
          </Form.Item>

          <Form.Item
            name="taskPriority"
            label="Priority"
            rules={[{ required: true, message: "Priority is required" }]}
          >
            <Select options={["Low", "Medium", "High"].map((v) => ({ value: v }))} />
          </Form.Item>

          <Form.Item
            name="taskDate"
            label="Date"
            rules={[{ required: true, message: "Date is required" }]}
          >
            <Select options={["Today", "Tomorrow", "Next 7 days"].map((v) => ({ value: v }))} />
          </Form.Item>

          <Form.Item>
            <Space>
              <Button className="form-button" htmlType="submit">
                Save
              </Button>
              <Button className="form-button" onClick={() => navigate(-1)}>
                Cancel
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}
