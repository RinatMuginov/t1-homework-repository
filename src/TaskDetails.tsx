import { useParams, useNavigate } from "react-router-dom";
import { Form, Input, Select, Button, Space, Result } from "antd";
import type { TaskItem } from "./types";
import type { Dispatch, SetStateAction } from "react";

interface Props {
  tasks: TaskItem[];
  setTasks: Dispatch<SetStateAction<TaskItem[]>>;
}

export default function TaskDetails({ tasks, setTasks }: Props) {
  const { id }   = useParams();
  const navigate = useNavigate();
  const task     = tasks.find(t => t.id === Number(id));

  if (!task) return <Result status="404" title="Task not found" />;

  const [form] = Form.useForm<TaskItem>();

  const updateTask = (u: TaskItem) =>
    setTasks(prev => prev.map(t => (t.id === u.id ? u : t)));

  return (
        <div className="task-details-container">
        <Button
        type="text"
        onClick={() => navigate(-1)}
        className="back-button"
        tabIndex={0}
        >
        Back to list
        </Button>
      <Form
        form={form}
        initialValues={task}
        layout="vertical"
        onFinish={vals => {
          updateTask({ ...task, ...vals });
          navigate("/");
        }}
      >
        <Form.Item name="taskHeader" label="Header" rules={[{ required: true }]}>
          <Input />
        </Form.Item>

        <Form.Item name="taskDescription" label="Description">
          <Input.TextArea rows={3} />
        </Form.Item>

        <Form.Item name="taskCategory" label="Category">
          <Select options={["Bug","Feature","Documentation","Refactor","Test"].map(v=>({value:v}))}/>
        </Form.Item>

        <Form.Item name="taskStatus" label="Status">
          <Select options={["To Do","In Progress","Done"].map(v=>({value:v}))}/>
        </Form.Item>

        <Form.Item name="taskPriority" label="Priority">
          <Select options={["Low","Medium","High"].map(v=>({value:v}))}/>
        </Form.Item>

        <Form.Item name="taskDate" label="Date" rules={[{ required: true }]}>
            <Select options={["Today", "Tomorrow", "Next 7 days"].map(value => ({ value }))} />
        </Form.Item>

        <Form.Item>
        <Space>
            <Button type="primary" htmlType="submit" className="save-button">
            Save
            </Button>
            <Button onClick={() => navigate(-1)} className="save-button">
            Cancel
            </Button>
        </Space>
        </Form.Item>

      </Form>
    </div>
  );
}
