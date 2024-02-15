import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { AuthProvider } from "./context/AuthContext";
import PrivateRoute from "./components/routes/PrivateRoute";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import AdminLoginPage from "./pages/AdminLoginPage";
import PageNotFound from "./pages/PageNotFound";
import DashboardRoute from "./components/routes/DashboardRoute";
import Dashboard from "./pages/dashboard/Dashboard";
import { AdminProvider } from "./context/AdminContext";
import { GlobalProvider } from "./context/GlobalContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <GlobalProvider>
          <AdminProvider>
            <Routes>
              <Route
                path="/*"
                index
                element={
                  <PrivateRoute>
                    <App />
                  </PrivateRoute>
                }
              />
              <Route
                path="/dashboard/*"
                element={
                  <DashboardRoute>
                    <Dashboard />
                  </DashboardRoute>
                }
              />

              <Route
                path="/dashboard/auth/login"
                index
                element={<AdminLoginPage />}
              />
              <Route path="/auth/login" index element={<LoginPage />} />
              <Route path="*" element={<PageNotFound />} />
            </Routes>
          </AdminProvider>
        </GlobalProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
