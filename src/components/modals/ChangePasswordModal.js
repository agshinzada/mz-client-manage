import { memo, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { Modal } from "antd";
import { fetchChangePass, fetchLogin } from "../../services/authService";
import Swal from "sweetalert2";

function ChangePasswordModal({ isOpen, setIsOpen }) {
  const { user } = useAuth();
  const navigate = useNavigate();
  var hash = require("hash.js");
  const [oldPassword, setOldPassword] = useState(null);
  const [newPassword, setNewPassword] = useState(null);
  const [reTypePassword, setRetypePassword] = useState(null);
  const [passwordCheck, setPasswordCheck] = useState(null);

  const notifySuccess = (title) => toast.success(title);
  const notifyError = (title) => toast.error(title);

  const changePassword = async (e) => {
    try {
      e.preventDefault();
      if (passwordCheck) {
        const oldHashPass = hash.sha256().update(oldPassword).digest("hex");
        const userRes = await fetchLogin(user.USERNAME, oldHashPass);
        if (userRes.status === 200 && userRes.statusText === "OK") {
          const loginData = await userRes.json();
          if (loginData) {
            Swal.fire({
              text: "Şifrə məlumatları yenilənəcək",
              showCancelButton: true,
              confirmButtonColor: "#3085d6",
              cancelButtonColor: "#d33",
              confirmButtonText: "OK",
              cancelButtonText: "Imtina",
            }).then(async (result) => {
              if (result.isConfirmed) {
                const newHashPass = hash
                  .sha256()
                  .update(reTypePassword)
                  .digest("hex");
                const res = await fetchChangePass(
                  user.ID,
                  newHashPass,
                  user.TOKEN
                );
                if (res.status === 200 && res.statusText === "OK") {
                  notifySuccess("Şifrə uğurla dəyişildi!");
                  setTimeout(() => {
                    notifySuccess("Giriş səhifəsinə yönləndirilsiz...");
                  }, 1000);
                  setIsOpen(false);
                  setTimeout(() => {
                    navigate("auth/login");
                    sessionStorage.clear();
                  }, 3000);
                } else {
                  notifyError(res.statusText);
                }
              }
            });
          }
        } else {
          notifyError("Köhnə şifrə düzgün deyil!");
        }
      } else {
        notifyError("Şifrələr eyni deyil!");
      }
    } catch (error) {
      notifyError(`${error.name}: ${error.message}`);
    }
  };

  const checkPassword = (pass) => {
    setPasswordCheck(pass === newPassword);
    setRetypePassword(pass);
  };

  return (
    <Modal
      open={isOpen}
      onCancel={() => setIsOpen(false)}
      centered
      maskClosable={false}
      footer={false}
    >
      <form className=" pt-6" onSubmit={changePassword}>
        <div className="flex flex-col gap-10">
          <div>
            <label className="dark:text-slate-300">Köhnə şifrə</label>
            <input
              type="password"
              required
              className="bg-transparent border border-gray-300 text-gray-900 dark:border-slate-500 dark:text-slate-300 dark:bg-gray-700 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2"
              onChange={(e) => setOldPassword(e.target.value.trim())}
              onInvalid={(e) => e.target.setCustomValidity("Xananı doldurun")}
              onInput={(e) => e.target.setCustomValidity("")}
            />
          </div>
          <div>
            <label className="dark:text-slate-300">Yeni şifrə</label>
            <input
              type="password"
              required
              className="bg-transparent border mb-2 border-gray-300 text-gray-900 dark:border-slate-500 dark:text-slate-300 dark:bg-gray-700 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2"
              onChange={(e) => setNewPassword(e.target.value.trim())}
              onInvalid={(e) => e.target.setCustomValidity("Xananı doldurun")}
              onInput={(e) => e.target.setCustomValidity("")}
            />
            <input
              type="password"
              required
              className="bg-transparent border border-gray-300 text-gray-900 dark:border-slate-500 dark:text-slate-300 dark:bg-gray-700 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2"
              onChange={(e) => checkPassword(e.target.value.trim())}
              onInvalid={(e) => e.target.setCustomValidity("Xananı doldurun")}
              onInput={(e) => e.target.setCustomValidity("")}
            />
          </div>
        </div>
        <div>
          <button
            type="submit"
            className="w-full mt-6 inline-flex justify-center rounded-md border border-transparent bg-blue-100 dark:bg-gray-500 dark:text-slate-300 dark:hover:bg-gray-700 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
            onSubmit={changePassword}
          >
            OK
          </button>
        </div>
      </form>
    </Modal>
  );
}

export default memo(ChangePasswordModal);
