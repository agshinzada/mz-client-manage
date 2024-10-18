import { Form, Input } from "antd";
import { useSticker } from "../../../context/StickerContext";

function DetailBox() {
  const { disabled } = useSticker();

  return (
    <div className="flex flex-col">
      <div className="flex gap-4">
        <Form.Item
          name={"name"}
          label="Müştəri adı"
          rules={[{ required: true, message: "Xananı doldurun" }]}
          className="w-full"
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
          rules={[{ required: true, message: "Xananı doldurun" }]}
          className="w-full"
        >
          <Input
            type="text"
            maxLength={201}
            size="middle"
            disabled={disabled}
          />
        </Form.Item>
        <Form.Item
          name="contactPerson"
          label="Əlaqədar şəxs"
          className="w-full"
        >
          <Input type="text" maxLength={51} size="middle" disabled={disabled} />
        </Form.Item>
      </div>

      <div className="flex gap-4 ">
        <Form.Item name="num1" label="Telefon nömrəsi 1" className="w-full">
          <Input type="text" maxLength={51} size="middle" disabled={disabled} />
        </Form.Item>
        <Form.Item name="num2" label="Telefon nömrəsi 2" className="w-full">
          <Input type="text" maxLength={51} size="middle" disabled={disabled} />
        </Form.Item>
        <Form.Item
          name="tax"
          label="VÖEN"
          rules={[{ required: true, message: "Xananı doldurun" }]}
          className="w-full"
        >
          <Input type="text" maxLength={11} size="middle" disabled={disabled} />
        </Form.Item>
      </div>
    </div>
  );
}

export default DetailBox;
