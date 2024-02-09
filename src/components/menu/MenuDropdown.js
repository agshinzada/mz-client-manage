import { DownOutlined } from "@ant-design/icons";
import { Button, Dropdown, Space } from "antd";
import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import ChangePasswordModal from "../modals/tools/ChangePasswordModal";
import AddedClientsModal from "../modals/tools/AddedClientsModal";
import RoutesModal from "../modals/tools/RoutesModal";
import { useNavigate } from "react-router-dom";

function MenuDropdown() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [changePasswordIsOpen, setChangePasswordIsOpen] = useState(false);
  const [dailyInsertedClientsIsOpen, setDailyInsertedClientsIsOpen] =
    useState(false);
  const [dailyInsertedStickersIsOpen, setDailyInsertedStickersIsOpen] =
    useState(false);
  const [dailyInsertedOfisIsOpen, setDailyInsertedOfisIsOpen] = useState(false);
  const [routesModalIsOpen, setRoutesModalIsOpen] = useState(false);
  const items = [
    {
      key: "1",
      type: "group",
      label: "İstifadəçi",
      children: [
        {
          key: "1-1",
          label: "Şifrəni dəyiş",
        },
      ],
    },
    {
      key: "2",
      type: "group",
      label: "Əlavə edilən",
      children: [
        {
          key: "2-1",
          label: "Müştərilər",
        },
        {
          key: "2-2",
          label: "Stikerlər",
        },
      ],
    },
    {
      key: "3",
      type: "group",
      label: "Digər",
      children: [
        {
          key: "3-1",
          label: "Rutlar",
        },
      ],
    },
    {
      key: "4",
      disabled: user.ROLE.trim() === "ADMIN" ? false : true,
      label: "İdarəetmə",
    },
  ];
  const onClick = ({ key }) => {
    switch (key) {
      case "1-1":
        setChangePasswordIsOpen(true);
        break;
      case "2-1":
        setDailyInsertedClientsIsOpen(true);
        break;
      case "2-2":
        setDailyInsertedStickersIsOpen(true);
        break;

      case "3-1":
        setRoutesModalIsOpen(true);
        break;
      case "4":
        navigate("/dashboard");
        break;

      default:
        break;
    }
  };
  return (
    <>
      <Dropdown
        menu={{
          items,
          onClick,
        }}
        trigger={["click"]}
      >
        <Button>
          <Space>
            Menu
            <DownOutlined />
          </Space>
        </Button>
      </Dropdown>
      <ChangePasswordModal
        isOpen={changePasswordIsOpen}
        setIsOpen={setChangePasswordIsOpen}
      />
      <AddedClientsModal
        isOpen={dailyInsertedClientsIsOpen}
        setIsOpen={setDailyInsertedClientsIsOpen}
        type="clients"
        rut={true}
        title={"Əlavə edilən müştərilər"}
      />
      <AddedClientsModal
        isOpen={dailyInsertedStickersIsOpen}
        setIsOpen={setDailyInsertedStickersIsOpen}
        type="stickers"
        title={"Əlavə edilən stikerlər"}
      />
      <RoutesModal
        isOpen={routesModalIsOpen}
        setIsOpen={setRoutesModalIsOpen}
      />
    </>
  );
}

export default MenuDropdown;
