import { Form, Input, Select } from "antd";
import { fetchDistrictByRegion } from "../../../services/rootService";
import { useGlobal } from "../../../context/GlobalContext";
import { useEffect, useState } from "react";
import { useSticker } from "../../../context/StickerContext";

function ParamBox() {
  const { tradeGroup } = useGlobal();
  const [districts, setDistricts] = useState([]);
  const { regionName, disabled, createStatus } = useSticker();

  const loadDistricts = async () => {
    const data = await fetchDistrictByRegion(regionName);
    setDistricts(data);
  };

  useEffect(() => {
    if (createStatus) {
      loadDistricts();
    }
  }, [createStatus]);

  return (
    <div className="flex gap-4">
      <Form.Item
        name="taxObjectCode"
        label="Vergi obyekt kodu"
        className="w-full"
      >
        <Input type="text" maxLength={10} size="middle" disabled={disabled} />
      </Form.Item>
      <Form.Item
        name="dayLimit"
        label="Gün limiti"
        rules={[{ required: true, message: "Xananı doldurun" }]}
        className="w-full"
      >
        <Input type="number" size="middle" disabled={disabled} />
      </Form.Item>
      <Form.Item
        name={"tradeCode"}
        label="Kanal kodu"
        className="flex flex-col w-full"
        rules={[{ required: true, message: "Xananı doldurun" }]}
      >
        <Select
          showSearch
          placeholder="Seç"
          optionFilterProp="children"
          options={tradeGroup}
          filterOption={(input, option) =>
            (option?.GCODE ?? "").toLowerCase().includes(input.toLowerCase())
          }
          size="middle"
          fieldNames={{
            label: "GCODE",
            value: "GCODE",
          }}
          disabled={disabled}
        />
      </Form.Item>
      <Form.Item
        name={"district"}
        label="Rayon"
        className="flex flex-col w-full"
        rules={[{ required: true, message: "Xananı doldurun" }]}
      >
        <Select
          showSearch
          placeholder="Seç"
          optionFilterProp="children"
          options={districts}
          filterOption={(input, option) =>
            (option?.NAME ?? "").toLowerCase().includes(input.toLowerCase())
          }
          fieldNames={{
            label: "NAME",
            value: "NAME",
          }}
          size="middle"
          disabled={disabled}
        />
      </Form.Item>
    </div>
  );
}

export default ParamBox;
