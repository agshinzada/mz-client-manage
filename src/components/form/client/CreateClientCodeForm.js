import { Button, Form, Select, Space } from "antd";
import { useEffect, useState } from "react";
import { fetchBrands } from "../../../services/brandService";
import { fetchGroupTypes } from "../../../services/groupService";
import { useClient } from "../../../context/ClientContext";
import { useGlobal } from "../../../context/GlobalContext";
import { fetchStickerBySearch } from "../../../services/stickerService";

function CreateClientCodeForm() {
  const [brands, setBrands] = useState([]);
  const [clientTypes, setClientTypes] = useState([]);
  const [form] = Form.useForm();
  const {
    selectedSticker,
    setBrandId,
    setCreatedCode,
    setRegionName,
    setCreateStatus,
    setRegionId,
    regionCodeId,
    setDisabled,
    setRegionCodeId,
    setSelectedSticker,
  } = useClient();
  const { regions, loading, setLoading } = useGlobal();

  // FORM
  const [clientTypeCode, setClientTypeCode] = useState(null);
  const [brandCode, setBrandCode] = useState(null);
  const [stickers, setStickers] = useState([]);

  const getBrands = async () => {
    const data = await fetchBrands();
    const filterBrands = data.filter((item) => item.STATUS === 0);
    setBrands(filterBrands);
  };

  const getClientTypes = async () => {
    const data = await fetchGroupTypes();
    const filterTypes = data.filter((item) => item.STATUS === 0);
    setClientTypes(filterTypes);
  };

  const handleBrand = async (e) => {
    try {
      const filterCode = brands.find((item) => item.ID === e);
      const filterNR = brands.find((item) => item.ID === e);
      setBrandCode(filterCode.TYPE + filterCode.CODE);
      setBrandId(filterNR.NR);
    } catch (error) {
      console.log(error);
    }
  };

  async function getStickers(param) {
    const res = await fetchStickerBySearch(param);
    setStickers(res);
  }

  const submitCode = async () => {
    try {
      setLoading(true);
      const code = `211${regionCodeId}.${brandCode}.${clientTypeCode}.${selectedSticker.CODE}`;
      setCreatedCode(code);
      setTimeout(() => {
        setLoading(false);
        setCreateStatus(true);
        setDisabled(false);
      }, 500);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getBrands();
    getClientTypes();
  }, []);

  return (
    <>
      <Form
        form={form}
        layout="vertical"
        onFinish={submitCode}
        className="flex flex-col items-center"
      >
        <Form.Item
          name={"region"}
          label="Bölgələr"
          className="flex flex-col w-full"
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
            size="middle"
            onSelect={(e) => {
              const regName = regions.find((item) => item.ID === e).NAME;
              const regId = regions.find((item) => item.ID === e).ROOT_ID;
              const regCodeId = regions.find((item) => item.ID === e).CODE_ID;
              setRegionName(regName);
              setRegionId(regId);
              setRegionCodeId(regCodeId);
              setCreateStatus(false);
              setDisabled(true);
            }}
          />
        </Form.Item>

        <Form.Item
          name={"brand"}
          label="Brendlər"
          className="flex flex-col w-full"
          rules={[{ required: true, message: "Brendi daxil edin" }]}
        >
          <Select
            showSearch
            placeholder="Seç"
            optionFilterProp="children"
            options={brands}
            filterOption={(input, option) =>
              (option?.NAME ?? "").toLowerCase().includes(input.toLowerCase())
            }
            fieldNames={{
              label: "NAME",
              value: "ID",
            }}
            size="middle"
            onSelect={(e) => {
              handleBrand(e);
              setCreateStatus(false);
              setDisabled(true);
            }}
          />
        </Form.Item>
        <Form.Item
          name={"type"}
          label="Müştəri tipi"
          className="flex flex-col w-full"
          rules={[{ required: true, message: "Müştəri tipini daxil edin" }]}
        >
          <Select
            showSearch
            placeholder="Seç"
            optionFilterProp="children"
            options={clientTypes}
            filterOption={(input, option) =>
              (option?.NAME ?? "").toLowerCase().includes(input.toLowerCase())
            }
            fieldNames={{
              label: "NAME",
              value: "ABBR",
            }}
            size="middle"
            onSelect={(e) => {
              setCreateStatus(false);
              setDisabled(true);
              setClientTypeCode(e);
            }}
          />
        </Form.Item>
        <Form.Item
          name={"sticker"}
          label="Stiker kodu"
          className="flex flex-col w-full"
          rules={[{ required: true, message: "Stiker daxil edin" }]}
        >
          <Select
            showSearch
            placeholder="Seç"
            optionFilterProp="children"
            filterOption={false}
            options={stickers}
            fieldNames={{
              label: "CODE",
              value: "CODE",
            }}
            onSearch={(param) => {
              if (param !== "") {
                getStickers(param);
              }
            }}
            size="middle"
            optionRender={(option) => (
              <Space>
                <span role="img" aria-label={option.label}>
                  {option.data.CODE} -
                </span>
                {option.data.DEFINITION}
              </Space>
            )}
            onSelect={(value, option) => {
              setSelectedSticker(option);
              setDisabled(true);
            }}
          />
          {/* <div className="flex relative">
            <Input size="middle" placeholder={selectedSticker.CODE} disabled />
            <Button
              icon={<UnorderedListOutlined />}
              className="absolute right-0 h-full rounded-none bg-white disabled:bg-gray-100"
              onClick={() => {
                setCreateStatus(false);
                setDisabled(true);
                setIsOpenSticker(true);
              }}
            />
          </div> */}
        </Form.Item>
        <Form.Item className="w-full">
          <Button
            type="primary"
            size="middle"
            htmlType="submit"
            className="w-full"
            loading={loading}
          >
            Yarat
          </Button>
        </Form.Item>
      </Form>
      {/* <SelectStickerModal isOpen={isOpenSticker} setIsOpen={setIsOpenSticker} /> */}
    </>
  );
}

export default CreateClientCodeForm;
