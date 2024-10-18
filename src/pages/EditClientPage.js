import { Button, Form, Input, Space, Table } from "antd";
import React, { useState } from "react";
import {
  fetchStickerBySearch,
  fetchStickerHierarchy,
  fetchUpdateNameBySticker,
  fetchUpdateTaxBySticker,
} from "../services/stickerService";
import HierarchyModal from "../components/modals/sticker/HierarchyModal";
import EditStickerFieldModal from "../components/modals/sticker/EditStickerFieldModal";
import { useAuth } from "../context/AuthContext";
import Swal from "sweetalert2";

const EditClientPage = () => {
  const [form] = Form.useForm();
  const { user } = useAuth();

  const [data, setData] = useState([]);
  const [editFieldIsOpen, setEditFieldIsOpen] = useState(false);
  const [selectedField, setSelectedField] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(false);
  const [hierarchyIsOpen, setHierarchyIsOpen] = useState(false);
  const [hierarchyData, setHierarchyData] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (e) => {
    setLoading(true);
    const tableData = await fetchStickerBySearch(e.name);
    setData(tableData);
    setLoading(false);
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
      text: "Stiker və müştərilərinin məlumatları dəyişəcək",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Dəyiş",
      cancelButtonText: "İmtina",
    }).then(async (result) => {
      if (result.isConfirmed) {
        setLoading(true);
        if (selectedField === "tax") {
          res = await fetchUpdateTaxBySticker({
            value,
            sticker: selectedRecord,
            token: user.TOKEN,
            userRef: user.REF,
          });
        } else {
          res = await fetchUpdateNameBySticker({
            value,
            sticker: selectedRecord,
            token: user.TOKEN,
            userRef: user.REF,
          });
        }
      }
      if (res) {
        setLoading(false);
        setEditFieldIsOpen(false);
      }
    });
    setLoading(false);
  };

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

  return (
    <>
      <p className="font-bold mb-8">MÜŞTƏRİ DÜZƏLİŞİ</p>
      <Form layout="vertical" form={form} onFinish={handleSearch}>
        <Form.Item
          name={"name"}
          label="Kod və ya ad"
          rules={[{ required: true, message: "Xananı doldurun" }]}
        >
          <Input type="text" maxLength={50} size="middle" />
        </Form.Item>
      </Form>
      <Table
        dataSource={data}
        columns={columns}
        pagination={true}
        rowKey={(record) => record.LOGICALREF}
        loading={loading}
      />
      <HierarchyModal
        isOpen={hierarchyIsOpen}
        setIsOpen={setHierarchyIsOpen}
        data={hierarchyData}
      />
      <EditStickerFieldModal
        isOpen={editFieldIsOpen}
        setIsOpen={setEditFieldIsOpen}
        handleSubmit={handleSubmit}
        loading={loading}
      />
    </>
  );
};

export default EditClientPage;
