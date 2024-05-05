import { Button, Form, Input } from "antd";
import Container from "../components/Container";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { activeUser } from "../Slice/userSlice";

const Login = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onFinish = async (values) => {
    const { data } = await axios.post("http://localhost:8000/api/v1/login", {
      email: values.email,
      password: values.password,
    });
    console.log(data.token);
    dispatch(activeUser(data));
    localStorage.setItem("user", JSON.stringify(data));
    setLoading(true);

    // success & error message
    (data &&
      data.success &&
      toast.success(data.success, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        progress: undefined,
      })) ||
      (data.error &&
        toast.error(data.error, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          progress: undefined,
        }));

    setTimeout(() => {
      if (data.success) {
        return navigate("/");
      }
    }, 1500);
    setLoading(false);
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
                Login
              </Button>
              <Link to="/registration">Create a new account.</Link>
              <Link to="/forgot">Forgot password?</Link>
            </Form.Item>
          </Form>
        </div>
      </Container>
    </>
  );
};

export default Login;
