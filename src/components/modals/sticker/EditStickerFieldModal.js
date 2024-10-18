import { Button, Form, Input, Modal } from "antd";

function EditStickerFieldModal({ isOpen, setIsOpen, handleSubmit, loading }) {
  const [form] = Form.useForm();

  return (
    <Modal
      open={isOpen}
      onCancel={() => setIsOpen(false)}
      centered
      maskClosable={false}
      footer={false}
      title={"Düzəliş"}
    >
      <Form layout="vertical" onFinish={handleSubmit} form={form}>
        <Form.Item
          name={"field"}
          label="Yeni dəyər"
          rules={[{ required: true, message: "Xananı doldurun" }]}
          className="mt-5"
        >
          <Input type="text" maxLength={50} size="large" />
        </Form.Item>
        <Form.Item>
          <Button
            size="middle"
            type="primary"
            htmlType="submit"
            className="w-full"
            loading={loading}
          >
            Göndər
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
}

export default EditStickerFieldModal;
