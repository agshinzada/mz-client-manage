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
        >
          <Input
            type="text"
            className=" required:focus:ring-red-600 required:focus:border-red-600 block w-56 p-2.5 text-gray-900 border focus:outline-none border-gray-300 rounded-md bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            maxLength={201}
            size="large"
            disabled={disabled}
          />
        </Form.Item>
        <Form.Item
          name={"address"}
          label="Ünvan"
          rules={[{ required: true, message: "Xananı doldurun" }]}
        >
          <Input
            type="text"
            className="required:focus:ring-red-600 required:focus:border-red-600 block w-56 p-2.5 text-gray-900 border focus:outline-none border-gray-300 rounded-md bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            maxLength={201}
            size="large"
            disabled={disabled}
          />
        </Form.Item>
        <Form.Item name="contactPerson" label="Əlaqədar şəxs">
          <Input
            type="text"
            className="block w-56 p-2.5 text-gray-900 border focus:outline-none border-gray-300 rounded-md bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            maxLength={51}
            size="large"
            disabled={disabled}
          />
        </Form.Item>
      </div>
      <div className="flex gap-4 ">
        <Form.Item name="num1" label="Telefon nömrəsi 1">
          <Input
            type="text"
            className="block w-56 p-2.5 text-gray-900 border focus:outline-none border-gray-300 rounded-md bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            maxLength={51}
            size="large"
            disabled={disabled}
          />
        </Form.Item>
        <Form.Item name="num2" label="Telefon nömrəsi 2">
          <Input
            type="text"
            className="block w-56 p-2.5 text-gray-900 border focus:outline-none border-gray-300 rounded-md bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            maxLength={51}
            size="large"
            disabled={disabled}
          />
        </Form.Item>
      </div>
      <div className="flex gap-4 ">
        <Form.Item
          name="tax"
          label="VÖEN"
          rules={[{ required: true, message: "Xananı doldurun" }]}
        >
          <Input
            type="text"
            className="required:focus:ring-red-600 required:focus:border-red-600 block w-56 p-2.5 text-gray-900 border focus:outline-none border-gray-300 rounded-md bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            maxLength={11}
            size="large"
            disabled={disabled}
          />
        </Form.Item>
        <Form.Item name="taxObjectCode" label="Vergi obyekt kodu">
          <Input
            type="text"
            className="required:focus:ring-red-600 required:focus:border-red-600 block w-56 p-2.5 text-gray-900 border focus:outline-none border-gray-300 rounded-md bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            maxLength={10}
            size="large"
            disabled={disabled}
          />
        </Form.Item>
        <Form.Item
          name="dayLimit"
          label="Gün limiti"
          rules={[{ required: true, message: "Xananı doldurun" }]}
        >
          <Input
            type="number"
            className="required:focus:ring-red-600 required:focus:border-red-600 block w-56 p-2.5 text-gray-900 border focus:outline-none border-gray-300 rounded-md bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            size="large"
            disabled={disabled}
          />
        </Form.Item>
      </div>
    </div>
  );
}

export default DetailBox;
