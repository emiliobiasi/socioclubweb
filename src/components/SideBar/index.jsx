// src/components/SideBar.jsx
import { Button, Layout, theme } from "antd";
import styles from "./SideBar.module.css";
import Logo from "./Logo";
import MenuList from "./MenuList";
import { useState } from "react";
import ToggleThemeButton from "./ToggleThemeButton";
import { MenuUnfoldOutlined, MenuFoldOutlined } from "@ant-design/icons";
import PropTypes from "prop-types";
import LogoDark from "./LogoDark";


const { Header, Sider, Content } = Layout; 

const SideBar = ({ children }) => {  
  const [darkTheme, setDarkTheme] = useState(true);
  const [collapsed, setCollapsed] = useState(false);

  const toggleTheme = () => {
    setDarkTheme(!darkTheme);
  };

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
        collapsed={collapsed}
        collapsible
        trigger={null}
        theme={darkTheme ? "dark" : "light"}
        className={styles.sidebar}
        width={200}
      >
        {darkTheme ? <Logo /> : <LogoDark />}
        <MenuList darkTheme={darkTheme} />
        <ToggleThemeButton darkTheme={darkTheme} toggleTheme={toggleTheme} />
      </Sider>
      <Layout>
        <Header
          className={styles.toggle}
          style={{ padding: 0, background: colorBgContainer }}
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
          />
        </Header>
        <Content style={{ margin: "16px", background: colorBgContainer }}>
          {children} 
        </Content>
      </Layout>
    </Layout>
  );
};

SideBar.propTypes = {
  children: PropTypes.node.isRequired,
};

export default SideBar;
