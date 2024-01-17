import { Modal } from "antd";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-hot-toast";
import { fetchNewDiscount } from "../../services/discountService";
import { useAdmin } from "../../context/AdminContext";
import { useNavigate } from "react-router-dom";
import { encryptStorage } from "../../utils/storage";

function NewDiscount({ isOpen, setIsOpen }) {
  const { adminAuth } = useAdmin();
  const [value, setValue] = useState(null);
  const [code, setCode] = useState(null);
  const navigate = useNavigate();

  const valueRef = useRef();
  const codeRef = useRef();

  useEffect(() => {
    try {
      if (!isOpen && valueRef.current) {
        valueRef.current.value = "";
        codeRef.current.value = "";
        setValue(null);
        setCode(null);
      }
    } catch (error) {
      console.log(error);
    }
  }, [isOpen]);

  const submitDiscount = async () => {
    try {
      if (code && value) {
        const res = await fetchNewDiscount({
          code: code.toUpperCase(),
          value,
          token: adminAuth.TOKEN,
        });
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
      title={"Yeni endirim"}
    >
      <div className="flex flex-col gap-2 mt-5">
        <div className="flex flex-col gap-3">
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
          <div className="flex gap-2">
            <div>
              <label
                htmlFor="value"
                className="block mb-2 text-sm  text-gray-900 dark:text-white"
              >
                Endirim
              </label>
              <input
                type="text"
                id="value"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                onChange={(e) =>
                  setValue(e.target.value === "" ? null : e.target.value)
                }
                ref={valueRef}
              />
            </div>
          </div>
        </div>
        <div>
          <button
            type="button"
            className="w-full mt-5 inline-flex justify-center rounded-md border border-transparent bg-blue-100 dark:bg-gray-500 dark:text-slate-300 dark:hover:bg-gray-700 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
            onClick={submitDiscount}
          >
            Göndər
          </button>
        </div>
      </div>
    </Modal>
  );
}

export default NewDiscount;
