import { Modal } from "antd";

function ConfirmModal({
  isOpen,
  setIsOpen,
  submitFuction,
  title,
  description,
}) {
  return (
    <Modal
      open={isOpen}
      title={title}
      onOk={submitFuction}
      onCancel={() => setIsOpen(false)}
      footer={(_, { OkBtn, CancelBtn }) => (
        <>
          <CancelBtn />
          <OkBtn />
        </>
      )}
    >
      <p>{description}</p>
    </Modal>
  );
}

export default ConfirmModal;
