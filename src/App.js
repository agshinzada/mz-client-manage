import { toast, Toaster } from "react-hot-toast";
import { useIdleTimer } from "react-idle-timer";
import Swal from "sweetalert2";
import { memo, useEffect, useState } from "react";
import { useAuth } from "./context/AuthContext";
import { NavLink, Route, Routes, useNavigate } from "react-router-dom";
import ChangePasswordModal from "./components/modals/ChangePasswordModal";
import ClientsModal from "./components/modals/ClientsModal";
import SearchModal from "./components/modals/SearchModal";
import ClientPage from "./pages/ClientPage";
import StickerPage from "./pages/StickerPage";
import { encryptStorage } from "./utils/storage";

import { fetchTradeGroups } from "./services/rootService";
import { fetchRegions } from "./services/regionService";
import { Button, Dropdown, Space } from "antd";
import { DownOutlined, SearchOutlined } from "@ant-design/icons";
import RoutesModal from "./components/modals/RoutesModal";

function App() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [regions, setRegions] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [stickers, setStickers] = useState([]);
  const [tradeGroup, setTradeGroup] = useState([]);
  const [routes, setRoutes] = useState([]);

  const items = [
    {
      key: "1",
      type: "group",
      label: "İstifadəçi",
      children: [
        {
          key: "1-1",
          label: "Şifrəni dəyiş",
        },
      ],
    },
    {
      key: "2",
      type: "group",
      label: "Əlavə edilən",
      children: [
        {
          key: "2-1",
          label: "Müştərilər",
        },
        {
          key: "2-2",
          label: "Stikerlər",
        },
      ],
    },
    {
      key: "3",
      type: "group",
      label: "Digər",
      children: [
        {
          key: "3-1",
          label: "Rutlar",
        },
      ],
    },
    {
      key: "4",
      disabled: user.ROLE.trim() === "ADMIN" ? false : true,
      label: "İdarəetmə",
    },
  ];

  const onClick = ({ key }) => {
    switch (key) {
      case "1-1":
        setChangePasswordIsOpen(true);
        break;
      case "2-1":
        setDailyInsertedClientsIsOpen(true);
        break;
      case "2-2":
        setDailyInsertedStickersIsOpen(true);
        break;

      case "3-1":
        setRoutesModalIsOpen(true);
        break;
      case "4":
        navigate("/dashboard");
        break;

      default:
        break;
    }
  };

  const [changePasswordIsOpen, setChangePasswordIsOpen] = useState(false);
  const [dailyInsertedClientsIsOpen, setDailyInsertedClientsIsOpen] =
    useState(false);
  const [dailyInsertedStickersIsOpen, setDailyInsertedStickersIsOpen] =
    useState(false);
  const [dailyInsertedOfisIsOpen, setDailyInsertedOfisIsOpen] = useState(false);
  const [taxesModalIsOpen, setTaxesModalIsOpen] = useState(false);
  const [routesModalIsOpen, setRoutesModalIsOpen] = useState(false);

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

  const getAdministrativeRegions = async () => {
    try {
      const data = await fetchRegions();
      const filterStatus = data.filter((item) => item.STATUS === 0);
      setRegions(filterStatus);
    } catch (error) {
      console.log(error);
      toast.error("Sistem xətası!");
    }
  };

  const getTradeGroup = async () => {
    try {
      const data = await fetchTradeGroups();
      setTradeGroup(data);
    } catch (error) {
      console.log(error);
      toast.error("Sistem xətası!");
    }
  };

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

  useEffect(() => {
    getAdministrativeRegions();
    getTradeGroup();
  }, []);

  return (
    <div className="bg-slate-100 overflow-y-auto flex items-center py-5 min-h-screen justify-center relative">
      <div>
        <div className="flex items-center justify-between mb-4">
          <div className="flex gap-4 bg-gray-500 rounded-lg p-1.5">
            <NavLink
              to={"/"}
              className="text-md text-slate-200 w-fit px-3 py-1.5 rounded-lg"
            >
              Müştəri
            </NavLink>
            <NavLink
              to={"/sticker"}
              className="text-md text-slate-200 w-fit px-3 py-1.5 rounded-lg"
            >
              Stiker
            </NavLink>
          </div>

          <div className="flex items-center gap-3">
            <span className="font-bold">{user.USERNAME}</span>
            <Button
              onClick={() => setTaxesModalIsOpen(true)}
              icon={<SearchOutlined />}
            >
              Axtar
            </Button>
            <Dropdown
              menu={{
                items,
                onClick,
              }}
            >
              <Button>
                <Space>
                  Menu
                  <DownOutlined />
                </Space>
              </Button>
            </Dropdown>
            <button
              type="button"
              className=" flex gap-2 items-center focus:outline-none self-end w-fit text-white bg-blue-700 hover:bg-blue-800 focus:ring-1 focus:ring-blue-300 font-medium rounded-lg text-sm px-6 py-1.5  dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              onClick={logoutHandle}
            >
              Çıxış
            </button>
          </div>
        </div>

        <div className="w-full h-fit bg-white dark:bg-gray-700 rounded-xl shadow-md px-8 py-10">
          <Routes>
            <Route
              index
              element={
                <ClientPage
                  regions={regions}
                  districts={districts}
                  setDistricts={setDistricts}
                  stickers={stickers}
                  setStickers={setStickers}
                  tradeGroup={tradeGroup}
                  setTradeGroup={setTradeGroup}
                />
              }
            />
            <Route
              path="sticker"
              element={
                <StickerPage
                  regions={regions}
                  districts={districts}
                  setDistricts={setDistricts}
                  tradeGroup={tradeGroup}
                  setTradeGroup={setTradeGroup}
                />
              }
            />
          </Routes>
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

      <ChangePasswordModal
        isOpen={changePasswordIsOpen}
        setIsOpen={setChangePasswordIsOpen}
      />
      <ClientsModal
        isOpen={dailyInsertedClientsIsOpen}
        setIsOpen={setDailyInsertedClientsIsOpen}
        type="clients"
        rut={true}
        title={"Əlavə edilən müştərilər"}
      />
      <ClientsModal
        isOpen={dailyInsertedStickersIsOpen}
        setIsOpen={setDailyInsertedStickersIsOpen}
        type="stickers"
        title={"Əlavə edilən stikerlər"}
      />

      <ClientsModal
        isOpen={dailyInsertedOfisIsOpen}
        setIsOpen={setDailyInsertedOfisIsOpen}
        type="ofis"
        title={"Əlavə edilən ofis müştəriləri"}
      />
      <SearchModal isOpen={taxesModalIsOpen} setIsOpen={setTaxesModalIsOpen} />
      <RoutesModal
        routes={routes}
        setRoutes={setRoutes}
        isOpen={routesModalIsOpen}
        setIsOpen={setRoutesModalIsOpen}
      />
    </div>
  );
}

export default memo(App);
