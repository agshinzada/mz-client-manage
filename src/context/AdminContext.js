import { createContext, useState, useContext } from "react";
import { encryptStorage } from "../utils/storage";

const Context = createContext();

export const AdminProvider = ({ children }) => {
  const [adminAuth, setAdminAuth] = useState(
    encryptStorage.getItem("adminAuth")
  );

  const data = {
    adminAuth,
    setAdminAuth,
  };

  return <Context.Provider value={data}>{children}</Context.Provider>;
};

export const useAdmin = () => useContext(Context);
