import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { AuthProvider } from "./context/AuthContext";
import PrivateRoute from "./routes/PrivateRoute";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import { GlobalProvider } from "./context/GlobalContext";
import ErrorPage from "./pages/ErrorPage";
import MainLayout from "./layout/Layout";
import { ClientProvider } from "./context/ClientContext";
import ClientPage from "./pages/ClientPage";
import EditClientPage from "./pages/EditClientPage";
import { StickerProvider } from "./context/StickerContext";
import StickerPage from "./pages/StickerPage";
import EditTaxPage from "./pages/EditTaxPage";
import RoutePage from "./pages/RoutePage";
import InsertedClientsPage from "./pages/InsertedClientsPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <PrivateRoute>
        <MainLayout>
          <App />
        </MainLayout>
      </PrivateRoute>
    ),
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: (
          <ClientProvider>
            <ClientPage />
          </ClientProvider>
        ),
      },
      {
        path: "sticker",
        element: (
          <StickerProvider>
            <StickerPage />
          </StickerProvider>
        ),
      },
      {
        path: "clients/edit",
        element: <EditClientPage />,
      },

      {
        path: "clients/tax/edit",
        element: <EditTaxPage />,
      },
      {
        path: "routes",
        element: <RoutePage />,
      },
      {
        path: "inserted",
        element: <InsertedClientsPage />,
      },
    ],
  },
  {
    path: "/auth/login",
    element: <LoginPage />,
  },
]);
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AuthProvider>
      <GlobalProvider>
        <RouterProvider router={router} />
      </GlobalProvider>
    </AuthProvider>
  </React.StrictMode>
);
