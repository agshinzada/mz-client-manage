import { Button, Form } from "antd";
import { useGlobal } from "../../../context/GlobalContext";
import DetailBox from "./DetailBox";
import ParamBox from "./ParamBox";
import { useSticker } from "../../../context/StickerContext";
import { fetchNewSticker } from "../../../services/stickerService";
import { useAuth } from "../../../context/AuthContext";

function StickerForm() {
  const { user } = useAuth();
  const { setLoading, loading } = useGlobal();
  const { disabled, createdCode, regionName, setDisabled, selectedGroupCode } =
    useSticker();
  const [form] = Form.useForm();

  const submitSticker = async () => {
    setLoading(true);
    const data = form.getFieldsValue();
    data.code = createdCode;
    data.regionName = regionName;
    if (selectedGroupCode) {
      data.PARENTCLREF = selectedGroupCode.LOGICALREF;
      data.LOWLEVELCODES2 = 0;
      data.LOWLEVELCODES1 = selectedGroupCode.LOWLEVELCODES1;
      data.LOWLEVELCODES3 = 0;
    } else {
      data.PARENTCLREF = 0;
      data.LOWLEVELCODES1 = 0;
      data.LOWLEVELCODES2 = 0;
      data.LOWLEVELCODES3 = 0;
    }
    const res = await fetchNewSticker({
      sticker: data,
      userRef: user.REF,
      token: user.TOKEN,
    });
    if (res) {
      setLoading(false);
      setDisabled(true);
      form.resetFields();
    } else {
      setLoading(false);
    }
  };

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={submitSticker}
      className="flex flex-col"
      initialValues={{
        num1: "",
        num2: "",
        taxObjectCode: "",
        contactPerson: "",
      }}
    >
      <DetailBox />
      <ParamBox />
      <Form.Item className="flex justify-end">
        <Button
          type="primary"
          htmlType="submit"
          size="middle"
          disabled={disabled}
          loading={loading}
        >
          Əlavə et
        </Button>
      </Form.Item>
    </Form>
  );
}

export default StickerForm;
