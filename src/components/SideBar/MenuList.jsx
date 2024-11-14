import { useState } from "react";
import { Menu, Modal, message } from "antd";
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
import StripeService from "../../services/stripe.service";

const MenuList = ({ darkTheme }) => {
  const { auth, setAuth, logout } = useAuth();
  const navigate = useNavigate();

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalLoading, setModalLoading] = useState(false);
  const [loading, setLoading] = useState(false);

  const clubId = auth?.club?.id;
  const existingStripeId = auth?.club?.stripe_id;

  const handleFinanceiroClick = async () => {
    if (!existingStripeId || existingStripeId === "") {
      // No Stripe ID exists; create a new Stripe account and redirect to setup
      setLoading(true);
      try {
        const accountId = await createStripeAccount();
        // Create account link and redirect to complete setup
        const accountLinkUrl = await StripeService.createAccountLink(accountId);
        if (accountLinkUrl) {
          window.location.href = accountLinkUrl;
        } else {
          message.error("Erro ao criar link de configuração.");
        }
      } catch (error) {
        message.error("Erro ao criar conta Stripe.");
        console.error("Error creating Stripe account:", error);
      } finally {
        setLoading(false);
      }
    } else {
      // Stripe ID exists; attempt to open the Stripe Dashboard
      setLoading(true);
      try {
        await openStripeDashboard(existingStripeId);
      } catch (error) {
        console.error("Error opening Stripe Dashboard:", error);
        // Show modal to complete account setup
        setIsModalVisible(true);
      } finally {
        setLoading(false);
      }
    }
  };

  const createStripeAccount = async () => {
      const accountId = await StripeService.createStripeAccount();
      // Update the club's Stripe ID
      const updatedClub = await StripeService.updateClubStripeId(clubId, accountId);
      setAuth((prevAuth) => ({
        ...prevAuth,
        club: updatedClub,
      }));
      localStorage.setItem("club_info", JSON.stringify(updatedClub));
      return accountId;
    };

  const openStripeDashboard = async (accountId) => {
    const loginUrl = await StripeService.createLoginLink(accountId);
    if (loginUrl) {
      window.location.href = loginUrl;
    } else {
      throw new Error("No login URL returned");
    }
  };

  const handleModalOk = async () => {
    setModalLoading(true);
    try {
      const accountLinkUrl = await StripeService.createAccountLink(existingStripeId);
      if (accountLinkUrl) {
        window.location.href = accountLinkUrl;
      } else {
        message.error("Erro ao criar link de configuração.");
      }
    } catch (error) {
      message.error("Erro ao criar link de configuração.");
      console.error("Error creating account link:", error);
    } finally {
      setModalLoading(false);
      setIsModalVisible(false);
    }
  };

  const handleModalCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <>
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
          Início
        </Menu.Item>
        <Menu.SubMenu key="manage" icon={<BarsOutlined />} title="Gerenciar">
          <Menu.Item key="plans" onClick={() => navigate("/gerenciar-planos")}>
            Planos
          </Menu.Item>
          <Menu.Item key="products" onClick={() => navigate("/gerenciar-produtos")}>
            Produtos
          </Menu.Item>
          <Menu.Item key="events" onClick={() => navigate("/gerenciar-eventos")}>
            Eventos
          </Menu.Item>
          <Menu.Item key="news" onClick={() => navigate("/gerenciar-noticias")}>
            Notícias
          </Menu.Item>
        </Menu.SubMenu>
        <Menu.Item
          key="financeiro"
          icon={<AreaChartOutlined />}
          onClick={handleFinanceiroClick}
          disabled={loading}
        >
          {existingStripeId && existingStripeId !== "" ? "Financeiro" : "Configurar Stripe"}
        </Menu.Item>
        <Menu.Item
          key="analysis"
          icon={<AppstoreOutlined />}
          onClick={() => navigate("/analise")}
        >
          Análise
        </Menu.Item>
        <Menu.Item
          key="customization"
          icon={<PayCircleOutlined />}
          onClick={() => navigate("/personalizar-clube")}
        >
          Personalização
        </Menu.Item>
        <Menu.Item key="settings" icon={<SettingOutlined />}>
          Configurações
        </Menu.Item>
        <Menu.Item key="logout" icon={<LogoutOutlined />} onClick={logout}>
          Sair
        </Menu.Item>
      </Menu>

      <Modal
        title="Finalizar configuração"
        visible={isModalVisible}
        onOk={handleModalOk}
        onCancel={handleModalCancel}
        okText="Confirmar"
        cancelText="Cancelar"
        confirmLoading={modalLoading}
      >
        <p>Você precisa apenas finalizar a configuração de sua conta Stripe.</p>
      </Modal>
    </>
  );
};

MenuList.propTypes = {
  darkTheme: PropTypes.bool.isRequired,
};

export default MenuList;
