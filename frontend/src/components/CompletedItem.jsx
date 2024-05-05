/* eslint-disable react/prop-types */

import { Button } from "antd";
import "../App.css";
import { CheckOutlined, DeleteOutlined } from "@ant-design/icons";

const CompletedItem = ({ id, name, description, handleCompleteDelete }) => {
  return (
    <div className="content-box">
      <div className="content-item">
        <div className="content-description">
          <Button className="content-done-btn" disabled>
            <CheckOutlined className="icon2" />
          </Button>
          <div className="content-name">
            <h4 className="del-content">
              <del>{name}</del>
            </h4>
            <p>
              <del>{description}</del>
            </p>
          </div>
        </div>
        <Button onClick={() => handleCompleteDelete(id)}>
          <DeleteOutlined className="icon" />
        </Button>
      </div>
      <hr />
    </div>
  );
};

export default CompletedItem;
