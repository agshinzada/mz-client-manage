import { memo, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import ClientPage from "./pages/ClientPage";
import StickerPage from "./pages/StickerPage";

import { fetchTradeGroups } from "./services/rootService";
import { fetchRegions } from "./services/regionService";
import { useGlobal } from "./context/GlobalContext";
import { ClientProvider } from "./context/ClientContext";
import { StickerProvider } from "./context/StickerContext";
import { fetchGroupCodes } from "./services/groupService";
import Layout from "./layout/Layout";

function App() {
  const { setTradeGroup, setRegions, setGroupCodes } = useGlobal();

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

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route
          index
          element={
            <ClientProvider>
              <ClientPage />
            </ClientProvider>
          }
        />
        <Route
          path="sticker"
          element={
            <StickerProvider>
              <StickerPage />
            </StickerProvider>
          }
        />
      </Route>
    </Routes>
  );
}

export default memo(App);
