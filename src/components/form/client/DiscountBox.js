import { Form, Select } from "antd";
import { useEffect, useState } from "react";
import {
  fetchCampaigns,
  fetchDiscounts,
} from "../../../services/discountService";
import { useClient } from "../../../context/ClientContext";

function DiscountBox() {
  const [privateCode3, setPrivateCode3] = useState([]);
  const [privateCode4, setPrivateCode4] = useState([]);
  const [privateCode5, setPrivateCode5] = useState([]);
  const [discounts, setDiscounts] = useState([]);
  const { disabled } = useClient();

  const getPrivateCode = async (param, state) => {
    const data = await fetchCampaigns(param);
    const filterStatus = data.filter((item) => item.STATUS === 0);
    state(filterStatus);
  };

  const getDiscounts = async () => {
    const data = await fetchDiscounts();
    const filterStatus = data.filter((item) => item.STATUS === 0);
    setDiscounts(filterStatus);
  };

  useEffect(() => {
    getPrivateCode(3, setPrivateCode3);
    getPrivateCode(4, setPrivateCode4);
    getPrivateCode(5, setPrivateCode5);
    getDiscounts();
  }, []);

  return (
    <div className="flex gap-4">
      <Form.Item
        name={"discount"}
        label="Endirim"
        className="flex flex-col w-full"
      >
        <Select
          showSearch
          placeholder="Seç"
          optionFilterProp="children"
          options={discounts}
          filterOption={(input, option) =>
            (option?.LABEL ?? "").toLowerCase().includes(input.toLowerCase())
          }
          fieldNames={{
            label: "LABEL",
            value: "VALUE",
          }}
          size="large"
          disabled={disabled}
          //   onChange={(e) =>
          //     setClient((prevState) => ({
          //       ...prevState,
          //       clientTradeGroupCode: e.value,
          //     }))
          //   }
        />
      </Form.Item>
      <Form.Item
        name={"privateCode3"}
        label="Şəbəkə adı (özəl kod 3)"
        className="flex flex-col w-full"
        rules={[{ required: true, message: "Xananı doldurun" }]}
      >
        <Select
          showSearch
          placeholder="Seç"
          optionFilterProp="children"
          options={privateCode3}
          filterOption={(input, option) =>
            (option?.CODE ?? "").toLowerCase().includes(input.toLowerCase())
          }
          fieldNames={{
            label: "CODE",
            value: "VALUE",
          }}
          size="large"
          disabled={disabled}
          //   onChange={(e) =>
          //     setClient((prevState) => ({
          //       ...prevState,
          //       clientTradeGroupCode: e.value,
          //     }))
          //   }
        />
      </Form.Item>
      <Form.Item
        name={"privateCode4"}
        label="Kateqoriya (özəl kod 4)"
        className="flex flex-col w-full"
        rules={[{ required: true, message: "Xananı doldurun" }]}
      >
        <Select
          showSearch
          placeholder="Seç"
          optionFilterProp="children"
          options={privateCode4}
          filterOption={(input, option) =>
            (option?.CODE ?? "").toLowerCase().includes(input.toLowerCase())
          }
          fieldNames={{
            label: "CODE",
            value: "VALUE",
          }}
          size="large"
          disabled={disabled}
          //   onChange={(e) =>
          //     setClient((prevState) => ({
          //       ...prevState,
          //       clientTradeGroupCode: e.value,
          //     }))
          //   }
        />
      </Form.Item>
      <Form.Item
        name={"privateCode5"}
        label="Kateqoriya (özəl kod 5)"
        className="flex flex-col w-full"
        rules={[{ required: true, message: "Xananı doldurun" }]}
      >
        <Select
          showSearch
          placeholder="Seç"
          optionFilterProp="children"
          options={privateCode5}
          filterOption={(input, option) =>
            (option?.CODE ?? "").toLowerCase().includes(input.toLowerCase())
          }
          fieldNames={{
            label: "CODE",
            value: "VALUE",
          }}
          size="large"
          disabled={disabled}
          //   onChange={(e) =>
          //     setClient((prevState) => ({
          //       ...prevState,
          //       clientTradeGroupCode: e.value,
          //     }))
          //   }
        />
      </Form.Item>
    </div>
  );
}

export default DiscountBox;
