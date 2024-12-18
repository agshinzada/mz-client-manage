import { Modal, Space, Table, Tag } from "antd";

function HierarchyModal({ isOpen, setIsOpen, data }) {
  const columns = [
    {
      title: "RUT",
      dataIndex: "RUT",
      key: "RUT",
    },
    {
      title: "KOD",
      dataIndex: "CODE",
      key: "CODE",
    },
    {
      title: "AD",
      dataIndex: "NAME",
      key: "NAME",
    },
    {
      title: "VÖEN",
      dataIndex: "TAX",
      key: "TAX",
    },
    {
      title: "STATUS",
      dataIndex: "ACTIVE",
      key: "ACTIVE",
      render: (_, record) => (
        <Space size="middle" className="flex justify-between">
          {record.ACTIVE === 0 ? (
            <Tag color={"blue"} key={record.ACTIVE}>
              Aktiv
            </Tag>
          ) : (
            <Tag color={"green"} key={record.ACTIVE}>
              Passiv
            </Tag>
          )}
        </Space>
      ),
    },
  ];
  return (
    <Modal
      open={isOpen}
      onCancel={() => setIsOpen(false)}
      centered
      maskClosable={false}
      footer={false}
      title={"Müştərilər"}
    >
      <Table
        dataSource={data}
        columns={columns}
        rowKey={(record) => record.LOGICALREF}
      />
    </Modal>
  );
}

export default HierarchyModal;
