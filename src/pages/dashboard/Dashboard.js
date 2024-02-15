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
import LogPage from "./LogPage";
import DeliveryPage from "./DeliveryPage";
import BulkClient from "./BulkClient";
import ProductPage from "./ProductPage";
import RiskPage from "./RiskPage";
import DashboardLayout from "../../layout/DashboardLayout";

function Dashboard() {
  return (
    <Routes>
      <Route path="/" element={<DashboardLayout />}>
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
      </Route>
    </Routes>
  );
}

export default Dashboard;
