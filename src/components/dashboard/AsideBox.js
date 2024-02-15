import { CaretRightOutlined, UserOutlined } from "@ant-design/icons";
import { useAdmin } from "../../context/AdminContext";
import { NavLink } from "react-router-dom";
import { useRef } from "react";

function AsideBox() {
  const { adminAuth } = useAdmin();
  const asideRef = useRef();

  return (
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
  );
}

export default AsideBox;
