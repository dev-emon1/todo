import { Button, Divider, Form, Input } from "antd";
import Header from "../components/Header";
import "../App.css";
import PendingTask from "../components/PendingTask";
import CompletedItem from "../components/CompletedItem";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { useEffect, useState } from "react";
import Logout from "../components/Logout";

const Home = () => {
  const [taskData, setTaskData] = useState([]);
  const [completedTask, setCompletedTask] = useState([]);
  const [form] = Form.useForm();

  // post task data
  const onFinish = async (values) => {
    const { data } = await axios.post("http://localhost:8000/api/v1/addtask", {
      name: values.item,
      description: values.description,
    });
    form.resetFields();
    (data &&
      data.success &&
      toast.success(data.success, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        pauseOnHover: false,
        draggable: false,
      })) ||
      (data.error &&
        toast.error(data.error, {
          position: "top-right",
          autoClose: 2500,
          hideProgressBar: false,
          pauseOnHover: false,
          draggable: false,
        }));
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  // get task data
  useEffect(() => {
    async function viewTasks() {
      const { data } = await axios.get(
        "http://localhost:8000/api/v1/viewtasks"
      );
      setTaskData(data);
    }
    viewTasks();
  }, [taskData]);

  // delete task
  const handleDelete = async (id) => {
    const { data } = await axios.delete(`http://localhost:8000/api/v1/delete`, {
      id: id,
    });
    (data &&
      data.success &&
      toast.success(data.success, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        pauseOnHover: false,
        draggable: false,
      })) ||
      (data.error &&
        toast.error(data.error, {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          pauseOnHover: false,
          draggable: false,
        }));
  };

  // task data move to completed task
  const handleComplete = async (id) => {
    await axios.post(`http://localhost:8000/api/v1/movetask`, {
      _id: id,
    });
  };

  // get completed data
  useEffect(() => {
    async function viewCompletedTask() {
      const { data } = await axios.get(
        "http://localhost:8000/api/v1/viewcompletedtask"
      );
      setCompletedTask(data);
    }
    viewCompletedTask();
  }, [completedTask]);

  // delete complete tasks
  const handleCompleteDelete = async (id) => {
    const { data } = await axios.delete(
      `http://localhost:8000/api/v1/deletecomplete`,
      {
        id: id,
      }
    );
    (data &&
      data.success &&
      toast.success(data.success, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        pauseOnHover: false,
        draggable: false,
      })) ||
      (data.error &&
        toast.error(data.error, {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          pauseOnHover: false,
          draggable: false,
        }));
  };

  return (
    <>
      <ToastContainer />
      <div className="container-2">
        <Logout />
        <div className="main-box">
          <Header />
          <hr />
          <div className="add-task">
            <Form
              form={form}
              name="basic"
              layout="vertical"
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              autoComplete="off"
              className="task-form"
              style={{ maxHeight: "full" }}
            >
              <Form.Item
                label="Item"
                name="item"
                rules={[
                  {
                    required: true,
                    message: "Give the item name!",
                  },
                ]}
                style={{ width: "35%" }}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="Description"
                name="description"
                rules={[
                  {
                    required: true,
                    message: "Give the description!",
                  },
                ]}
                style={{ width: "35%" }}
                value="large"
              >
                <Input />
              </Form.Item>

              <Button type="primary" htmlType="submit" className="add-task-btn">
                Add Task
              </Button>
            </Form>
          </div>
          {taskData.map((item, index) => (
            <PendingTask
              key={index}
              name={item.name}
              description={item.description}
              handleDelete={handleDelete}
              id={item._id}
              handleComplete={handleComplete}
            />
          ))}
          <Divider />
          <div className="complete-box">
            <h2>Completed Items</h2>
            {completedTask.map((item, index) => (
              <CompletedItem
                key={index}
                name={item.name}
                description={item.description}
                id={item._id}
                handleCompleteDelete={handleCompleteDelete}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
