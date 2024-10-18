import { Checkbox, Form, Input, Select } from "antd";
import { useEffect, useState } from "react";
import {
  fetchDistrictByRegion,
  fetchRoutesByFilter,
} from "../../../services/rootService";
import { useClient } from "../../../context/ClientContext";
import { fetchDeliveryByFilter } from "../../../services/deliveryService";
import { fetchVisitDays } from "../../../services/visitService";
import { useGlobal } from "../../../context/GlobalContext";

function ParamBox() {
  const [delivery, setDelivery] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [routes, setRoutes] = useState([]);
  const [visitDays, setVisitDays] = useState([]);
  const { regionId, regionName, brandId, createStatus, disabled } = useClient();
  const { tradeGroup } = useGlobal();

  const loadDelivery = async () => {
    const data = await fetchDeliveryByFilter(regionId);
    const filterStatus = data.filter((item) => item.STATUS === 0);
    setDelivery(filterStatus);
  };

  const loadDistricts = async () => {
    const data = await fetchDistrictByRegion(regionName);
    setDistricts(data);
  };

  const loadRoutes = async () => {
    const data = await fetchRoutesByFilter(regionId, brandId);
    setRoutes(data);
  };

  const getVisitDays = async () => {
    const data = await fetchVisitDays();
    const filterStatus = data.filter((item) => item.STATUS === 0);
    setVisitDays(filterStatus);
  };

  useEffect(() => {
    getVisitDays();
  }, []);

  useEffect(() => {
    if (createStatus) {
      loadDistricts();
      loadRoutes();
      loadDelivery();
    }
  }, [createStatus]);

  return (
    <div className="flex flex-col">
      <div className="flex gap-4">
        <Form.Item
          name="contractDayLimit"
          label="Müqavilə üzrə gün limiti"
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
            size="middle"
            filterOption={(input, option) =>
              (option?.GCODE ?? "").toLowerCase().includes(input.toLowerCase())
            }
            fieldNames={{
              label: "GCODE",
              value: "GCODE",
            }}
            disabled={disabled}
          />
        </Form.Item>
        <Form.Item
          name={"deliveryCode"}
          label="Təslimatçı kodu"
          className="flex flex-col w-full"
          rules={[{ required: true, message: "Xananı doldurun" }]}
        >
          <Select
            showSearch
            placeholder="Seç"
            optionFilterProp="children"
            options={delivery}
            filterOption={(input, option) =>
              (option?.CODE ?? "").toLowerCase().includes(input.toLowerCase())
            }
            fieldNames={{
              label: "CODE",
              value: "CODE",
            }}
            size="middle"
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

      <div className="flex gap-4 ">
        <Form.Item
          name={"route"}
          label="Rut"
          className="flex flex-col w-1/4"
          rules={[{ required: true, message: "Xananı doldurun" }]}
        >
          <Select
            showSearch
            placeholder="Seç"
            optionFilterProp="children"
            options={routes}
            filterOption={(input, option) =>
              (option?.DEFINITION_ ?? "")
                .toLowerCase()
                .includes(input.toLowerCase())
            }
            fieldNames={{
              label: "DEFINITION_",
              value: "CODE",
            }}
            size="middle"
            disabled={disabled}
          />
        </Form.Item>
        <Form.Item
          name={"visitDay"}
          label="Vizit günü"
          rules={[{ required: true, message: "Xananı doldurun" }]}
        >
          <Checkbox.Group options={visitDays} disabled={disabled} />
        </Form.Item>
      </div>
    </div>
  );
}

export default ParamBox;
