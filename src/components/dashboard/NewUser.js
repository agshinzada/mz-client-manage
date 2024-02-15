import { Modal } from "antd";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-hot-toast";
import { fetchNewUser } from "../../services/authService";
import { useAdmin } from "../../context/AdminContext";
import { useNavigate } from "react-router-dom";
import { encryptStorage } from "../../utils/storage";

function NewUser({ isOpen, setIsOpen }) {
  const { adminAuth } = useAdmin();
  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);
  const [logoRef, setLogoRef] = useState(null);
  const [role, setRole] = useState(null);
  var hash = require("hash.js");
  const navigate = useNavigate();

  const usernameRef = useRef();
  const codeRef = useRef();
  const roleRef = useRef();
  const passwordRef = useRef();

  useEffect(() => {
    try {
      if (!isOpen && usernameRef.current) {
        usernameRef.current.value = "";
        codeRef.current.value = "";
        passwordRef.current.value = "";
        roleRef.current.value = "DEFAULT";

        setUsername(null);
        setLogoRef(null);
        setRole(null);
      }
    } catch (error) {
      console.log(error);
    }
  }, [isOpen]);

  const submitUser = async () => {
    try {
      if (username && logoRef && role && password) {
        const hashPass = hash.sha256().update(password).digest("hex");
        const res = await fetchNewUser(
          {
            username,
            logoRef,
            role,
            password: hashPass,
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
              Username
            </label>
            <input
              type="text"
              id="name"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              onChange={(e) =>
                setUsername(e.target.value === "" ? null : e.target.value)
              }
              ref={usernameRef}
            />
          </div>
          <div>
            <label
              htmlFor="name"
              className="block mb-2 text-sm  text-gray-900 dark:text-white"
            >
              Password
            </label>
            <input
              type="text"
              id="name"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              onChange={(e) =>
                setPassword(e.target.value === "" ? null : e.target.value)
              }
              ref={passwordRef}
            />
          </div>
          <div className="flex gap-2">
            <div className="w-full">
              <label
                htmlFor="code"
                className="block mb-2 text-sm  text-gray-900 dark:text-white"
              >
                Logo REF
              </label>
              <input
                type="number"
                id="code"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                onChange={(e) =>
                  setLogoRef(e.target.value === "" ? null : e.target.value)
                }
                ref={codeRef}
              />
            </div>
            <div className="w-full">
              <label
                htmlFor="name"
                className="block mb-2 text-sm  text-gray-900 dark:text-white"
              >
                Role
              </label>
              <select
                id="countries"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                defaultValue={"DEFAULT"}
                ref={roleRef}
                onChange={(e) =>
                  setRole(e.target.value === "" ? null : e.target.value)
                }
              >
                <option value={"DEFAULT"} disabled>
                  Seç
                </option>
                <option value="ADMIN">ADMIN</option>
                <option value="USER">USER</option>
                <option value="MODERATOR">MODERATOR</option>
              </select>
            </div>
          </div>
        </div>
        <div className="mt-5">
          <button
            type="button"
            className="w-full inline-flex justify-center rounded-md border border-transparent bg-blue-100 dark:bg-gray-500 dark:text-slate-300 dark:hover:bg-gray-700 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
            onClick={submitUser}
          >
            Göndər
          </button>
        </div>
      </div>
    </Modal>
  );
}

export default NewUser;
