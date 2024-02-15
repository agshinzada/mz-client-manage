import { Button, Form } from "antd";
import { useGlobal } from "../../../context/GlobalContext";
import DetailBox from "./DetailBox";
import ParamBox from "./ParamBox";
import { useSticker } from "../../../context/StickerContext";
import { fetchNewSticker } from "../../../services/stickerService";
import { useAuth } from "../../../context/AuthContext";

function StickerForm() {
  const { user } = useAuth();
  const { setLoading } = useGlobal();
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
    console.log({
      sticker: data,
      userRef: user.REF,
      token: user.TOKEN,
    });

    const res = await fetchNewSticker({
      sticker: data,
      userRef: user.REF,
      token: user.TOKEN,
    });
    if (res) {
      setTimeout(() => {
        setLoading(false);
        setDisabled(true);
        form.resetFields();
      }, 700);
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
    </Form>
  );
}

export default StickerForm;
