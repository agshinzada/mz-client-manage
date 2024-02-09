import { Button, Form, Input, Spin } from "antd";
import TextArea from "antd/es/input/TextArea";
import { useAuth } from "../../../context/AuthContext";
import { fetchUpdateClientsTax } from "../../../services/clientService";
import { useState } from "react";

function UpdateTaxForm() {
  const [form] = Form.useForm();
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);

  const submitClient = async (e) => {
    setLoading(true);
    setTimeout(async () => {
      const codes = e.codes.split("\n");
      const res = await fetchUpdateClientsTax({
        codes,
        tax: e.tax,
        token: user.TOKEN,
      });
      if (res) {
        form.resetFields();
        setLoading(false);
      } else {
        setLoading(false);
      }
    }, 700);
  };
  return (
    <Spin spinning={loading}>
      <Form
        form={form}
        layout="vertical"
        onFinish={submitClient}
        className="flex flex-col"
      >
        <Form.Item
          name={"codes"}
          label="Müştəri kodları"
          rules={[{ required: true, message: "Xananı doldurun" }]}
        >
          <TextArea rows={8} />
        </Form.Item>
        <Form.Item
          name={"tax"}
          label="VÖEN"
          rules={[{ required: true, message: "Xananı doldurun" }]}
        >
          <Input maxLength={11} />
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            size="large"
            className="text-white disabled:bg-gray-400  bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2 mt-6 w-full dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
          >
            Göndər
          </Button>
        </Form.Item>
      </Form>
    </Spin>
  );
}

export default UpdateTaxForm;
