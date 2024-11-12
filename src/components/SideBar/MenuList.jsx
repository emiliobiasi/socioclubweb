import { Menu } from "antd";
import {
  HomeOutlined,
  AppstoreOutlined,
  AreaChartOutlined,
  PayCircleOutlined,
  SettingOutlined,
  BarsOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import styles from "./SideBar.module.css";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/auth/useAuth";

const MenuList = ({ darkTheme }) => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  return (
    <Menu
      theme={darkTheme ? "dark" : "light"}
      mode="inline"
      className={styles.menuBar}
    >
      <Menu.Item
        key="home"
        icon={<HomeOutlined />}
        onClick={() => navigate("/inicio")}
      >
        Início{" "}
      </Menu.Item>
      {/* <Menu.Item key="activity" icon={<AppstoreOutlined />}>
        Activity
      </Menu.Item> */}
      <Menu.SubMenu key="subtarks" icon={<BarsOutlined />} title="Gerenciar">
        <Menu.Item key="taks-1" onClick={() => navigate("/gerenciar-planos")}>
          Planos
        </Menu.Item>
        <Menu.Item key="taks-2" onClick={() => navigate("/gerenciar-produtos")}>
          Produtos
        </Menu.Item>
        <Menu.Item key="taks-3" onClick={() => navigate("/gerenciar-eventos")}>
          Eventos
        </Menu.Item>
        <Menu.Item key="taks-4" onClick={() => navigate("/gerenciar-noticias")}>
          Notícias
        </Menu.Item>
        {/* <Menu.SubMenu key="subtasks" title="Subtasks">
          <Menu.Item key="subtask-1">Subtask 1</Menu.Item>
          <Menu.Item key="subtask-2">Subtask 2</Menu.Item>
        </Menu.SubMenu> */}
      </Menu.SubMenu>
      <Menu.Item
        key="progress"
        icon={<AreaChartOutlined />}
        onClick={() => navigate("/financeiro")}
      >
        Financeiro
      </Menu.Item>
      <Menu.Item
        key="analise"
        icon={<AppstoreOutlined />}
        onClick={() => navigate("/analise")}
      >
        Analise
      </Menu.Item>
      <Menu.Item
        key="payment"
        icon={<PayCircleOutlined />}
        onClick={() => navigate("/personalizar-clube")}
      >
        Personalização
      </Menu.Item>
      <Menu.Item key="setting" icon={<SettingOutlined />}>
        Configurações
      </Menu.Item>
      <Menu.Item key="logout" icon={<LogoutOutlined />} onClick={logout}>
        Sair
      </Menu.Item>
    </Menu>
  );
};

MenuList.propTypes = {
  darkTheme: PropTypes.bool.isRequired,
};

export default MenuList;
