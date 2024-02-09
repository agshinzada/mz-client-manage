import { Button, Form, Input, Modal, Space, Table } from "antd";
import { useState } from "react";
import {
  fetchStickerBySearch,
  fetchStickerHierarchy,
  fetchUpdateNameBySticker,
  fetchUpdateStickerTax,
} from "../../../services/stickerService";
import EditStickerFieldModal from "./EditStickerFieldModal";
import Swal from "sweetalert2";
import { useAuth } from "../../../context/AuthContext";
import HierarchyModal from "./HierarchyModal";

function SearchStickerModal({ isOpen, setIsOpen }) {
  const [data, setData] = useState([]);
  const [form] = Form.useForm();
  const { user } = useAuth();

  // EDIT MODAL
  const [editFieldIsOpen, setEditFieldIsOpen] = useState(false);
  const [selectedField, setSelectedField] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(false);
  // Hierarchy MODAL
  const [hierarchyIsOpen, setHierarchyIsOpen] = useState(false);
  const [hierarchyData, setHierarchyData] = useState([]);

  const columns = [
    {
      title: "Bölgə",
      dataIndex: "CITY",
      key: "CITY",
    },
    {
      title: "Kod",
      dataIndex: "CODE",
      key: "CODE",
      render: (_, record) => (
        <Space size="middle" className="flex justify-between">
          <p
            className="text-blue-700 cursor-pointer"
            onClick={() => {
              handleHierarchy(record);
            }}
          >
            {record.CODE}
          </p>
        </Space>
      ),
    },
    {
      title: "Ad",
      dataIndex: "DEFINITION",
      key: "DEFINITION",
      render: (_, record) => (
        <Space size="middle" className="flex justify-between">
          <p>{record.DEFINITION}</p>
          <Button
            danger
            onClick={() => {
              setSelectedRecord(record);
              setSelectedField("name");
              setEditFieldIsOpen(true);
            }}
          >
            Dəyiş
          </Button>
        </Space>
      ),
    },
    {
      title: "VÖEN",
      dataIndex: "TAX",
      key: "TAX",
      render: (_, record) => (
        <Space size="middle" className="flex justify-between">
          <p>{record.TAX}</p>
          <Button
            danger
            onClick={() => {
              setSelectedRecord(record);
              setSelectedField("tax");
              setEditFieldIsOpen(true);
            }}
          >
            Dəyiş
          </Button>
        </Space>
      ),
    },
  ];

  const handleSearch = async (e) => {
    const tableData = await fetchStickerBySearch(e.name);
    setData(tableData);
  };

  const handleHierarchy = async (record) => {
    const tableData = await fetchStickerHierarchy(record);
    setHierarchyData(tableData);
    setHierarchyIsOpen(true);
  };

  const handleSubmit = async (e) => {
    const value = e.field;
    let res;
    Swal.fire({
      title: "Düzəliş təsdiqi",
      text: `${
        selectedField === "tax"
          ? "Stikerin VÖEN məlumatı dəyişəcək"
          : "Stiker və müştərilərinin məlumatları dəyişəcək"
      }`,
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Dəyiş",
      cancelButtonText: "İmtina",
    }).then(async (result) => {
      if (result.isConfirmed) {
        if (selectedField === "tax") {
          res = await fetchUpdateStickerTax({
            tax: value,
            sticker: selectedRecord,
            token: user.TOKEN,
          });
        } else {
          res = await fetchUpdateNameBySticker({
            name: value,
            sticker: selectedRecord,
            token: user.TOKEN,
          });
        }
      }
      if (res) {
        setEditFieldIsOpen(false);
      }
    });
  };

  return (
    <>
      <Modal
        open={isOpen}
        onCancel={() => setIsOpen(false)}
        centered
        maskClosable={false}
        footer={false}
        title={"Axtarış"}
      >
        <Form
          layout="vertical"
          // onFinish={handleSearch}
          form={form}
          onValuesChange={handleSearch}
        >
          <Form.Item
            name={"name"}
            label="Stiker kod və ya ad"
            rules={[{ required: true, message: "Xananı doldurun" }]}
            className="mt-5"
          >
            <Input type="text" maxLength={50} size="large" />
          </Form.Item>
        </Form>
        <Table
          dataSource={data}
          columns={columns}
          pagination={false}
          rowKey={(record) => record.LOGICALREF}
        />
        <div>
          <Button
            onClick={() => setIsOpen(false)}
            className="w-full mt-8"
            size="large"
          >
            OK
          </Button>
        </div>
      </Modal>
      <EditStickerFieldModal
        isOpen={editFieldIsOpen}
        setIsOpen={setEditFieldIsOpen}
        handleSubmit={handleSubmit}
      />
      <HierarchyModal
        isOpen={hierarchyIsOpen}
        setIsOpen={setHierarchyIsOpen}
        data={hierarchyData}
      />
      {/* <ClientHierarchy
        sticker={hierarchySticker}
        clients={hierarchyClients}
        isOpen={clientHierarchyIsOpen}
        setIsOpen={setClientHierarchyIsOpen}
      /> */}
    </>
  );
}

export default SearchStickerModal;
