import { createContext, useState, useContext } from "react";

const Context = createContext();

export const GlobalProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [regions, setRegions] = useState([]);
  const [tradeGroup, setTradeGroup] = useState([]);
  const [groupCodes, setGroupCodes] = useState([]);

  const data = {
    loading,
    setLoading,
    tradeGroup,
    setTradeGroup,
    regions,
    setRegions,
    groupCodes,
    setGroupCodes,
  };

  return <Context.Provider value={data}>{children}</Context.Provider>;
};

export const useGlobal = () => useContext(Context);
