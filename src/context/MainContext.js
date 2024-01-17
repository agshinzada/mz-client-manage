import { createContext, useState, useContext } from "react";

const Context = createContext();

export const MainProvider = ({ children }) => {
  const [user, setUser] = useState(JSON.parse(sessionStorage.getItem("user")));

  const data = {
    user,
    setUser,
  };

  return <Context.Provider value={data}>{children}</Context.Provider>;
};

export const useMain = () => useContext(Context);
