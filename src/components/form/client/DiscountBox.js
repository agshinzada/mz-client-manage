import { Form, Select } from "antd";
import { useEffect, useState } from "react";
import {
  fetchCampaigns,
  fetchDiscounts,
} from "../../../services/discountService";
import { useClient } from "../../../context/ClientContext";

function DiscountBox() {
  const [campaigns, setCampaigns] = useState([]);
  const [discounts, setDiscounts] = useState([]);
  const { disabled, brandId } = useClient();

  const getPrivateCode = async () => {
    const data = await fetchCampaigns();
    const filterStatus = data.filter((item) => item.STATUS === 0);
    setCampaigns(filterStatus);
  };

  const getDiscounts = async () => {
    const data = await fetchDiscounts();
    const filterStatus = data.filter((item) => item.STATUS === 0);
    setDiscounts(filterStatus);
  };

  useEffect(() => {
    getPrivateCode();
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
          options={
            brandId === 11
              ? discounts.filter((item) => item.BRAND_ID === brandId)
              : discounts.filter((item) => item.BRAND_ID === 0)
          }
          filterOption={(input, option) =>
            (option?.LABEL ?? "").toLowerCase().includes(input.toLowerCase())
          }
          fieldNames={{
            label: "LABEL",
            value: "VALUE",
          }}
          size="middle"
          disabled={disabled}
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
          options={campaigns.filter((item) => item.TYPE_ === 3)}
          filterOption={(input, option) =>
            (option?.CODE ?? "").toLowerCase().includes(input.toLowerCase())
          }
          fieldNames={{
            label: "CODE",
            value: "VALUE",
          }}
          size="middle"
          disabled={disabled}
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
          options={campaigns.filter((item) => item.TYPE_ === 4)}
          filterOption={(input, option) =>
            (option?.CODE ?? "").toLowerCase().includes(input.toLowerCase())
          }
          fieldNames={{
            label: "CODE",
            value: "VALUE",
          }}
          size="middle"
          disabled={disabled}
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
          options={campaigns.filter((item) => item.TYPE_ === 5)}
          filterOption={(input, option) =>
            (option?.CODE ?? "").toLowerCase().includes(input.toLowerCase())
          }
          fieldNames={{
            label: "CODE",
            value: "VALUE",
          }}
          size="middle"
          disabled={disabled}
        />
      </Form.Item>
    </div>
  );
}

export default DiscountBox;
