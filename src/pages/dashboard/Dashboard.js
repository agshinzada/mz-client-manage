import {
  CaretRightOutlined,
  LoginOutlined,
  MenuOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { useAdmin } from "../../context/AdminContext";
import { NavLink, Route, Routes, useNavigate } from "react-router-dom";
import RegionPage from "./RegionPage";
import BrandPage from "./BrandPage";
import CategoryPage from "./CategoryPage";
import DiscountPage from "./DiscountPage";
import CampaignPage from "./CampaignPage";
import VisitDayPage from "./VisitDayPage";
import UserPage from "./UserPage";
import { Toaster } from "react-hot-toast";
import Swal from "sweetalert2";
import { encryptStorage } from "../../utils/storage";
import { useRef, useState } from "react";
import LogPage from "./LogPage";
import { useIdleTimer } from "react-idle-timer";
import DeliveryPage from "./DeliveryPage";
import BulkClient from "./BulkClient";
import ProductPage from "./ProductPage";
import RiskPage from "./RiskPage";

function Dashboard() {
  const { adminAuth } = useAdmin();
  const { setAdminAuth } = useAdmin();
  const [burgerMenu, setBurgerMenu] = useState(false);

  const navRef = useRef();
  const mainRef = useRef();
  const asideRef = useRef();

  const navigate = useNavigate();

  const onIdle = () => {
    encryptStorage.clear("adminAuth");
    navigate("/dashboard/auth/login");
  };

  useIdleTimer({
    onIdle,
    timeout: 600_000,
    throttle: 500,
  });

  function handleMenu(param) {
    try {
      if (param) {
        navRef.current.classList.remove("ml-64");
        mainRef.current.classList.remove("ml-64");
        asideRef.current.classList.add("hidden");
        setBurgerMenu(true);
      } else {
        navRef.current.classList.add("ml-64");
        mainRef.current.classList.add("ml-64");
        asideRef.current.classList.remove("hidden");
        setBurgerMenu(false);
      }
    } catch (error) {
      console.log(error);
    }
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
          encryptStorage.removeItem("adminAuth");
          setAdminAuth(false);
          navigate("/");
        }
      });
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="bg-gray-200 relative">
      <aside
        className="w-64 bg-gray-700 h-full absolute left-0 top-0 overflow-y-auto"
        ref={asideRef}
      >
        <h1 className="px-7 py-4 text-xl text-gray-200  border-b border-b-slate-500">
          İDARƏETMƏ
        </h1>
        <div className="text-gray-200 px-7 py-4 flex gap-2 items-center border-b border-b-slate-500">
          <UserOutlined style={{ fontSize: "30px" }} />
          <p className="text-md font-semibold">{adminAuth.USERNAME}</p>
        </div>

        <ul className="flex flex-col gap-2 px-2 py-3">
          <NavLink
            to={"/dashboard/regions"}
            className="flex items-center gap-2 px-5 py-3 font-semibold text-gray-200 hover:pl-7 hover:bg-gray-600 rounded-sm transition-all cursor-pointer"
          >
            <CaretRightOutlined style={{ fontSize: "20px" }} />
            <span>Regionlar</span>
          </NavLink>
          <NavLink
            to={"/dashboard/brands"}
            className="flex items-center gap-2 px-5 py-3 font-semibold text-gray-200 hover:pl-7 hover:bg-gray-600 rounded-sm transition-all cursor-pointer"
          >
            <CaretRightOutlined style={{ fontSize: "20px" }} />
            <span>Brendlər</span>
          </NavLink>
          <NavLink
            to={"/dashboard/category"}
            className="flex items-center gap-2 px-5 py-3 font-semibold text-gray-200 hover:pl-7 hover:bg-gray-600 rounded-sm transition-all cursor-pointer"
          >
            <CaretRightOutlined style={{ fontSize: "20px" }} />
            <span>Müştəri kateqoriyası</span>
          </NavLink>
          <NavLink
            to={"/dashboard/discounts"}
            className="flex items-center gap-2 px-5 py-3 font-semibold text-gray-200 hover:pl-7 hover:bg-gray-600 rounded-sm transition-all cursor-pointer"
          >
            <CaretRightOutlined style={{ fontSize: "20px" }} />
            <span>Endirimlər</span>
          </NavLink>
          <NavLink
            to={"/dashboard/campaigns"}
            className="flex items-center gap-2 px-5 py-3 font-semibold text-gray-200 hover:pl-7 hover:bg-gray-600 rounded-sm transition-all cursor-pointer"
          >
            <CaretRightOutlined style={{ fontSize: "20px" }} />
            <span>Kampaniyalar</span>
          </NavLink>
          <NavLink
            to={"/dashboard/delivery"}
            className="flex items-center gap-2 px-5 py-3 font-semibold text-gray-200 hover:pl-7 hover:bg-gray-600 rounded-sm transition-all cursor-pointer"
          >
            <CaretRightOutlined style={{ fontSize: "20px" }} />
            <span>Təslimatçılar</span>
          </NavLink>
          <NavLink
            to={"/dashboard/visits"}
            className="flex items-center gap-2 px-5 py-3 font-semibold text-gray-200 hover:pl-7 hover:bg-gray-600 rounded-sm transition-all cursor-pointer"
          >
            <CaretRightOutlined style={{ fontSize: "20px" }} />
            <span>Vizit günləri</span>
          </NavLink>
          <NavLink
            to={"/dashboard/users"}
            className="flex items-center gap-2 px-5 py-3 font-semibold text-gray-200 hover:pl-7 hover:bg-gray-600 rounded-sm transition-all cursor-pointer"
          >
            <CaretRightOutlined style={{ fontSize: "20px" }} />
            <span>İstifadəçilər</span>
          </NavLink>
          <NavLink
            to={"/dashboard/logs"}
            className="flex items-center gap-2 px-5 py-3 font-semibold text-gray-200 hover:pl-7 hover:bg-gray-600 rounded-sm transition-all cursor-pointer"
          >
            <CaretRightOutlined style={{ fontSize: "20px" }} />
            <span>Loglar</span>
          </NavLink>
          <NavLink
            to={"/dashboard/bulkclient"}
            className="flex items-center gap-2 px-5 py-3 font-semibold text-gray-200 hover:pl-7 hover:bg-gray-600 rounded-sm transition-all cursor-pointer"
          >
            <CaretRightOutlined style={{ fontSize: "20px" }} />
            <span>Toplu müştəri</span>
          </NavLink>
          <NavLink
            to={"/dashboard/products"}
            className="flex items-center gap-2 px-5 py-3 font-semibold text-gray-200 hover:pl-7 hover:bg-gray-600 rounded-sm transition-all cursor-pointer"
          >
            <CaretRightOutlined style={{ fontSize: "20px" }} />
            <span>Məhsul düzəlişi</span>
          </NavLink>
          <NavLink
            to={"/dashboard/risks"}
            className="flex items-center gap-2 px-5 py-3 font-semibold text-gray-200 hover:pl-7 hover:bg-gray-600 rounded-sm transition-all cursor-pointer"
          >
            <CaretRightOutlined style={{ fontSize: "20px" }} />
            <span>Risk düzəlişi</span>
          </NavLink>
        </ul>
      </aside>
      <nav className="w-full h-[60px] bg-gray-50">
        <div
          className="ml-64 flex items-center justify-between px-5 h-full"
          ref={navRef}
        >
          <MenuOutlined
            style={{ fontSize: "20px", cursor: "pointer" }}
            onClick={() => handleMenu(!burgerMenu)}
          />
          <div className="">
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
          <Routes>
            <Route path="regions" element={<RegionPage />} />
            <Route path="brands" element={<BrandPage />} />
            <Route path="category" element={<CategoryPage />} />
            <Route path="discounts" element={<DiscountPage />} />
            <Route path="campaigns" element={<CampaignPage />} />
            <Route path="visits" element={<VisitDayPage />} />
            <Route path="users" element={<UserPage />} />
            <Route path="logs" element={<LogPage />} />
            <Route path="delivery" element={<DeliveryPage />} />
            <Route path="bulkclient" element={<BulkClient />} />
            <Route path="products" element={<ProductPage />} />
            <Route path="risks" element={<RiskPage />} />
          </Routes>
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

export default Dashboard;
