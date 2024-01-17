import { Modal } from "antd";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-hot-toast";
import { useAdmin } from "../../context/AdminContext";
import { useNavigate } from "react-router-dom";
import { encryptStorage } from "../../utils/storage";
import { fetchNewDelivery } from "../../services/deliveryService";

function NewDelivery({ isOpen, setIsOpen }) {
  const { adminAuth } = useAdmin();
  const [name, setName] = useState(null);
  const [code, setCode] = useState(null);
  const [regionId, setRegionId] = useState(null);
  const navigate = useNavigate();

  const nameRef = useRef();
  const codeRef = useRef();
  const typeRef = useRef();

  useEffect(() => {
    try {
      if (!isOpen && nameRef.current) {
        nameRef.current.value = "";
        codeRef.current.value = "";
        typeRef.current.value = "";
        setName(null);
        setCode(null);
        setRegionId(null);
      }
    } catch (error) {
      console.log(error);
    }
  }, [isOpen]);

  const submitBrand = async () => {
    try {
      if (name && code && regionId) {
        const res = await fetchNewDelivery(
          {
            name,
            code: code.toUpperCase(),
            regionId: regionId.toUpperCase(),
          },
          adminAuth.TOKEN
        );
        if (res.status === 200 && res.statusText === "OK") {
          toast.success("Əlavə edildi!");
          setIsOpen(false);
        } else if (res.status === 401) {
          toast.dismiss();
          toast.error("Token expired!");
          setTimeout(() => {
            encryptStorage.removeItem("adminAuth");
            navigate("/");
          }, 1000);
        }
      } else {
        toast.error("Xanaları doldurun!");
      }
    } catch (error) {
      toast.error("Sistem xətası!");
      console.log(error);
    }
  };

  return (
    <Modal
      open={isOpen}
      onCancel={() => {
        setIsOpen(false);
      }}
      centered
      maskClosable={false}
      footer={false}
      title={"Yeni Təslimatçı"}
    >
      <div className="flex flex-col gap-2 mt-5">
        <div className="flex flex-col gap-3">
          <div>
            <label
              htmlFor="name"
              className="block mb-2 text-sm  text-gray-900 dark:text-white"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              onChange={(e) =>
                setName(e.target.value === "" ? null : e.target.value)
              }
              ref={nameRef}
            />
          </div>
          <div className="flex gap-2">
            <div>
              <label
                htmlFor="code"
                className="block mb-2 text-sm  text-gray-900 dark:text-white"
              >
                Code
              </label>
              <input
                type="text"
                id="code"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                onChange={(e) =>
                  setCode(e.target.value === "" ? null : e.target.value)
                }
                ref={codeRef}
              />
            </div>
            <div>
              <label
                htmlFor="type"
                className="block mb-2 text-sm  text-gray-900 dark:text-white"
              >
                RegionID
              </label>
              <input
                type="text"
                id="type"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                onChange={(e) =>
                  setRegionId(e.target.value === "" ? null : e.target.value)
                }
                ref={typeRef}
              />
            </div>
          </div>
        </div>
        <div>
          <button
            type="button"
            className="w-full mt-5 inline-flex justify-center rounded-md border border-transparent bg-blue-100 dark:bg-gray-500 dark:text-slate-300 dark:hover:bg-gray-700 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
            onClick={submitBrand}
          >
            Göndər
          </button>
        </div>
      </div>
    </Modal>
  );
}

export default NewDelivery;
