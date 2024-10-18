import { DatePicker, Form, Input, Table, Tag } from "antd";
import React, { useEffect, useState } from "react";
import {
  fetchInsertedClients,
  fetchInsertedClientsByRange,
  fetchInsertedClientsBySearch,
} from "../services/clientService";
import { useAuth } from "../context/AuthContext";
const { RangePicker } = DatePicker;

const InsertedClientsPage = () => {
  const { user } = useAuth();
  const [dataSource, setDataSource] = useState([]);
  const [loading, setLoading] = useState(false);

  async function getInsertedClients() {
    setLoading(true);
    const data = await fetchInsertedClients(user.REF);
    setDataSource(data);
    setLoading(false);
  }
  async function handleSearch(e) {
    setLoading(true);
    const data = await fetchInsertedClientsBySearch(user.REF, e.value);
    setDataSource(data);
    setLoading(false);
  }
  async function handleRange(e) {
    setLoading(true);
    if (e) {
      const data = await fetchInsertedClientsByRange(
        user.REF,
        new Date(e[0].$d).toLocaleDateString("az"),
        new Date(e[1].$d).toLocaleDateString("az")
      );
      setDataSource(data);
    } else {
      getInsertedClients();
    }

    setLoading(false);
  }

  useEffect(() => {
    getInsertedClients();
  }, []);

  const columns = [
    {
      title: "Müştəri kodu",
      dataIndex: "CODE",
      key: "CODE",
      render: (text) => <Tag color="blue">{text}</Tag>,
    },
    {
      title: "Müştəri adı",
      dataIndex: "NAME",
      key: "NAME",
    },
    {
      title: "Ünvan",
      dataIndex: "ADRESS",
      key: "ADRESS",
    },
    {
      title: "VÖEN",
      dataIndex: "TAX",
      key: "TAX",
    },
    {
      title: "Endirim",
      dataIndex: "DISCOUNT_LABEL",
      key: "DISCOUNT_LABEL",
      render: (text) => (
        <Tag color="green">{text === "YOXDUR" ? text : `${text}%`}</Tag>
      ),
    },
    {
      title: "M/Ü gün limiti",
      dataIndex: "POSTCODE",
      key: "POSTCODE",
      render: (text) => <Tag color="green">{text}</Tag>,
    },
    {
      title: "Tarix",
      dataIndex: "DATE",
      key: "DATE",
      render: (date) => new Date(date).toLocaleDateString("az"),
    },
  ];

  return (
    <div>
      <p className="font-bold mb-8">YARADILAN MÜŞTƏRİLƏR</p>
      <div className="flexflex-col">
        <div className="flex justify-between">
          <div className="flex flex-col gap-1">
            <p>Axtarış:</p>
            <Form onFinish={handleSearch}>
              <Form.Item
                name={"value"}
                rules={[
                  {
                    required: true,
                    message: "Xananı doldurun",
                  },
                ]}
              >
                <Input className="w-fit" placeholder=" Kod və ya ad" />
              </Form.Item>
            </Form>
          </div>
          <div className="flex flex-col gap-1">
            <p>Tarix aralığı:</p>
            <RangePicker
              placeholder={["Tarixdən", "Tarixə"]}
              className="w-fit"
              onChange={handleRange}
            />
          </div>
        </div>
        <Table
          dataSource={dataSource}
          columns={columns}
          pagination={true}
          rowKey={(record) => record.CODE}
          loading={loading}
        />
      </div>
    </div>
  );
};

export default InsertedClientsPage;
