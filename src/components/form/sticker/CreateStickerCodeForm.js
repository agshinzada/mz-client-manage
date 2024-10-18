import { Button, Form, Select, Space } from "antd";
import { useSticker } from "../../../context/StickerContext";
import { useGlobal } from "../../../context/GlobalContext";
import { useEffect, useState } from "react";
import { fetchLastStickerCode } from "../../../services/toolService";
import { useAuth } from "../../../context/AuthContext";
import { fetchGroupCodes } from "../../../services/groupService";

function CreateStickerCodeForm() {
  const [form] = Form.useForm();
  const { regions, setLoading, loading } = useGlobal();
  const {
    setRegionName,
    setDisabled,
    setCreateStatus,
    setCreatedCode,
    setSelectedGroupCode,
  } = useSticker();
  const [groupCodes, setGroupCodes] = useState([]);
  const { user } = useAuth();

  const handleCode = async () => {
    setLoading(true);
    const { code } = await fetchLastStickerCode(user.TOKEN);
    if (code) {
      setCreateStatus(true);
      setDisabled(false);
      setLoading(false);
      setCreatedCode(code);
    }
  };

  async function getGroupCodes() {
    const res = await fetchGroupCodes();
    setGroupCodes(res);
  }

  useEffect(() => {
    getGroupCodes();
  }, []);

  return (
    <>
      <Form
        form={form}
        layout="vertical"
        onFinish={handleCode}
        className="flex flex-col items-center"
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
              value: "ID",
            }}
            size="medium"
            onSelect={(e) => {
              const regName = regions.find((item) => item.ID === e).NAME;
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
          <Select
            showSearch
            placeholder="Seç"
            optionFilterProp="children"
            filterOption={false}
            options={groupCodes}
            fieldNames={{
              label: "CODE",
              value: "CODE",
            }}
            allowClear={true}
            size="middle"
            optionRender={(option) => (
              <Space>
                <span role="img" aria-label={option.label}>
                  {option.data.CODE} -
                </span>
                {option.data.DEFINITION_}
              </Space>
            )}
            onChange={(value, option) => {
              setSelectedGroupCode(option);
              setDisabled(true);
            }}
          />
          {/* <div className="flex relative">
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
          </div> */}
        </Form.Item>
        <Form.Item className="w-full">
          <Button
            type="primary"
            htmlType="submit"
            size="medium"
            className="w-full"
            loading={loading}
          >
            Yarat
          </Button>
        </Form.Item>
      </Form>
      {/* <GroupCodeModal isOpen={isOpenGroupCode} setIsOpen={setIsOpenGroupCode} /> */}
    </>
  );
}

export default CreateStickerCodeForm;
