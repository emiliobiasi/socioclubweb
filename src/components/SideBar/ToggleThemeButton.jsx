import { Button } from "antd";
import styles from "./SideBar.module.css";
import { HiOutlineMoon, HiOutlineSun } from "react-icons/hi";

const ToggleThemeButton = ({ darkTheme, toggleTheme }) => {
  return (
    <div className={styles.toggleThemeBtn}>
      <Button onClick={toggleTheme}>
        {darkTheme ? <HiOutlineSun /> : <HiOutlineMoon />}
      </Button>
    </div>
  );
};

export default ToggleThemeButton;
