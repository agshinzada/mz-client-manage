import { Button, Form, Input, Select } from "antd";
import { useSticker } from "../../../context/StickerContext";
import { useGlobal } from "../../../context/GlobalContext";
import { CloseOutlined, UnorderedListOutlined } from "@ant-design/icons";
import { useState } from "react";
import GroupCodeModal from "../../modals/groupCode/GroupCodeModal";
import { fetchLastStickerCode } from "../../../services/toolService";
import { useAuth } from "../../../context/AuthContext";

function CreateStickerCodeForm() {
  const [form] = Form.useForm();
  const { regions, setLoading } = useGlobal();
  const {
    selectedGroupCode,
    setRegionName,
    setDisabled,
    setCreateStatus,
    setCreatedCode,
    setSelectedGroupCode,
  } = useSticker();
  const [isOpenGroupCode, setIsOpenGroupCode] = useState(false);
  const { user } = useAuth();

  const handleCode = async () => {
    setLoading(true);
    const code = await fetchLastStickerCode(user.TOKEN);
    setTimeout(() => {
      if (code) {
        setCreateStatus(true);
        setDisabled(false);
        setLoading(false);
        setCreatedCode(code);
      }
    }, 700);
  };

  return (
    <>
      <Form
        form={form}
        layout="vertical"
        onFinish={handleCode}
        className="flex gap-5 items-center"
      >
        <Form.Item
          name={"region"}
          className="flex flex-col w-full"
          label="Bölgələr"
          rules={[{ required: true, message: "Bölgəni daxil edin" }]}
        >
          <Select
            showSearch
            placeholder="Seç"
            optionFilterProp="children"
            options={regions}
            filterOption={(input, option) =>
              (option?.NAME ?? "").toLowerCase().includes(input.toLowerCase())
            }
            fieldNames={{
              label: "NAME",
              value: "CODE_ID",
            }}
            size="large"
            onSelect={(e) => {
              const regName = regions.find((item) => item.CODE_ID === e).NAME;
              setRegionName(regName);
              setCreateStatus(false);
              setDisabled(true);
            }}
          />
        </Form.Item>
        <Form.Item
          name={"sticker"}
          label="Qrup kodu"
          className="flex flex-col w-full"
          rules={[{ message: "Stiker daxil edin" }]}
        >
          <div className="flex relative">
            <Input size="large" placeholder={selectedGroupCode.CODE} disabled />
            <Button
              icon={<UnorderedListOutlined />}
              className="absolute right-0 h-full rounded-none bg-white disabled:bg-gray-100"
              onClick={() => {
                setIsOpenGroupCode(true);
              }}
            />
            <CloseOutlined
              className="absolute top-[13px] right-[40px] text-md cursor-pointer"
              onClick={() => setSelectedGroupCode(false)}
            />
          </div>
        </Form.Item>
        <Form.Item className="m-0">
          <Button
            type="primary"
            htmlType="submit"
            size="large"
            className="focus:outline-none self-end w-fit text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2  dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
          >
            Yarat
          </Button>
        </Form.Item>
      </Form>
      <GroupCodeModal isOpen={isOpenGroupCode} setIsOpen={setIsOpenGroupCode} />
    </>
  );
}

export default CreateStickerCodeForm;
