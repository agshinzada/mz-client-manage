import { Modal } from "antd";
import { memo, useEffect, useRef, useState } from "react";
import { toast } from "react-hot-toast";
import Swal from "sweetalert2";
import { useAuth } from "../../context/AuthContext";

function EditModal({ isOpen, setIsOpen, client }) {
  const [clientCode, setClientCode] = useState(null);
  const [clientName, setClientName] = useState(null);
  const [clientTax, setClientTax] = useState(null);

  const clientNameRef = useRef();
  const clientTaxRef = useRef();
  const { user } = useAuth();

  const handleUpdate = (e) => {
    e.preventDefault();
    try {
      if (clientName && clientTax) {
        Swal.fire({
          title: "Yeniləmə",
          text: "Müştəri məlumatları dəyişəcək!",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "OK",
          cancelButtonText: "Imtina",
        }).then(async (result) => {
          if (result.isConfirmed) {
            const res = await fetch(`${process.env.REACT_APP_API}/clients`, {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                code: clientCode,
                name: clientName,
                tax: clientTax,
                userRef: user.REF,
                token: user.TOKEN,
              }),
            });
            if (res.status === 200 && res.statusText === "OK") {
              closeModal();
              toast.success("Məlumatlar uğurla yeniləndi!");
            } else if (res.status === 500) {
              toast.error(`Xəta: ${res.statusText}`);
              console.log(await res.json());
            }
          }
        });
      } else {
        toast.error("Xanaları doldurun!");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setClientCode(client?.CODE);
    setClientName(client?.NAME);
    setClientTax(client?.TAX);
  }, [client]);

  function closeModal() {
    clientNameRef.current.value = "";
    clientTaxRef.current.value = "";
    setIsOpen(false);
  }

  return (
    <div>
      <Modal
        open={isOpen}
        onCancel={closeModal}
        centered
        maskClosable={false}
        footer={false}
        title={"Düzəliş"}
      >
        <form onSubmit={handleUpdate} className="flex flex-col gap-4">
          <div>
            <strong className="text-lg">{client.CODE}</strong>
            <hr />
            <br />
            <div className="flex flex-col mb-3">
              <label className="dark:text-white">
                Müştəri adı - <strong>{client.NAME}</strong>
              </label>
              <input
                type="text"
                className="w-full p-2.5 text-gray-900 border focus:outline-none border-gray-300 rounded-md bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                ref={clientNameRef}
                name={"client-name"}
                onChange={(e) => setClientName(e.target.value.trim())}
                maxLength={201}
              />
            </div>
            <div className="flex flex-col">
              <label className="dark:text-white">
                Vöen - <strong>{client.TAX}</strong>
              </label>
              <input
                type="text"
                className="w-full p-2.5 text-gray-900 border focus:outline-none border-gray-300 rounded-md bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                name={"client-tax"}
                ref={clientTaxRef}
                onChange={(e) => setClientTax(e.target.value.trim())}
                maxLength={16}
              />
            </div>
          </div>
          <div>
            <button
              type="submit"
              className="w-full inline-flex justify-center rounded-md border border-transparent bg-blue-100 dark:bg-gray-500 dark:text-slate-300 dark:hover:bg-gray-700 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
            >
              OK
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}

export default memo(EditModal);
