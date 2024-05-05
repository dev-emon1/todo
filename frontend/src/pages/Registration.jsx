import { Button, Form, Input } from "antd";
import Container from "../components/Container";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";

const Registration = () => {
  const [loading, setLoading] = useState(false);
  const [files, setFiles] = useState();
  const [form] = Form.useForm();
  const navigate = useNavigate();

  console.log(files);

  // registration form submission
  const onFinish = async (values) => {
    const { data } = await axios.post(
      "http://localhost:8000/api/v1/registration",
      {
        username: values.username,
        email: values.email,
        password: values.password,
        image: files,
      }
    );
    setLoading(true);

    // registration message
    (data &&
      data.success &&
      toast.success(data.success, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        progress: undefined,
        pauseOnHover: false,
      })) ||
      (data.error &&
        toast.error(data.error, {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          progress: undefined,
          pauseOnHover: false,
        }));
    setLoading(false);

    // navigate to login
    data &&
      data.success &&
      setTimeout(() => {
        navigate("/login");
      }, 2500);
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <>
      <ToastContainer />

      <Container>
        <div className="form-group">
          <Form
            form={form}
            encType="multipart/form-data"
            name="basic"
            labelCol={{
              span: 8,
            }}
            wrapperCol={{
              span: 16,
            }}
            style={{
              maxWidth: 600,
            }}
            initialValues={{
              remember: true,
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <Form.Item
              label="Username"
              name="username"
              rules={[
                {
                  required: true,
                  message: "Please input your username!",
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Email"
              name="email"
              rules={[
                {
                  required: true,
                  message: "Please input your email!",
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              rules={[
                {
                  required: true,
                  message: "Please input your password!",
                },
              ]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item
              label="Image"
              name="image"
              rules={[
                {
                  required: false,
                  message: "Upload your image!",
                },
              ]}
            >
              <input type="file" onChange={(e) => setFiles(e.target.value)} />
              {/* <Upload action="http://localhost:8000/images/">
                <Button icon={<UploadOutlined />}>Click to Upload</Button>
              </Upload> */}
            </Form.Item>

            <Form.Item
              wrapperCol={{
                offset: 8,
                span: 16,
              }}
            >
              <Button
                type="primary"
                htmlType="submit"
                loading={loading}
                disabled={loading}
              >
                Submit
              </Button>
              <Link to="/login" className="switch-auth-pages">
                Already have an account?
              </Link>
            </Form.Item>
          </Form>
        </div>
      </Container>
    </>
  );
};

export default Registration;
