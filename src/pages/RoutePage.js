import { Form, Input, Table } from "antd";
import React, { useEffect, useState } from "react";
import { fetchRoutes, fetchRoutesBySearch } from "../services/rootService";

const RoutePage = () => {
  const [form] = Form.useForm();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(null);

  const handleSearch = async (param) => {
    setLoading(true);
    const data = await fetchRoutesBySearch(param.name);
    setData(data);
    setLoading(false);
  };

  const getRoutes = async () => {
    setLoading(true);
    const data = await fetchRoutes();
    setData(data);
    setLoading(false);
  };

  const columns = [
    {
      title: "Kod",
      dataIndex: "CODE",
      key: "CODE",
    },
    {
      title: "Ad",
      dataIndex: "DEFINITION",
      key: "DEFINITION",
    },
    {
      title: "Region",
      dataIndex: "REGION",
      key: "REGION",
    },
  ];

  useEffect(() => {
    getRoutes();
  }, []);
  return (
    <div className="flex flex-col">
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
    </div>
  );
};

export default RoutePage;
