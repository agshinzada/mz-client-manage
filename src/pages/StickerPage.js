import { CloseOutlined, UnorderedListOutlined } from "@ant-design/icons";
import { Button, Spin } from "antd";
import { memo, useEffect, useRef, useState } from "react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import ReactSelect from "react-select";
import { useAuth } from "../context/AuthContext";
import { encryptStorage } from "../utils/storage";
import MoreModal from "../components/modals/MoreModal";
import { fetchTradeGroupBySearch } from "../services/rootService";
import { fetchDistrictByRegion } from "../services/rootService";
import {
  fetchGroupCodes,
  fetchGroupCodesBySearch,
} from "../services/groupService";
import { fetchNewSticker } from "../services/stickerService";
import { fetchLastStickerCode } from "../services/toolService";

function StickerPage({
  regions,
  setDistricts,
  districts,
  tradeGroup,
  setTradeGroup,
}) {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [stickerGroupCodeIsOpen, setStickerGroupCodeIsOpen] = useState(false);
  const [tradeGroupIsOpen, setTradeGroupIsOpen] = useState(false);
  const [inputDisabled, setInputDisabled] = useState(true);
  const [loadingCode, setLoadingCode] = useState(false);
  const [loadingContent, setLoadingContent] = useState(false);

  const [regionId, setRegionId] = useState(null);
  const [groupCodes, setGroupCodes] = useState([]);

  const [sticker, setSticker] = useState({
    stickerRegionName: null,
    stickerCode: "",
    stickerName: null,
    stickerAdress: null,
    stickerNum1: "",
    stickerNum2: "",
    stickerTaxCode: null,
    stickerTaxObjectCode: null,
    stickerContactName: "",
    stickerTradeGroupCode: null,
    stickerDistrictName: null,
    stickerDayLimit: null,
    stickerParentRef: 0,
    stickerLowLevel1: 0,
    stickerLowLevel2: 0,
    stickerLowLevel3: 0,
  });

  const stickerGroupCodeRef = useRef();
  const tradeGroupCodeRef = useRef();
  const stickerAdressRef = useRef();
  const stickerNameRef = useRef();
  const stickerNum1Ref = useRef();
  const stickerNum2Ref = useRef();
  const stickerContactNameRef = useRef();
  const stickerTaxCodeRef = useRef();
  const stickerTaxObjectCodeRef = useRef();
  const stickerDistrictNameRef = useRef();
  const stickerDayLimitRef = useRef();

  const handleRegion = async (region) => {
    try {
      setRegionId(region.CODE_ID);
      setSticker((prevState) => ({
        ...prevState,
        stickerRegionName: region.NAME,
      }));
      setInputDisabled(true);
    } catch (error) {
      toast.error("Sistem xətası!");
      console.log(error);
    }
  };

  const getGroupCodes = async () => {
    try {
      const data = await fetchGroupCodes();
      setGroupCodes(data);
    } catch (error) {
      console.log(error);
      toast.error("Sistem xətası!");
    }
  };

  const filterDistricts = async (name) => {
    try {
      const data = await fetchDistrictByRegion(name);
      setDistricts(data);
    } catch (error) {
      toast.error("Sistem xətası!");
      console.log(error);
    }
  };

  const searchGroupCode = async (e) => {
    try {
      const data = await fetchGroupCodesBySearch(e.target.value);
      setGroupCodes(data);
    } catch (error) {
      toast.error("Sistem xətası!");
      console.log(error);
    }
  };

  const searchTradeGroup = async (e) => {
    try {
      const data = await fetchTradeGroupBySearch(e.target.value);
      setTradeGroup(data);
    } catch (error) {
      toast.error("Sistem xətası!");
      console.log(error);
    }
  };

  const closeTradeGroupModal = (code) => {
    setSticker((prevState) => ({
      ...prevState,
      stickerTradeGroupCode: code.value,
    }));
    tradeGroupCodeRef.current.setValue(code);
    setTradeGroupIsOpen(false);
  };

  const closeGroupCodeModal = async (sticker) => {
    try {
      setSticker((prevState) => ({
        ...prevState,
        stickerParentRef: sticker.LOGICALREF,
        stickerLowLevel1: sticker.LOWLEVELCODES1,
        stickerLowLevel3: 0,
      }));
      stickerGroupCodeRef.current.value = sticker.label;
      setStickerGroupCodeIsOpen(false);
      setInputDisabled(true);
    } catch (error) {
      toast.error("Sistem xətası!");
      console.log(error);
    }
  };

  const handleCode = async () => {
    try {
      if (regionId !== null) {
        setLoadingCode(true);
        setLoadingContent(true);
        const res = await fetchLastStickerCode(user.TOKEN);
        if (res.status === 200 && res.statusText === "OK") {
          const { code } = await res.json();
          setSticker((prevState) => ({
            ...prevState,
            stickerCode: code,
          }));

          setLoadingCode(false);
          setLoadingContent(false);
          setInputDisabled(false);
        } else if (res.status === 401) {
          toast.dismiss();
          toast.error("Token expired!");
          setTimeout(() => {
            encryptStorage.clear();
            navigate("/auth/login");
          }, 1000);
        } else if (res.status === 500) {
          toast.error("Sistem xətası!");
          console.log(await res.json());
        }
      } else {
        toast.error("Bölgə seçilməyib!");
      }
    } catch (error) {
      toast.error("Sistem xətası!");
      console.log(error);
    }
  };

  const submitSticker = async () => {
    console.log(sticker);
    try {
      if (
        sticker.stickerCode &&
        sticker.stickerName &&
        sticker.stickerAdress &&
        sticker.stickerTaxCode &&
        sticker.stickerTradeGroupCode &&
        sticker.stickerDistrictName &&
        sticker.stickerRegionName &&
        sticker.stickerDayLimit
      ) {
        setLoadingContent(true);
        const res = await fetchNewSticker(sticker, user.REF, user.TOKEN);
        if (res.status === 200 && res.statusText === "OK") {
          setLoadingContent(false);
          toast.success("Sticker uğurla əlavə edildi!");
          resetInputs();
          setInputDisabled(true);
        } else if (res.status === 515) {
          setLoadingContent(false);
          toast.error(await res.text());
        } else if (res.status === 500) {
          setLoadingContent(false);
          toast.error(`Sistem xətası!`);
          console.log(await res.json());
        } else if (res.status === 401) {
          setLoadingContent(false);
          toast.error("Token expired!");
          setTimeout(() => {
            encryptStorage.clear();
            navigate("/auth/login");
          }, 1000);
        }
      } else {
        toast.error("* olan xanaları doldurun!");
      }
    } catch (error) {
      toast.error(`Sistem xətası`);
      console.log(error);
    }
  };

  function resetInputs() {
    stickerNameRef.current.value = "";
    stickerAdressRef.current.value = "";
    stickerNum1Ref.current.value = "";
    stickerNum2Ref.current.value = "";
    stickerTaxCodeRef.current.value = "";
    stickerTaxObjectCodeRef.current.value = "";
    stickerContactNameRef.current.value = "";
    stickerDayLimitRef.current.value = "";
    tradeGroupCodeRef.current.setValue("");
    stickerDistrictNameRef.current.setValue("");

    setSticker((prevState) => ({
      ...prevState,
      stickerName: null,
      stickerAdress: null,
      stickerNum1: "",
      stickerNum2: "",
      stickerTaxCode: null,
      stickerTaxObjectCode: null,
      stickerContactName: "",
      stickerTradeGroupCode: null,
      stickerDistrictName: null,
      stickerDayLimit: null,
    }));
  }

  useEffect(() => {
    getGroupCodes();
  }, []);

  useEffect(() => {
    if (loadingContent) {
      filterDistricts(sticker.stickerRegionName);
      getGroupCodes();
    }
  }, [loadingContent]);

  return (
    <div className="flex flex-col gap-16">
      <div className="flex gap-5 items-center">
        <div className="flex flex-col">
          <label className="dark:text-white">Bölgə</label>
          <ReactSelect
            placeholder="Seç"
            options={regions}
            getOptionLabel={(option) => option.NAME}
            getOptionValue={(option) => option.ROOT_ID}
            className="w-56"
            onChange={(e) => handleRegion(e)}
          />
        </div>
        <div className="flex flex-col relative">
          <label className="dark:text-white">Qrup kodu</label>
          <div className="flex relative">
            <input
              type="text"
              className=" required:focus:ring-red-600 required:focus:border-red-600 block w-56 p-2.5 text-gray-900 border focus:outline-none border-gray-300 rounded-sm bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              disabled
              ref={stickerGroupCodeRef}
              required
            />
            <Button
              icon={<UnorderedListOutlined />}
              className="absolute right-0 h-full rounded-none bg-white disabled:bg-gray-100"
              onClick={() => setStickerGroupCodeIsOpen(true)}
            />
            <CloseOutlined
              className="absolute right-9 bottom-2.5 text-gray-500 cursor-pointer"
              onClick={() => {
                stickerGroupCodeRef.current.value = "";
                setSticker((prevState) => ({
                  ...prevState,
                  stickerParentRef: 0,
                  stickerLowLevel2: 0,
                  stickerLowLevel3: 0,
                }));
                setInputDisabled(true);
              }}
            />
          </div>
        </div>
        <button
          type="button"
          className="focus:outline-none self-end w-fit text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2  dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
          onClick={() => handleCode()}
        >
          Yarat
        </button>
        <div className="p-3 border self-end dark:text-slate-200 bg-white border-slate-200 dark:border-slate-600 dark:bg-gray-800 rounded-md mx-auto w-[25rem] h-10 flex justify-center items-center">
          <Spin spinning={loadingCode}>
            <span className="font-bold">{sticker.stickerCode}</span>
          </Spin>
        </div>
      </div>
      <Spin spinning={loadingContent}>
        <div className="flex flex-col gap-4">
          <div className="flex gap-4">
            <div className="flex flex-col">
              <label className="dark:text-white">
                Müştəri adı <span className="text-red-800">*</span>
              </label>
              <input
                type="text"
                className=" required:focus:ring-red-600 required:focus:border-red-600 block w-56 p-2 text-gray-900 border focus:outline-none border-gray-300 rounded-md bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                disabled={inputDisabled}
                onChange={(e) =>
                  setSticker((prevState) => ({
                    ...prevState,
                    stickerName: e.target.value.trim(),
                  }))
                }
                ref={stickerNameRef}
                maxLength={201}
                required
              />
            </div>
            <div className="flex flex-col">
              <label className="dark:text-white">
                Ünvan <span className="text-red-800">*</span>
              </label>
              <input
                type="text"
                className="required:focus:ring-red-600 required:focus:border-red-600 block w-56 p-2 text-gray-900 border focus:outline-none border-gray-300 rounded-md bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                disabled={inputDisabled}
                onChange={(e) =>
                  setSticker((prevState) => ({
                    ...prevState,
                    stickerAdress: e.target.value.trim(),
                  }))
                }
                ref={stickerAdressRef}
                maxLength={201}
                required
              />
            </div>
            <div className="flex flex-col">
              <label className="dark:text-white">Telefon nömrəsi 1</label>
              <input
                type="text"
                className="block w-56 p-2 text-gray-900 border focus:outline-none border-gray-300 rounded-md bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                disabled={inputDisabled}
                onChange={(e) =>
                  setSticker((prevState) => ({
                    ...prevState,
                    stickerNum1: e.target.value.trim(),
                  }))
                }
                maxLength={51}
                ref={stickerNum1Ref}
                required
              />
            </div>
            <div className="flex flex-col">
              <label className="dark:text-white">Telefon nömrəsi 2</label>
              <input
                type="text"
                className="block w-56 p-2 text-gray-900 border focus:outline-none border-gray-300 rounded-md bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                disabled={inputDisabled}
                onChange={(e) =>
                  setSticker((prevState) => ({
                    ...prevState,
                    stickerNum2: e.target.value.trim(),
                  }))
                }
                maxLength={51}
                ref={stickerNum2Ref}
              />
            </div>
          </div>
          <div className="flex gap-4">
            <div className="flex flex-col">
              <label className="dark:text-white">
                VÖEN <span className="text-red-800">*</span>
              </label>
              <input
                type="text"
                className="required:focus:ring-red-600 required:focus:border-red-600 block w-56 p-2 text-gray-900 border focus:outline-none border-gray-300 rounded-md bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                disabled={inputDisabled}
                onChange={(e) =>
                  setSticker((prevState) => ({
                    ...prevState,
                    stickerTaxCode: e.target.value.trim(),
                  }))
                }
                ref={stickerTaxCodeRef}
                maxLength={11}
                required
              />
            </div>
            <div className="flex flex-col">
              <label className="dark:text-white">Vergi obyekt kodu</label>
              <input
                type="text"
                className="required:focus:ring-red-600 required:focus:border-red-600 block w-56 p-2 text-gray-900 border focus:outline-none border-gray-300 rounded-md bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                disabled={inputDisabled}
                onChange={(e) =>
                  setSticker((prevState) => ({
                    ...prevState,
                    stickerTaxObjectCode: e.target.value.trim(),
                  }))
                }
                ref={stickerTaxObjectCodeRef}
                maxLength={10}
                required
              />
            </div>
            <div className="flex flex-col">
              <label className="dark:text-white">
                Gün limiti <span className="text-red-800">*</span>
              </label>
              <input
                type="number"
                className="required:focus:ring-red-600 required:focus:border-red-600 block w-56 p-2.5 text-gray-900 border focus:outline-none border-gray-300 rounded-md bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                disabled={inputDisabled}
                onChange={(e) =>
                  setSticker((prevState) => ({
                    ...prevState,
                    stickerDayLimit: e.target.value,
                  }))
                }
                ref={stickerDayLimitRef}
                required
              />
            </div>
            <div className="flex flex-col">
              <label className="dark:text-white">Əlaqədar şəxs</label>
              <input
                type="text"
                className="block w-56 p-2 text-gray-900 border focus:outline-none border-gray-300 rounded-md bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                disabled={inputDisabled}
                onChange={(e) =>
                  setSticker((prevState) => ({
                    ...prevState,
                    stickerContactName: e.target.value.trim(),
                  }))
                }
                maxLength={51}
                ref={stickerContactNameRef}
              />
            </div>
          </div>
          <div className="flex gap-4">
            <div className="flex flex-col">
              <label className="dark:text-white">
                Kanal kodu <span className="text-red-800">*</span>
              </label>
              <div className="flex relative">
                <ReactSelect
                  placeholder="Seç"
                  options={tradeGroup}
                  className="w-56"
                  onChange={(e) =>
                    setSticker((prevState) => ({
                      ...prevState,
                      stickerTradeGroupCode: e.value,
                    }))
                  }
                  isDisabled={inputDisabled}
                  ref={tradeGroupCodeRef}
                  required
                />
                <Button
                  icon={<UnorderedListOutlined />}
                  className="absolute right-0 h-full rounded-none bg-white disabled:bg-gray-100"
                  disabled={inputDisabled}
                  onClick={() => setTradeGroupIsOpen(true)}
                />
              </div>
            </div>
            <div className="flex flex-col">
              <label className="dark:text-white">
                Rayon <span className="text-red-800">*</span>
              </label>
              <ReactSelect
                placeholder="Seç"
                options={districts}
                className="w-56"
                onChange={(e) =>
                  setSticker((prevState) => ({
                    ...prevState,
                    stickerDistrictName: e.value,
                  }))
                }
                isDisabled={inputDisabled}
                ref={stickerDistrictNameRef}
                required
              />
            </div>
          </div>

          <div className="flex  gap-2">
            <button
              type="submit"
              className="text-white disabled:bg-gray-400  bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2 mt-6 w-full dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
              onClick={submitSticker}
              disabled={inputDisabled}
            >
              Əlavə et
            </button>
            <button
              type="button"
              className="text-white self-end disabled:bg-gray-400  bg-gray-700 hover:bg-gray-800 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2 w-40 dark:bg-gray-600 dark:hover:bg-gray-700 focus:outline-none dark:focus:ring-gray-800"
              onClick={resetInputs}
              disabled={inputDisabled}
            >
              Sıfırla
            </button>
          </div>
        </div>
      </Spin>

      <MoreModal
        title={"G-kodlar"}
        isOpen={stickerGroupCodeIsOpen}
        setIsOpen={setStickerGroupCodeIsOpen}
        data={groupCodes}
        searchCode={{ active: true, function: searchGroupCode }}
        selectItem={closeGroupCodeModal}
      />
      <MoreModal
        title={"Müştəri kanalı"}
        isOpen={tradeGroupIsOpen}
        setIsOpen={setTradeGroupIsOpen}
        data={tradeGroup}
        searchCode={{ active: true, function: searchTradeGroup }}
        selectItem={closeTradeGroupModal}
      />
    </div>
  );
}

export default memo(StickerPage);
