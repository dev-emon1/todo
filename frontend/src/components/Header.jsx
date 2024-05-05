import { SolutionOutlined } from "@ant-design/icons";
import "../App.css";

const Header = () => {
  return (
    <div className="header">
      <SolutionOutlined className="icon" />
      <h2>List of Tasks</h2>
      <p>Facilite sua ida ao supermercado!</p>
    </div>
  );
};

export default Header;
