import { createContext, useState, useContext } from "react";

const Context = createContext();

export const StickerProvider = ({ children }) => {
  const [selectedGroupCode, setSelectedGroupCode] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const [createStatus, setCreateStatus] = useState(true);
  const [regionName, setRegionName] = useState(true);
  const [createdCode, setCreatedCode] = useState(true);

  const data = {
    selectedGroupCode,
    setSelectedGroupCode,
    disabled,
    setDisabled,
    createStatus,
    setCreateStatus,
    regionName,
    setRegionName,
    createdCode,
    setCreatedCode,
  };

  return <Context.Provider value={data}>{children}</Context.Provider>;
};

export const useSticker = () => useContext(Context);
