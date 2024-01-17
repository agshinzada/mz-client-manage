import { Modal } from "antd";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-hot-toast";
import { fetchNewRegion } from "../../services/regionService";
import { useAdmin } from "../../context/AdminContext";
import { encryptStorage } from "../../utils/storage";
import { useNavigate } from "react-router-dom";

function NewRegion({ isOpen, setIsOpen }) {
  const { adminAuth } = useAdmin();
  const [name, setName] = useState(null);
  const [rootId, setRootId] = useState(null);
  const [codeId, setCodeId] = useState(null);
  const navigate = useNavigate();

  const nameRef = useRef();
  const rootRef = useRef();
  const codeRef = useRef();

  useEffect(() => {
    try {
      if (!isOpen && nameRef.current) {
        nameRef.current.value = "";
        codeRef.current.value = "";
        rootRef.current.value = "";

        setName(null);
        setRootId(null);
        setCodeId(null);
      }
    } catch (error) {
      console.log(error);
    }
  }, [isOpen]);

  const submitRegion = async () => {
    try {
      if (name && rootId && codeId) {
        const res = await fetchNewRegion(
          {
            name,
            rootId,
            codeId,
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
      title={"Yeni region"}
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
            <div className="w-full">
              <label
                htmlFor="root"
                className="block mb-2 text-sm  text-gray-900 dark:text-white"
              >
                ROOT_ID
              </label>
              <input
                type="number"
                id="root"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                onChange={(e) =>
                  setRootId(e.target.value === "" ? null : e.target.value)
                }
                ref={rootRef}
              />
            </div>
            <div className="w-full">
              <label
                htmlFor="code"
                className="block mb-2 text-sm  text-gray-900 dark:text-white"
              >
                CODE_ID
              </label>
              <input
                type="number"
                id="code"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                onChange={(e) =>
                  setCodeId(e.target.value === "" ? null : e.target.value)
                }
                ref={codeRef}
              />
            </div>
          </div>
        </div>
        <div className="mt-5">
          <button
            type="button"
            className="w-full inline-flex justify-center rounded-md border border-transparent bg-blue-100 dark:bg-gray-500 dark:text-slate-300 dark:hover:bg-gray-700 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
            onClick={submitRegion}
          >
            Göndər
          </button>
        </div>
      </div>
    </Modal>
  );
}

export default NewRegion;
