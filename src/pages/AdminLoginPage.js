import { memo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { encryptStorage } from "../utils/storage";
import { fetchLogin } from "../services/authService";
import { useAdmin } from "../context/AdminContext";
import MainFooter from "../components/Footer";

function AdminLoginPage() {
  const { setAdminAuth } = useAdmin();
  var hash = require("hash.js");
  const navigate = useNavigate();
  const [username, setUsername] = useState(null);
  const [hashPassword, setHashPassword] = useState(null);
  const [successDiv, setSuccessDiv] = useState(false);
  const [warningDiv, setWarningDiv] = useState(false);
  const [warning, setWarning] = useState("");

  const loginHandle = async (e) => {
    try {
      e.preventDefault();
      const res = await fetchLogin(username, hashPassword);
      if (res.status === 200 && res.statusText === "OK") {
        const data = await res.json();
        if (data.ROLE.trim() === "ADMIN" || data.ROLE.trim() === "MODERATOR") {
          setWarningDiv(false);
          setSuccessDiv(true);
          setTimeout(() => {
            encryptStorage.setItem("adminAuth", data);
            setAdminAuth(data);
            navigate("/dashboard");
          }, 700);
        } else {
          setWarning("Giriş uğurlu deyil! (Yetkiniz yoxdur)");
          setSuccessDiv(false);
          setWarningDiv(true);
        }
      } else if (res.status === 500) {
        setWarning(res.statusText);
        setSuccessDiv(false);
        setWarningDiv(true);
      } else if (res.status === 401) {
        setWarning(await res.text());
        setSuccessDiv(false);
        setWarningDiv(true);
      }
    } catch (error) {
      setWarning("Server error!");
      setSuccessDiv(false);
      setWarningDiv(true);
    }
  };

  return (
    <div className="grid grid-rows-1 items-center h-screen w-full bg-slate-100">
      <div className="w-full bg-white rounded shadow-lg p-8 m-4 md:max-w-sm md:mx-auto">
        <span className="block w-full text-xl uppercase font-bold mb-4">
          GİRİŞ
        </span>
        {successDiv && (
          <div className="p-2 bg-green-50 border-green-200 text-green-800 border rounded-sm text-sm mb-4">
            Siz daxil oldunuz! Gözləyin
          </div>
        )}
        {warningDiv && (
          <div className="p-2 bg-red-50 border-red-200 text-red-800 border rounded-sm text-sm mb-4">
            {warning}
          </div>
        )}

        <form className="mb-4 flex flex-col" onSubmit={loginHandle}>
          <div className="mb-4 md:w-full">
            <label htmlFor="email" className="block text-xs mb-1">
              İstifadəçi adı
            </label>
            <input
              className="w-full border rounded p-2 outline-none focus:shadow-outline"
              type="text"
              name="email"
              id="email"
              required
              placeholder="username"
              onInvalid={(e) => e.target.setCustomValidity("Xananı doldurun")}
              onInput={(e) => e.target.setCustomValidity("")}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="mb-6 md:w-full">
            <label htmlFor="password" className="block text-xs mb-1">
              Şifrə
            </label>
            <input
              className="w-full border rounded p-2 outline-none focus:shadow-outline"
              type="password"
              name="password"
              id="password"
              required
              placeholder="password"
              onInvalid={(e) => e.target.setCustomValidity("Xananı doldurun")}
              onInput={(e) => e.target.setCustomValidity("")}
              onChange={(e) =>
                setHashPassword(
                  hash.sha256().update(e.target.value).digest("hex")
                )
              }
            />
          </div>
          <button
            className="bg-green-500 hover:bg-green-700 text-white uppercase text-sm font-semibold px-4 py-2 rounded self-end"
            type="submit"
          >
            login
          </button>
        </form>
      </div>
      <MainFooter />
    </div>
  );
}

export default memo(AdminLoginPage);
