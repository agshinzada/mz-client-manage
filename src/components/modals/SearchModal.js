import { memo, useState } from "react";
import { toast } from "react-hot-toast";
import ClientHierarchy from "../ClientHierarchy";
import { Modal } from "antd";
import { fetchClientsBySticker } from "../../services/clientService";
import { fetchStickerByFilter } from "../../services/stickerService";

function SearchModal({ isOpen, setIsOpen }) {
  const [data, setData] = useState(null);
  const [clientHierarchyIsOpen, setClientHierarchyIsOpen] = useState(false);
  const [hierarchyClients, setHierarchyClients] = useState([]);
  const [hierarchySticker, setHierarchySticker] = useState(null);

  const handleClientHierarchy = async (sticker) => {
    try {
      const data = await fetchClientsBySticker(sticker);
      setHierarchyClients(data);
      setHierarchySticker(sticker);
      setClientHierarchyIsOpen(true);
    } catch (error) {
      toast.error("Sistem xətası!");
      console.log(error);
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    const param = data.get("filterSelect");
    const input = data.get("clientInput");
    try {
      const data = await fetchStickerByFilter(param, input);
      setData(data);
    } catch (error) {
      toast.error("Sistem xətası!");
      console.log(error);
    }
  };

  const closeModal = () => {
    setIsOpen(false);
    setTimeout(() => {
      setData(null);
    }, 1000);
  };

  return (
    <>
      <Modal
        open={isOpen}
        onCancel={closeModal}
        centered
        maskClosable={false}
        footer={false}
        title={"Stiker axtarışı"}
      >
        <div className="flex flex-col gap-10 mt-5">
          <form onSubmit={handleSearch} className="flex flex-col gap-3">
            <div>
              {" "}
              <label
                htmlFor="default"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Filter
              </label>
              <select
                id="default"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                name="filterSelect"
                defaultValue={"TAX"}
              >
                <option value="TAX">Vöen</option>
                <option value="ST">Ad və ya kod</option>
              </select>
            </div>

            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <svg
                  aria-hidden="true"
                  className="w-5 h-5 text-gray-500 dark:text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  ></path>
                </svg>
              </div>
              <input
                type="search"
                id="default-search"
                className="block w-full p-3 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 outline-none focus:ring-1"
                name="clientInput"
                required
              />
              <button
                type="submit"
                className="text-white absolute right-2.5 bottom-2 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-1.5 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Axtar
              </button>
            </div>
          </form>
          <div className="w-full h-fit bg-white dark:bg-gray-700 self-start">
            {data && (
              <div className="relative overflow-y-auto max-h-[400px]">
                <table className="w-full h-fit text-sm text-left text-gray-500 dark:text-gray-400">
                  <thead className="text-xs text-gray-900 uppercase dark:text-gray-400">
                    <tr>
                      <th scope="col" className="px-6 py-3">
                        BÖLGƏ
                      </th>
                      <th scope="col" className="px-6 py-3">
                        KOD
                      </th>
                      <th scope="col" className="px-6 py-3">
                        MÜŞTƏRİ ADI
                      </th>
                      <th scope="col" className="px-6 py-3">
                        VÖEN
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.map((client, index) => (
                      <tr
                        className="bg-white dark:bg-gray-800 cursor-pointer border-b border-b-slate-200"
                        key={index}
                        onClick={() => handleClientHierarchy(client)}
                      >
                        <td className="px-6 py-4">{client.CITY}</td>

                        <th
                          scope="row"
                          className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                        >
                          {client.CODE}
                        </th>
                        <td className="px-6 py-4">{client.NAME}</td>
                        <td className="px-6 py-4">{client.TAX}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
          <div>
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

      <ClientHierarchy
        sticker={hierarchySticker}
        clients={hierarchyClients}
        isOpen={clientHierarchyIsOpen}
        setIsOpen={setClientHierarchyIsOpen}
      />
    </>
  );
}

export default memo(SearchModal);
