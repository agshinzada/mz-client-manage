import { Toaster } from "react-hot-toast";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { encryptStorage } from "../utils/storage";
import { useIdleTimer } from "react-idle-timer";
import { Button } from "antd";
import Swal from "sweetalert2";
import { useAuth } from "../context/AuthContext";
import MenuDropdown from "../components/menu/MenuDropdown";
import EditDropdown from "../components/menu/EditDropdown";

function Layout() {
  const navigate = useNavigate();
  const { user } = useAuth();

  // IDLE ACTIVITY
  const onIdle = () => {
    encryptStorage.clear();
    navigate("auth/login");
  };

  useIdleTimer({
    onIdle,
    timeout: 600_000,
    throttle: 500,
  });

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
          navigate("auth/login");
        }
      });
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="bg-slate-100 overflow-y-auto flex items-center py-5 min-h-screen justify-center relative">
      <div>
        <div className="flex items-center justify-between mb-4">
          <div className="flex gap-4 bg-gray-500 rounded-lg p-1.5">
            <NavLink
              to={"/"}
              className="text-md text-slate-200 w-fit px-8 py-1.5 rounded-lg navBtn"
            >
              Müştəri
            </NavLink>
            <NavLink
              to={"/sticker"}
              className="text-md text-slate-200 w-fit px-8 py-1.5 rounded-lg navBtn"
            >
              Stiker
            </NavLink>
          </div>

          <div className="flex items-center gap-3">
            <span className="font-bold">{user.USERNAME}</span>
            {/* <Button
              onClick={() => setTaxesModalIsOpen(true)}
              icon={<SearchOutlined />}
            >
              Axtar
            </Button> */}
            <EditDropdown />
            <MenuDropdown />

            <Button type="primary" onClick={logoutHandle}>
              Çıxış
            </Button>
          </div>
        </div>

        <div className="w-full h-fit bg-white dark:bg-gray-700 rounded-xl shadow-md px-8 py-10">
          <Outlet />
        </div>
      </div>

      <Toaster
        position="top-center"
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

export default Layout;
