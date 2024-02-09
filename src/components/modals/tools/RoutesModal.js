import { Modal } from "antd";
import { useState } from "react";
import { fetchRoutesBySearch } from "../../../services/rootService";
import { toast } from "react-hot-toast";

function RoutesModal({ isOpen, setIsOpen }) {
  const [value, setValue] = useState(null);
  const [routes, setRoutes] = useState(null);

  const handleRoute = async (e) => {
    e.preventDefault();
    try {
      const data = await fetchRoutesBySearch(value);
      setRoutes(data);
    } catch (error) {
      toast.error("Sistem xətası!");
      console.log(error);
    }
  };

  return (
    <Modal
      open={isOpen}
      onCancel={() => setIsOpen(false)}
      centered
      maskClosable={false}
      footer={false}
      title={"Təmsilçi axtarışı"}
    >
      <div className="flex flex-col gap-10">
        <form onSubmit={handleRoute} className="flex flex-col gap-3 mt-5">
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
              className="block w-full p-3 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 outline-none focus:ring-1"
              name="routeInput"
              placeholder="Rut nömrəsi"
              onChange={(e) => setValue(e.target.value)}
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
          {routes && (
            <div className="relative overflow-y-auto max-h-[400px]">
              <table className="w-full h-fit text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-900 uppercase dark:text-gray-400">
                  <tr>
                    <th scope="col" className="px-6 py-3">
                      KOD
                    </th>
                    <th scope="col" className="px-6 py-3">
                      AD
                    </th>
                    <th scope="col" className="px-6 py-3">
                      REGION
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {routes.map((item, index) => (
                    <tr
                      className="bg-white dark:bg-gray-800 cursor-pointer border-b border-b-slate-200"
                      key={index}
                    >
                      <td className="px-6 py-4">{item.CODE}</td>

                      <th
                        scope="row"
                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                      >
                        {item.DEFINITION}
                      </th>
                      <td className="px-6 py-4">{item.REGION}</td>
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
            onClick={() => setIsOpen(false)}
          >
            OK
          </button>
        </div>
      </div>
    </Modal>
  );
}

export default RoutesModal;
