import { Button, Form, Spin } from "antd";
import DetailBox from "./DetailBox";
import ParamBox from "./ParamBox";
import DiscountBox from "./DiscountBox";
import { useClient } from "../../../context/ClientContext";
import { useEffect } from "react";
import { useAuth } from "../../../context/AuthContext";
import { fetchNewClient } from "../../../services/clientService";

function ClientForm() {
  const [form] = Form.useForm();
  const { user } = useAuth();
  const {
    selectedSticker,
    createStatus,
    disabled,
    setDisabled,
    setLoading,
    createdCode,
    brandId,
    regionName,
    loading,
    setCreateStatus,
  } = useClient();

  useEffect(() => {
    if (createStatus) {
      form.setFieldsValue({
        name: selectedSticker.DEFINITION,
        address: selectedSticker.ADRES,
        num1: selectedSticker.NUM1,
        num2: selectedSticker.NUM2,
        tax: selectedSticker.TAX,
        contactPerson: selectedSticker.CONTACT,
        dayLimit: selectedSticker.DAYLIMIT,
        tradeCode: selectedSticker.TRADINGGRP,
        district: selectedSticker.DISTRICT,
      });
    }
  }, [createStatus]);

  const submitClient = async (e) => {
    const data = form.getFieldsValue();
    data.code = createdCode;
    data.brandId = brandId;
    data.regionName = regionName;
    data.visitSum = data.visitDay.reduce((a, b) => a + b, 0);
    setLoading(true);
    const res = await fetchNewClient({
      client: data,
      sticker: selectedSticker,
      userRef: user.REF,
      token: user.TOKEN,
    });
    if (res) {
      setTimeout(() => {
        setLoading(false);
        setDisabled(true);
        form.resetFields();
        setCreateStatus(false);
      }, 700);
    } else {
      setLoading(false);
      setCreateStatus(false);
    }
  };

  return (
    <Spin spinning={loading}>
      <Form
        form={form}
        layout="vertical"
        onFinish={submitClient}
        className="flex flex-col"
        initialValues={{
          num1: "",
          num2: "",
          taxObjectCode: "",
          contactPerson: "",
          discount: "",
        }}
      >
        <div className="flex flex-col gap-2">
          <DetailBox />
          <ParamBox />
          <DiscountBox />
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              size="large"
              className="text-white disabled:bg-gray-400  bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2 mt-6 w-full dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
              disabled={disabled}
            >
              Göndər
            </Button>
          </Form.Item>
        </div>
      </Form>
    </Spin>
  );
}

export default ClientForm;
