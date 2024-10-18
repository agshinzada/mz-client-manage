import { Form, Input } from "antd";
import { useClient } from "../../../context/ClientContext";

function DetailBox() {
  const { disabled } = useClient();

  return (
    <div className="flex flex-col">
      <div className="flex gap-4">
        <Form.Item
          name={"name"}
          label="Müştəri adı"
          className="w-full"
          rules={[{ required: true, message: "Xananı doldurun" }]}
        >
          <Input
            type="text"
            maxLength={201}
            size="middle"
            disabled={disabled}
          />
        </Form.Item>
        <Form.Item
          name={"address"}
          label="Ünvan"
          className="w-full"
          rules={[{ required: true, message: "Xananı doldurun" }]}
        >
          <Input
            type="text"
            maxLength={201}
            size="middle"
            disabled={disabled}
          />
        </Form.Item>
        <Form.Item name="num1" label="Telefon nömrəsi 1" className="w-full">
          <Input type="text" maxLength={51} size="middle" disabled={disabled} />
        </Form.Item>
        <Form.Item name="num2" label="Telefon nömrəsi 2" className="w-full">
          <Input type="text" maxLength={51} size="middle" disabled={disabled} />
        </Form.Item>
      </div>
      <div className="flex gap-4">
        <Form.Item
          name="tax"
          label="VÖEN"
          rules={[{ required: true, message: "Xananı doldurun" }]}
          className="w-full"
        >
          <Input type="text" maxLength={11} size="middle" disabled={disabled} />
        </Form.Item>
        <Form.Item
          name="taxObjectCode"
          label="Vergi obyekt kodu"
          className="w-full"
        >
          <Input type="text" maxLength={10} size="middle" disabled={disabled} />
        </Form.Item>
        <Form.Item
          name="contactPerson"
          label="Əlaqədar şəxs"
          className="w-full"
        >
          <Input type="text" maxLength={51} size="middle" disabled={disabled} />
        </Form.Item>
        <Form.Item
          name="dayLimit"
          label="Gün limiti"
          rules={[{ required: true, message: "Xananı doldurun" }]}
          className="w-full"
        >
          <Input type="number" size="middle" disabled={disabled} />
        </Form.Item>
      </div>
    </div>
  );
}

export default DetailBox;
