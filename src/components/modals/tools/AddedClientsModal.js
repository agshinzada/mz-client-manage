import { Modal } from "antd";
import { memo, useState } from "react";
import { toast } from "react-hot-toast";
import { useAuth } from "../../../context/AuthContext";

function AddedClientsModal({ isOpen, setIsOpen, type, title, rut }) {
  const { user } = useAuth();

  const [data, setData] = useState([]);

  const getDataByDate = async (
    date = new Date().toLocaleDateString("en"),
    type
  ) => {
    try {
      const res = await fetch(
        `${process.env.REACT_APP_API}/${type}/inserted/filter?u=${user.REF}&d=${date}`
      );
      if (res.status === 200 && res.statusText === "OK") {
        const data = await res.json();
        setData(data);
      } else {
        toast.error("Server error!");
      }
    } catch (error) {}
  };

  const getDataByMonth = async (type) => {
    try {
      const res = await fetch(
        `${process.env.REACT_APP_API}/${type}/inserted/monthly/${user.REF}`
      );
      if (res.status === 200 && res.statusText === "OK") {
        const data = await res.json();
        setData(data);
      } else {
        toast.error("Server error!");
      }
    } catch (error) {}
  };

  const searchData = async (e, type) => {
    try {
      const res = await fetch(
        `${process.env.REACT_APP_API}/${type}/inserted/search?u=${user.REF}&&q=${e.target.value}`
      );
      if (res.status === 200 && res.statusText === "OK") {
        const data = await res.json();
        setData(data);
      } else {
        toast.error("Server error!");
      }
    } catch (error) {}
  };

  return (
    <Modal
      open={isOpen}
      onCancel={() => setIsOpen(false)}
      centered
      maskClosable={false}
      footer={false}
      title={title}
    >
      <div className="flex flex-col gap-10 mt-5">
        <div>
          <div className="pb-4 bg-white dark:bg-gray-900">
            <div className="relative mt-1">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <svg
                  className="w-5 h-5 text-gray-500 dark:text-gray-400"
                  aria-hidden="true"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </div>
              <input
                type="text"
                className="block p-3 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-full outline-none bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Axtar"
                onChange={(e) => searchData(e, type)}
              />
            </div>
          </div>
          <div className="flex gap-2">
            <button
              type="button"
              className="flex gap-2 items-center focus:outline-none self-end w-fit text-white bg-blue-700 hover:bg-blue-800 focus:ring-1 focus:ring-blue-300 font-medium rounded-lg text-sm px-3.5 py-1.5  dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              onClick={() =>
                getDataByDate(new Date().toLocaleDateString("en"), type)
              }
            >
              Bu gün
            </button>
            <button
              type="button"
              className="flex gap-2 items-center focus:outline-none self-end w-fit text-white bg-blue-700 hover:bg-blue-800 focus:ring-1 focus:ring-blue-300 font-medium rounded-lg text-sm px-3.5 py-1.5  dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              onClick={() => {
                const date = new Date();
                date.setDate(date.getDate() - 1);
                getDataByDate(date.toLocaleDateString("en"), type);
              }}
            >
              Dünən
            </button>
            <button
              type="button"
              className="flex gap-2 items-center focus:outline-none self-end w-fit text-white bg-blue-700 hover:bg-blue-800 focus:ring-1 focus:ring-blue-300 font-medium rounded-lg text-sm px-3.5 py-1.5  dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              onClick={() => getDataByMonth(type)}
            >
              Bu ay
            </button>
          </div>
        </div>

        <div className="w-full h-full bg-white dark:bg-gray-700 self-start">
          <div className="relative overflow-x-auto max-h-[400px]">
            <table className="w-full text-sm text-center overflow-y-auto text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-900 uppercase dark:text-gray-400">
                <tr>
                  {rut && (
                    <th scope="col" className="px-6 py-3">
                      RUT
                    </th>
                  )}

                  <th scope="col" className="px-6 py-3">
                    STIKER
                  </th>
                  <th scope="col" className="px-6 py-3">
                    KOD
                  </th>
                  <th scope="col" className="px-6 py-3">
                    MÜŞTƏRİ ADI
                  </th>
                  <th scope="col" className="px-6 py-3">
                    TARIX
                  </th>
                </tr>
              </thead>
              <tbody>
                {data.map((client, index) => (
                  <tr
                    className="bg-white dark:bg-gray-800 border-b border-b-slate-200"
                    key={index}
                  >
                    {rut && <td className="px-6 py-4">{client?.SPECODE}</td>}

                    <td className="px-6 py-4">{client.STICKER}</td>

                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {client.CODE}
                    </th>
                    <td className="px-6 py-4">{client.NAME}</td>
                    <td className="px-6 py-4">
                      {new Date(client.DATE).toLocaleDateString("az")}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="w-full">
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

export default memo(AddedClientsModal);
