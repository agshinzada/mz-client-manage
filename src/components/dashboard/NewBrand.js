import { Modal } from "antd";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-hot-toast";
import { fetchNewBrand } from "../../services/brandService";
import { useAdmin } from "../../context/AdminContext";
import { useNavigate } from "react-router-dom";
import { encryptStorage } from "../../utils/storage";

function NewBrand({ isOpen, setIsOpen }) {
  const { adminAuth } = useAdmin();
  const [name, setName] = useState(null);
  const [code, setCode] = useState(null);
  const [type, setType] = useState(null);
  const [nr, setNr] = useState(null);
  const navigate = useNavigate();

  const nameRef = useRef();
  const codeRef = useRef();
  const typeRef = useRef();
  const nrRef = useRef();

  useEffect(() => {
    try {
      if (!isOpen && nameRef.current) {
        nameRef.current.value = "";
        codeRef.current.value = "";
        typeRef.current.value = "";
        nrRef.current.value = "";
        setName(null);
        setCode(null);
        setType(null);
        setNr(null);
      }
    } catch (error) {
      console.log(error);
    }
  }, [isOpen]);

  const submitBrand = async () => {
    try {
      if (name && code && type && nr) {
        const res = await fetchNewBrand(
          {
            name,
            code: code.toUpperCase(),
            type: type.toUpperCase(),
            nr,
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
      title={"Yeni brend"}
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
                Type
              </label>
              <input
                type="text"
                id="type"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                onChange={(e) =>
                  setType(e.target.value === "" ? null : e.target.value)
                }
                ref={typeRef}
              />
            </div>
            <div>
              <label
                htmlFor="nr"
                className="block mb-2 text-sm  text-gray-900 dark:text-white"
              >
                NR
              </label>
              <input
                type="number"
                id="nr"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                onChange={(e) =>
                  setNr(e.target.value === "" ? null : e.target.value)
                }
                ref={nrRef}
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

export default NewBrand;
