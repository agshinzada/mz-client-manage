import { UnorderedListOutlined } from "@ant-design/icons";
import { Button, Form, Input, Select } from "antd";
import { useEffect, useState } from "react";
import { fetchBrands } from "../../../services/brandService";
import { fetchGroupTypes } from "../../../services/groupService";
import { useClient } from "../../../context/ClientContext";
import { useGlobal } from "../../../context/GlobalContext";
import SelectStickerModal from "../../modals/sticker/SelectStickerModal";

function CreateClientCodeForm() {
  const [brands, setBrands] = useState([]);
  const [clientTypes, setClientTypes] = useState([]);
  const [form] = Form.useForm();
  const {
    selectedSticker,
    setBrandId,
    setCreatedCode,
    setLoading,
    setRegionName,
    setCreateStatus,
    setRegionId,
    regionId,
    setDisabled,
  } = useClient();
  const { regions } = useGlobal();

  // FORM
  const [clientTypeCode, setClientTypeCode] = useState(null);
  const [brandCode, setBrandCode] = useState(null);

  // MODAL
  const [isOpenSticker, setIsOpenSticker] = useState(false);

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

  const submitCode = async () => {
    try {
      setLoading(true);
      const code = `211${regionId}.${brandCode}.${clientTypeCode}.${selectedSticker.CODE}`;
      setTimeout(() => {
        setCreatedCode(code);
        setLoading(false);
        setCreateStatus(true);
        setDisabled(false);
      }, 700);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getBrands();
    getClientTypes();
  }, []);

  useEffect(() => {
    form.setFieldValue("sticker", selectedSticker.CODE);
  }, [selectedSticker]);

  return (
    <>
      <Form
        form={form}
        layout="vertical"
        onFinish={submitCode}
        className="flex gap-5  items-center"
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
              value: "ROOT_ID",
            }}
            size="large"
            onSelect={(e) => {
              const regName = regions.find((item) => item.ROOT_ID === e).NAME;
              const regId = regions.find((item) => item.ROOT_ID === e).CODE_ID;
              setRegionName(regName);
              setRegionId(regId);
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
            size="large"
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
            size="large"
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
          <div className="flex relative">
            <Input size="large" placeholder={selectedSticker.CODE} disabled />
            <Button
              icon={<UnorderedListOutlined />}
              className="absolute right-0 h-full rounded-none bg-white disabled:bg-gray-100"
              onClick={() => {
                setCreateStatus(false);
                setDisabled(true);
                setIsOpenSticker(true);
              }}
            />
          </div>
        </Form.Item>
        <Form.Item className="m-0">
          <Button type="primary" size="large" htmlType="submit">
            Yarat
          </Button>
        </Form.Item>
      </Form>
      <SelectStickerModal isOpen={isOpenSticker} setIsOpen={setIsOpenSticker} />
    </>
  );
}

export default CreateClientCodeForm;
