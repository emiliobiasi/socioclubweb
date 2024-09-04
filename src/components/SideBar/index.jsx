// src/components/SideBar.jsx
import { Button, Layout, theme } from "antd";
import styles from "./SideBar.module.css";
import Logo from "./Logo";
import MenuList from "./MenuList";
import { useState } from "react";
import ToggleThemeButton from "./ToggleThemeButton";
import { MenuUnfoldOutlined, MenuFoldOutlined } from "@ant-design/icons";
import PropTypes from "prop-types";


const { Header, Sider, Content } = Layout;  // Adicionei Content

const SideBar = ({ children }) => {  // Adicionei children como prop
  const [darkTheme, setDarkTheme] = useState(true);
  const [collapsed, setCollapsed] = useState(false);

  const toggleTheme = () => {
    setDarkTheme(!darkTheme);
  };

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <Layout style={{ minHeight: "100vh" }}> {/* Certifique-se de que o Layout ocupa toda a altura */}
      <Sider
        collapsed={collapsed}
        collapsible
        trigger={null}
        theme={darkTheme ? "dark" : "light"}
        className={styles.sidebar}
        width={200}  // Define a largura da sidebar
      >
        <Logo />
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
            onClick={() => setCollapsed(!collapsed)}  // Adicionei o evento onClick aqui
          />
        </Header>
        <Content style={{ margin: "16px", padding: 24, background: colorBgContainer }}>
          {children} {/* Adicionei o children para renderizar o conteúdo */}
        </Content>
      </Layout>
    </Layout>
  );
};

SideBar.propTypes = {
  children: PropTypes.node.isRequired,
};

export default SideBar;
