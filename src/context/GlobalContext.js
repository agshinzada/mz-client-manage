import { createContext, useState, useContext, useEffect } from "react";
import { fetchRegions } from "../services/regionService";
import { fetchTradeGroups } from "../services/rootService";
import { fetchGroupCodes } from "../services/groupService";

const Context = createContext();

export const GlobalProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [regions, setRegions] = useState([]);
  const [tradeGroup, setTradeGroup] = useState([]);
  const [groupCodes, setGroupCodes] = useState([]);
  const [menuItemId, setMenuItemId] = useState(
    JSON.parse(localStorage.getItem("menuItem"))?.id || 1
  );

  const getRegions = async () => {
    const data = await fetchRegions();
    const filterStatus = data.filter((item) => item.STATUS === 0);
    setRegions(filterStatus);
  };

  const getTradeGroup = async () => {
    const data = await fetchTradeGroups();
    setTradeGroup(data);
  };

  const getGroupCodes = async () => {
    const data = await fetchGroupCodes();
    setGroupCodes(data);
  };

  useEffect(() => {
    getRegions();
    getTradeGroup();
    getGroupCodes();
  }, []);

  const data = {
    loading,
    setLoading,
    tradeGroup,
    setTradeGroup,
    regions,
    setRegions,
    groupCodes,
    setGroupCodes,
    menuItemId,
    setMenuItemId,
  };

  return <Context.Provider value={data}>{children}</Context.Provider>;
};

export const useGlobal = () => useContext(Context);
