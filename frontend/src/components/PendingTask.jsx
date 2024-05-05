/* eslint-disable react/prop-types */
import { Button } from "antd";
import "../App.css";
import { CheckCircleOutlined, DeleteOutlined } from "@ant-design/icons";

// eslint-disable-next-line react/prop-types
const PendingTask = ({
  id,
  name,
  description,
  handleDelete,
  handleComplete,
}) => {
  return (
    <div className="content-box">
      <div className="content-item">
        <div className="content-description">
          <Button
            className="content-done-btn"
            onClick={() => handleComplete(id)}
          >
            <CheckCircleOutlined className="icons" />
          </Button>
          <div className="content-name">
            <h4>{name}</h4>
            <p>{description}</p>
          </div>
        </div>
        <Button onClick={() => handleDelete(id)}>
          <DeleteOutlined className="icon" />
        </Button>
      </div>
      <hr />
    </div>
  );
};

export default PendingTask;
