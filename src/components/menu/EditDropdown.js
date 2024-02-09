import { DownOutlined } from "@ant-design/icons";
import { Button, Dropdown, Space } from "antd";
import { useState } from "react";
import SearchStickerModal from "../modals/sticker/SearchStickerModal";
import UpdateClientTaxModal from "../modals/client/UpdateClientTaxModal";

function EditDropdown() {
  const [updateStickerIsOpen, setUpdateStickerIsOpen] = useState(false);
  const [updateClientsTaxIsOpen, setUpdateClientsTaxIsOpen] = useState(false);
  const items = [
    {
      key: "1",
      type: "group",
      label: "VÖEN və ya Ad",
      children: [
        {
          key: "1-1",
          label: "Stiker kodu",
        },
      ],
    },
    {
      key: "2",
      type: "group",
      label: "VÖEN",
      children: [
        {
          key: "2-1",
          label: "Müştəri kodu",
        },
      ],
    },
  ];
  const onClick = ({ key }) => {
    switch (key) {
      case "1-1":
        setUpdateStickerIsOpen(true);
        break;
      case "2-1":
        setUpdateClientsTaxIsOpen(true);
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
            Düzəliş
            <DownOutlined />
          </Space>
        </Button>
      </Dropdown>
      <SearchStickerModal
        isOpen={updateStickerIsOpen}
        setIsOpen={setUpdateStickerIsOpen}
      />
      <UpdateClientTaxModal
        isOpen={updateClientsTaxIsOpen}
        setIsOpen={setUpdateClientsTaxIsOpen}
      />
    </>
  );
}

export default EditDropdown;
