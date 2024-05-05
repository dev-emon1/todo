import { UserOutlined } from "@ant-design/icons";
import { Avatar, Popconfirm, Space, message } from "antd";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

const Logout = () => {
  // const { user } =
  //   localStorage.getItem("user") && JSON.parse(localStorage.getItem("user"));

  const navigate = useNavigate();

  const confirm = (e) => {
    if (e.bubbles === true) {
      localStorage.removeItem("user");
      navigate("/login");
    }
    toast.success("Logout successful");
  };

  // eslint-disable-next-line no-unused-vars
  const cancel = (e) => {
    message.error("Logout cancel");
  };

  return (
    <div className="logout-main">
      <ToastContainer />
      <Popconfirm
        title="Do you want to logout?"
        onConfirm={confirm}
        onCancel={cancel}
        okText="Yes"
        cancelText="No"
      >
        <Space wrap size={16}>
          <Avatar shape="square" size={80} icon={<UserOutlined />} />
        </Space>
      </Popconfirm>
    </div>
  );
};

export default Logout;
