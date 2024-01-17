import { Modal } from "antd";
import { memo } from "react";

function MoreModal({
  data,
  isOpen,
  searchCode,
  selectItem,
  setIsOpen,
  title,
  tax,
}) {
  return (
    <Modal
      open={isOpen}
      onCancel={() => setIsOpen(false)}
      centered
      maskClosable={false}
      footer={false}
      title={title}
    >
      <div className="flex flex-col gap-2 mt-5">
        <div className="pb-4 bg-white dark:bg-gray-900">
          {searchCode.active && (
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
                className="block p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-full outline-none bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Axtar"
                onChange={searchCode.function}
              />
            </div>
          )}
        </div>
        <div className="w-full h-fit bg-white dark:bg-gray-700 self-start">
          {data && (
            <div className="relative overflow-y-auto max-h-[400px]">
              <table className="w-full text-center overflow-y-auto h-fit text-sm text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-900 uppercase dark:text-gray-400">
                  <tr>
                    <th scope="col" className="px-6 py-3">
                      kod
                    </th>
                    <th scope="col" className="px-6 py-3">
                      açıqlama
                    </th>
                    {tax && (
                      <th scope="col" className="px-6 py-3">
                        vöen
                      </th>
                    )}
                  </tr>
                </thead>
                <tbody>
                  {data.map((item, index) => (
                    <tr
                      className="bg-white dark:bg-gray-800 border-b border-b-slate-200 cursor-pointer select-none"
                      key={index}
                      onDoubleClick={() => selectItem(item)}
                    >
                      <th
                        scope="row"
                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                      >
                        {item.label}
                      </th>
                      <td className="px-6 py-4">{item.DEFINITION}</td>
                      <td className="px-6 py-4">{item?.TAX}</td>
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

export default memo(MoreModal);
