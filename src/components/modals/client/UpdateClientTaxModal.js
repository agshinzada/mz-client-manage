import { Modal } from "antd";
import UpdateTaxForm from "../../form/client/UpdateTaxForm";

function UpdateClientTaxModal({ isOpen, setIsOpen }) {
  return (
    <Modal
      open={isOpen}
      onCancel={() => setIsOpen(false)}
      centered
      maskClosable={false}
      footer={false}
      title={"Müştəri düzəlişi"}
    >
      <UpdateTaxForm />
    </Modal>
  );
}

export default UpdateClientTaxModal;
