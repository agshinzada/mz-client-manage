import {
  CaretRightOutlined,
  LoginOutlined,
  MenuOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Toaster } from "react-hot-toast";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { encryptStorage } from "../utils/storage";
import Swal from "sweetalert2";
import { useIdleTimer } from "react-idle-timer";
import { useRef, useState } from "react";
import { useAdmin } from "../context/AdminContext";
import AsideBox from "../components/dashboard/AsideBox";
import MainFooter from "../components/Footer";

function DashboardLayout() {
  const { setAdminAuth } = useAdmin();
  const [burgerMenu, setBurgerMenu] = useState(false);

  const navRef = useRef();
  const mainRef = useRef();
  //   const asideRef = useRef();

  const navigate = useNavigate();

  const onIdle = () => {
    encryptStorage.clear();
    navigate("/dashboard/auth/login");
  };

  useIdleTimer({
    onIdle,
    timeout: 15000_000,
    throttle: 500,
  });

  function handleMenu(param) {
    // try {
    //   if (param) {
    //     navRef.current.classList.remove("ml-64");
    //     mainRef.current.classList.remove("ml-64");
    //     // asideRef.current.classList.add("hidden");
    //     setBurgerMenu(true);
    //   } else {
    //     navRef.current.classList.add("ml-64");
    //     mainRef.current.classList.add("ml-64");
    //     // asideRef.current.classList.remove("hidden");
    //     setBurgerMenu(false);
    //   }
    // } catch (error) {
    //   console.log(error);
    // }
  }

  function logoutHandle() {
    try {
      Swal.fire({
        title: "Çıxış edilsin?",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Bəli",
        cancelButtonText: "Imtina",
      }).then(async (result) => {
        if (result.isConfirmed) {
          encryptStorage.clear();
          setAdminAuth(false);
          navigate("/auth/login");
        }
      });
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="bg-gray-200 relative">
      <nav className="w-full h-[60px] bg-gray-50">
        <div
          className="ml-64 flex items-center justify-between px-5 h-full"
          ref={navRef}
        >
          <AsideBox />
          <MenuOutlined
            style={{ fontSize: "20px", cursor: "pointer" }}
            onClick={() => handleMenu(!burgerMenu)}
          />
          <div>
            <button
              type="button"
              className="flex gap-2 items-center focus:outline-none self-end w-fit text-white bg-blue-700 hover:bg-blue-800 focus:ring-1 focus:ring-blue-300 font-medium rounded-lg text-sm px-6 py-1.5  dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              onClick={logoutHandle}
            >
              <LoginOutlined />
              <span>Çıxış</span>
            </button>
          </div>
        </div>
      </nav>
      <main className="min-h-screen p-3">
        <div className="ml-64" ref={mainRef}>
          <Outlet />
          <MainFooter />
        </div>
      </main>
      <Toaster
        position="bottom-right"
        reverseOrder={false}
        gutter={8}
        containerClassName=""
        containerStyle={{}}
        toastOptions={{
          // Define default options
          className: "",
          duration: 5000,
          style: {
            background: "#363636",
            color: "#fff",
          },

          // Default options for specific types
          success: {
            duration: 3000,
            theme: {
              primary: "green",
              secondary: "black",
            },
          },
        }}
      />
    </div>
  );
}

export default DashboardLayout;
