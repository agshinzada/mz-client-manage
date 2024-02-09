import { Button, Modal } from "antd";
import {
  JsonView,
  allExpanded,
  collapseAllNested,
  defaultStyles,
} from "react-json-view-lite";
import "react-json-view-lite/dist/index.css";

function ErrorModal({ isOpen, setIsOpen, data }) {
  const handleCancel = () => {
    setIsOpen(false);
  };
  return (
    <Modal
      title="Sistem xətası"
      open={isOpen}
      onCancel={handleCancel}
      footer={[
        <Button type="primary" onClick={handleCancel} className="w-full mt-6">
          OK
        </Button>,
      ]}
    >
      <div className="flex flex-col gap-8">
        <div className="flex gap-8">
          <div className="">
            <p>Error</p>
            <JsonView
              data={data && data.error.originalError.info}
              shouldExpandNode={allExpanded}
              style={defaultStyles}
            />
          </div>
          <div className="">
            <p>Query</p>
            <JsonView
              data={data && data.query}
              shouldExpandNode={collapseAllNested}
              style={defaultStyles}
            />
          </div>
        </div>

        <div>
          <p>Data</p>
          <JsonView
            data={data && data.obj.data}
            shouldExpandNode={collapseAllNested}
            style={defaultStyles}
          />
        </div>
      </div>
    </Modal>
  );
}

export default ErrorModal;
