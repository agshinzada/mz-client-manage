import { createContext, useState, useContext } from "react";

const Context = createContext();

export const ClientProvider = ({ children }) => {
  const [brandId, setBrandId] = useState(null);
  const [regionId, setRegionId] = useState(null);
  const [regionName, setRegionName] = useState(null);
  const [clientData, setClientData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [selectedSticker, setSelectedSticker] = useState(false);
  const [createdCode, setCreatedCode] = useState(false);
  const [createStatus, setCreateStatus] = useState(false);
  const [disabled, setDisabled] = useState(true);

  const data = {
    brandId,
    setBrandId,
    clientData,
    setClientData,
    selectedSticker,
    setSelectedSticker,
    setCreatedCode,
    createdCode,
    loading,
    setLoading,
    regionId,
    setRegionId,
    regionName,
    setRegionName,
    createStatus,
    setCreateStatus,
    disabled,
    setDisabled,
  };

  return <Context.Provider value={data}>{children}</Context.Provider>;
};

export const useClient = () => useContext(Context);
