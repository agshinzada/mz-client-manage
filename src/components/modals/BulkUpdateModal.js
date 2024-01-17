import { Modal } from "antd";
import { useState } from "react";
import { toast } from "react-hot-toast";
import Swal from "sweetalert2";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { encryptStorage } from "../../utils/storage";

function BulkUpdateModal({ isOpen, setIsOpen, codes }) {
  const [inputData, setInputData] = useState({
    DEFINITION_: null,
    TAXNR: null,
  });
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
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
          for (const [key, value] of Object.entries(inputData)) {
            if (value !== null) {
              putData(key, value);
            }
          }
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  const putData = async (param, data) => {
    try {
      const res = await fetch(`${process.env.REACT_APP_API}/clients/bulk`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          param,
          data,
          codes,
          userRef: user.REF,
          token: user.TOKEN,
        }),
      });
      if (res.status === 200 && res.statusText === "OK") {
        toast.success("Məlumatlar uğurla yeniləndi!");
      } else if (res.status === 500) {
        toast.error(`Xəta: ${res.statusText}`);
        console.log(await res.json());
      } else if (res.status === 401) {
        toast.dismiss();
        toast.error("Token expired!");
        setTimeout(() => {
          encryptStorage.clear();
          navigate("/auth/login");
        }, 1000);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Modal
        open={isOpen}
        onCancel={() => setIsOpen(false)}
        centered
        maskClosable={false}
        footer={false}
        title={"Toplu düzəliş"}
      >
        <form onSubmit={handleUpdate} className="flex flex-col gap-4">
          <div>
            <div className="flex flex-col mb-3">
              <label className="dark:text-white">Müştəri adı</label>
              <input
                type="text"
                className="w-full p-2.5 text-gray-900 border focus:outline-none border-gray-300 rounded-md bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                name={"client-name"}
                onChange={(e) => {
                  e.target.value.trim() === ""
                    ? setInputData({
                        ...inputData,
                        DEFINITION_: null,
                      })
                    : setInputData({
                        ...inputData,
                        DEFINITION_: e.target.value.trim(),
                      });
                }}
              />
            </div>
            <div className="flex flex-col">
              <label className="dark:text-white">Vöen</label>
              <input
                type="text"
                className="w-full p-2.5 text-gray-900 border focus:outline-none border-gray-300 rounded-md bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                name={"client-tax"}
                onChange={(e) => {
                  e.target.value.trim() === ""
                    ? setInputData({
                        ...inputData,
                        TAXNR: null,
                      })
                    : setInputData({
                        ...inputData,
                        TAXNR: e.target.value.trim(),
                      });
                }}
              />
            </div>
          </div>
          <div>
            <button
              type="submit"
              className="w-full inline-flex justify-center rounded-md border border-transparent bg-blue-100 dark:bg-gray-500 dark:text-slate-300 dark:hover:bg-gray-700 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
            >
              Göndər
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}

export default BulkUpdateModal;
