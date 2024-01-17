import { Modal } from "antd";
import { memo, useState } from "react";
import EditModal from "./modals/EditModal";
import UpdateClientModal from "./modals/UpdateClientModal";

function ClientHierarchy({ sticker, clients, isOpen, setIsOpen }) {
  const [editModalIsOpen, setEditModalIsOpen] = useState(false);
  const [updateModalIsOpen, setUpdateModalIsOpen] = useState(false);

  const [editClient, setEditClient] = useState([]);

  var classNames = require("classnames");

  function closeModal() {
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
        title={"Müştərilər"}
      >
        <div className="flex flex-col gap-4 py-4">
          {sticker && (
            <div className="flex flex-col gap-3">
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-3 w-full">
                  <h4>
                    <strong>{sticker.CODE}</strong>
                  </h4>
                </div>
                <div className="flex gap-2">
                  <div className="flex flex-col gap-1">
                    <label className="dark:text-white text-xs">
                      Müştəri adı
                    </label>
                    <p className="px-6 py-2 border border-gray-200 rounded-sm ">
                      {sticker.NAME}
                    </p>
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="dark:text-white text-xs">Vöen</label>
                    <p className="px-6 py-2 border border-gray-200 rounded-sm ">
                      {sticker.TAX}
                    </p>
                  </div>
                  <button
                    type="button"
                    className="flex items-center focus:outline-none text-white bg-blue-700 hover:bg-blue-800 focus:ring-1 focus:ring-ble-300 font-medium rounded-lg h-fit self-end text-sm px-4 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-900"
                    onClick={() => {
                      setEditClient(sticker);
                      setEditModalIsOpen(true);
                    }}
                  >
                    Düzəliş
                  </button>
                </div>
                <hr />
              </div>
            </div>
          )}

          <div className="w-full h-fit bg-white dark:bg-gray-700 self-start">
            <div className="relative overflow-y-auto max-h-[400px]">
              <table className="w-full h-fit text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-900 uppercase dark:text-gray-400">
                  <tr className="hidden">
                    <th scope="col" className="px-6 py-3"></th>
                    <th scope="col" className="px-6 py-3"></th>
                    <th scope="col" className="px-6 py-3"></th>
                    <th scope="col" className="px-6 py-3"></th>
                    <th scope="col" className="px-6 py-3"></th>
                  </tr>
                </thead>
                <tbody>
                  {clients &&
                    clients.map((client, index) => (
                      <tr
                        className={classNames({
                          "bg-white": true,
                          "dark:bg-gray-800": true,
                          "border-b": true,
                          "border-b-slate-200": true,
                          "opacity-60": client.ACTIVE === 1,
                        })}
                        key={index}
                      >
                        <td className="px-6 py-4">{client.RUT}</td>
                        <th
                          scope="row"
                          className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                        >
                          {client.CODE}
                        </th>
                        <td className="px-6 py-4 ">{client.TAX}</td>
                        <td className="px-6 py-4 ">{client.NAME}</td>
                        <td className="px-6 py-4">
                          {client.ACTIVE === 0 && (
                            <button
                              type="button"
                              className="flex items-center focus:outline-none text-white bg-blue-700 hover:bg-blue-800 focus:ring-1 focus:ring-ble-300 font-medium rounded-lg h-fit self-end text-sm px-4 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-900"
                              onClick={() => {
                                setEditClient(client);
                                setEditModalIsOpen(true);
                              }}
                            >
                              Düzəliş
                            </button>
                          )}
                          {client.ACTIVE === 1 && client.STATUS === 1 && (
                            <button
                              type="button"
                              className="flex items-center focus:outline-none text-white bg-slate-700 hover:bg-slate-800 focus:ring-1 focus:ring-ble-300 font-medium rounded-lg h-fit self-end text-sm px-4 py-2.5 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                              onClick={() => {
                                setEditClient(client);
                                setUpdateModalIsOpen(true);
                              }}
                            >
                              Aktiv et
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
          <div className="flex flex-col gap-5">
            <button
              type="button"
              className="w-full inline-flex justify-center rounded-md border border-transparent bg-blue-100 dark:bg-gray-500 dark:text-slate-300 dark:hover:bg-gray-700 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
              onClick={closeModal}
            >
              OK
            </button>
          </div>
        </div>
      </Modal>

      <div>
        <EditModal
          isOpen={editModalIsOpen}
          setIsOpen={setEditModalIsOpen}
          client={editClient}
        />
        <UpdateClientModal
          isOpen={updateModalIsOpen}
          setIsOpen={setUpdateModalIsOpen}
          client={editClient}
        />
      </div>
    </div>
  );
}

export default memo(ClientHierarchy);
