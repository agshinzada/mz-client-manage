import { Button, Form, Input, Spin } from "antd";
import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { fetchUpdateClientsTax } from "../services/clientService";
import TextArea from "antd/es/input/TextArea";
import Swal from "sweetalert2";

const EditTaxPage = () => {
  const [form] = Form.useForm();
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);

  const submitClient = async (e) => {
    const codes = e.codes.split("\n");
    setLoading(true);
    Swal.fire({
      title: "Düzəliş təsdiqi",
      text: "Müştərilərin vöeni dəyişəcək",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Dəyiş",
      cancelButtonText: "İmtina",
    }).then(async (result) => {
      if (result.isConfirmed) {
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
      }
    });
    setLoading(false);
  };
  return (
    <>
      <p className="font-bold mb-8">VÖEN DÜZƏLİŞİ</p>
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
              size="middle"
              loading={loading}
            >
              Düzəliş et
            </Button>
          </Form.Item>
        </Form>
      </Spin>
    </>
  );
};

export default EditTaxPage;
