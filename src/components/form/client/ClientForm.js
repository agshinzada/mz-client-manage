import { Button, Form } from "antd";
import DetailBox from "./DetailBox";
import ParamBox from "./ParamBox";
import DiscountBox from "./DiscountBox";
import { useClient } from "../../../context/ClientContext";
import { useEffect } from "react";
import { useAuth } from "../../../context/AuthContext";
import { fetchNewClient } from "../../../services/clientService";
import { useGlobal } from "../../../context/GlobalContext";

function ClientForm() {
  const [form] = Form.useForm();
  const { user } = useAuth();
  const {
    selectedSticker,
    createStatus,
    disabled,
    setDisabled,
    createdCode,
    brandId,
    regionName,
    setCreateStatus,
  } = useClient();
  const { setLoading, loading } = useGlobal();

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
        taxObjectCode: selectedSticker.TAXOFFICE,
        discount: "",
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
      setLoading(false);
      setDisabled(true);
      form.resetFields();
      setCreateStatus(false);
    } else {
      setLoading(false);
      setCreateStatus(false);
    }
  };

  return (
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
      <div className="flex flex-col gap-1">
        <DetailBox />
        <ParamBox />
        <DiscountBox />
        <Form.Item className="flex justify-end">
          <Button
            type="primary"
            htmlType="submit"
            size="medium"
            disabled={disabled}
            loading={loading}
          >
            Əlavə et
          </Button>
        </Form.Item>
      </div>
    </Form>
  );
}

export default ClientForm;
