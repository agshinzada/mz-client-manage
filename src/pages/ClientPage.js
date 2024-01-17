import { UnorderedListOutlined } from "@ant-design/icons";
import { Button, Checkbox, Spin } from "antd";
import { memo, useEffect, useRef, useState } from "react";
import { toast } from "react-hot-toast";
import ReactSelect from "react-select";
import { useAuth } from "../context/AuthContext";
import MoreModal from "../components/modals/MoreModal";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { encryptStorage } from "../utils/storage";
import {
  fetchDistrictByRegion,
  fetchRoutesByFilter,
  fetchTradeGroupBySearch,
} from "../services/rootService";
import { fetchBrands } from "../services/brandService";
import { fetchCampaigns, fetchDiscounts } from "../services/discountService";
import { fetchGroupTypes } from "../services/groupService";
import { fetchStickerBySearch } from "../services/stickerService";
import { fetchNewClient } from "../services/clientService";
import { fetchVisitDays } from "../services/visitService";
import { fetchDeliveryByFilter } from "../services/deliveryService";
import { fetchBrandCheck } from "../services/toolService";

function ClientPage({
  regions,
  stickers,
  setStickers,
  districts,
  setDistricts,
  tradeGroup,
  setTradeGroup,
}) {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [inputDisabled, setInputDisabled] = useState(true);
  const [loadingCode, setLoadingCode] = useState(false);
  const [loadingContent, setLoadingContent] = useState(false);

  const [inputData, setInputData] = useState({
    brands: [],
    routes: [],
    groupCodes: [],
    delivery: [],
    deliveryMen: [],
    privateCode3: [],
    privateCode4: [],
    privateCode5: [],
    discounts: [],
    visitDays: [],
  });

  const [isOpen, setIsOpen] = useState({
    tradeGroupIsOpen: false,
    deliveryMenIsOpen: false,
    stickerIsOpen: false,
    privateCode3IsOpen: false,
    privateCode4IsOpen: false,
    privateCode5IsOpen: false,
  });

  const [inputState, setInputState] = useState({
    regionId: null,
    codeRegionId: null,
    brandCode: null,
    brandId: null,
    groupType: null,
    stickerObj: null,
  });

  const [client, setClient] = useState({
    clientCode: "",
    clientName: null,
    clientAdress: null,
    clientNum1: "",
    clientNum2: "",
    clientRegionName: null,
    clientDistrictName: null,
    clientRouteId: null,
    clientBrandId: null,
    clientTaxCode: null,
    clientTaxObjectCode: null,
    clientTradeGroupCode: null,
    clientDeliveryCode: null,
    clientPersonName: "",
    clientVisitDayValue: null,
    clientPrivateCode3: null,
    clientPrivateCode4: null,
    clientPrivateCode5: null,
    clientDayLimit: null,
    clientContractDayLimit: null,
    clientDiscountCode: "",
    clientParentRef: 0,
    clientLowLevel1: 0,
    clientLowLevel2: 0,
    clientLowLevel3: 0,
  });

  const administrativeRegionRef = useRef();
  const brandRef = useRef();
  const groupCodeRef = useRef();
  const clientNameRef = useRef();
  const clientAdressRef = useRef();
  const clientNum1Ref = useRef();
  const clientNum2Ref = useRef();
  const clientDistrictNameRef = useRef();
  const clientRouteRef = useRef();
  const clientTaxCodeRef = useRef();
  const clientTaxObjectCodeRef = useRef();
  const clientPersonNameRef = useRef();
  const clientTradeGroupCodeRef = useRef();
  const clientDeliveryCodeRef = useRef();
  const clientStickerCodeRef = useRef();
  const clientPrivateCode3Ref = useRef();
  const clientPrivateCode4Ref = useRef();
  const clientPrivateCode5Ref = useRef();
  const clientDayLimitRef = useRef();
  const clientDiscountRef = useRef();
  const clientContractDayLimitRef = useRef();

  // FECTH DATA METHODS

  const filterDistricts = async (name) => {
    try {
      const data = await fetchDistrictByRegion(name);
      setDistricts(data);
    } catch (error) {
      console.log(error);
      toast.error("Sistem xətası!");
    }
  };

  const getBrands = async () => {
    try {
      const data = await fetchBrands();
      const filterStatus = data.filter((item) => item.STATUS === 0);
      setInputData((prevState) => ({
        ...prevState,
        brands: filterStatus,
      }));
    } catch (error) {
      console.log(error);
      toast.error("Sistem xətası!");
    }
  };

  const getVisitDays = async () => {
    try {
      const data = await fetchVisitDays();
      const filterStatus = data.filter((item) => item.STATUS === 0);
      setInputData((prevState) => ({
        ...prevState,
        visitDays: filterStatus,
      }));
    } catch (error) {
      console.log(error);
      toast.error("Sistem xətası!");
    }
  };

  const getDiscounts = async () => {
    try {
      const data = await fetchDiscounts();
      const filterStatus = data.filter((item) => item.STATUS === 0);
      setInputData((prevState) => ({
        ...prevState,
        discounts: filterStatus,
      }));
    } catch (error) {
      console.log(error);
      toast.error("Sistem xətası!");
    }
  };

  const getGroupCodeTypes = async () => {
    try {
      const data = await fetchGroupTypes();
      const filterStatus = data.filter((item) => item.STATUS === 0);
      setInputData((prevState) => ({
        ...prevState,
        groupCodes: filterStatus,
      }));
    } catch (error) {
      console.log(error);
      toast.error("Sistem xətası!");
    }
  };

  // const getDeliveryMen = async () => {
  //   try {
  //     const data = await fetchDelivery();
  //     setInputData((prevState) => ({
  //       ...prevState,
  //       deliveryMen: data,
  //     }));
  //   } catch (error) {
  //     console.log(error);
  //     toast.error("Sistem xətası!");
  //   }
  // };

  const getPrivateCode = async (param, state) => {
    try {
      const data = await fetchCampaigns(param);
      const filterStatus = data.filter((item) => item.STATUS === 0);
      setInputData((prevState) => ({
        ...prevState,
        [state]: filterStatus,
      }));
    } catch (error) {
      console.log(error);
      toast.error("Sistem xətası!");
    }
  };

  const loadClientRoutes = async () => {
    try {
      const data = await fetchRoutesByFilter(
        inputState.regionId,
        client.clientBrandId
      );
      setInputData((prevState) => ({
        ...prevState,
        routes: data,
      }));
    } catch (error) {
      console.log(error);
      toast.error("Sistem xətası!");
    }
  };

  const loadClientDelivery = async () => {
    try {
      const data = await fetchDeliveryByFilter(inputState.regionId);
      const filterStatus = data.filter((item) => item.STATUS === 0);
      setInputData((prevState) => ({
        ...prevState,
        delivery: filterStatus,
      }));
    } catch (error) {
      console.log(error);
      toast.error("Sistem xətası!");
    }
  };

  const handleRegion = async (region) => {
    try {
      setInputState((prevState) => ({
        ...prevState,
        codeRegionId: region.CODE_ID,
      }));
      setInputState((prevState) => ({
        ...prevState,
        regionId: region.ROOT_ID,
      }));
      setClient((prevState) => ({
        ...prevState,
        clientRegionName: region.NAME,
      }));
      setInputDisabled(true);
    } catch (error) {
      console.log(error);
    }
  };

  const handleBrand = async (e) => {
    try {
      setInputState((prevState) => ({
        ...prevState,
        brandCode: `${e.TYPE}${e.CODE}`,
      }));
      setClient((prevState) => ({
        ...prevState,
        clientBrandId: e.NR,
      }));
      setInputDisabled(true);
    } catch (error) {
      console.log(error);
    }
  };

  // MODAL METHODS

  const closeDeliveryModal = (item) => {
    setClient((prevState) => ({
      ...prevState,
      clientDeliveryCode: item.value,
    }));
    setIsOpen((prevState) => ({
      ...prevState,
      deliveryMenIsOpen: false,
    }));
    clientDeliveryCodeRef.current.setValue(item);
  };

  const closeTradeGroupModal = (item) => {
    setClient((prevState) => ({
      ...prevState,
      clientTradeGroupCode: item.value,
    }));
    setIsOpen((prevState) => ({
      ...prevState,
      tradeGroupIsOpen: false,
    }));
    clientTradeGroupCodeRef.current.setValue(item);
  };

  const closeClientStickerModal = async (item) => {
    console.log(item);
    try {
      setInputState((prevState) => ({
        ...prevState,
        stickerObj: item,
      }));
      setClient((prevState) => ({
        ...prevState,
        clientParentRef: item.LOGICALREF,
        clientLowLevel1: item.LOWLEVELCODES1,
        clientLowLevel2: item.LOWLEVELCODES2,
        clientLowLevel3: item.LOWLEVELCODES3,
        stickerParentRef: item.PARENTCLREF,
      }));
      setIsOpen((prevState) => ({
        ...prevState,
        stickerIsOpen: false,
      }));
      clientStickerCodeRef.current.value = item.label;
      setInputDisabled(true);
    } catch (error) {
      notifyError(error);
    }
  };

  const closePrivateCode3Modal = (item) => {
    setClient((prevState) => ({
      ...prevState,
      clientPrivateCode3: item.value,
    }));
    setIsOpen((prevState) => ({
      ...prevState,
      privateCode3IsOpen: false,
    }));
    clientPrivateCode3Ref.current.setValue(item);
  };

  const closePrivateCode4Modal = (item) => {
    setClient((prevState) => ({
      ...prevState,
      clientPrivateCode4: item.value,
    }));
    setIsOpen((prevState) => ({
      ...prevState,
      privateCode4IsOpen: false,
    }));
    clientPrivateCode4Ref.current.setValue(item);
  };

  const closePrivateCode5Modal = (item) => {
    setClient((prevState) => ({
      ...prevState,
      clientPrivateCode5: item.value,
    }));
    setIsOpen((prevState) => ({
      ...prevState,
      privateCode5IsOpen: false,
    }));
    clientPrivateCode5Ref.current.setValue(item);
  };

  // SEARCH METHODS

  const searchTradeGroup = async (e) => {
    try {
      const data = await fetchTradeGroupBySearch(e.target.value);
      setTradeGroup(data);
    } catch (error) {
      console.log(error);
      toast.error("Sistem xətası!");
    }
  };

  const searchDeliveryMan = async (e) => {
    // try {
    //   const data = await fetchDeliveryBySearch(e.target.value);
    //   setInputData((prevState) => ({
    //     ...prevState,
    //     delivery: data,
    //   }));
    // } catch (error) {
    //   console.log(error);
    //   toast.error("Sistem xətası!");
    // }
  };

  const searchStickerCode = async (e) => {
    try {
      const data = await fetchStickerBySearch(e.target.value);
      setStickers(data);
    } catch (error) {
      console.log(error);
      toast.error("Sistem xətası!");
    }
  };

  // TOOLS METHODS

  const checkedChange = (checkedValues) => {
    const sum = checkedValues.reduce((a, b) => a + b, 0);
    sum === 0
      ? setClient((prevState) => ({
          ...prevState,
          clientVisitDayValue: null,
        }))
      : setClient((prevState) => ({
          ...prevState,
          clientVisitDayValue: sum,
        }));
  };

  function fillClientInputs() {
    clientNameRef.current.value = inputState.stickerObj.DEFINITION;
    clientAdressRef.current.value = inputState.stickerObj.ADRES;
    clientTaxCodeRef.current.value = inputState.stickerObj.TAX;
    clientTaxObjectCodeRef.current.value = inputState.stickerObj.TAXOFFICE;
    clientPersonNameRef.current.value = inputState.stickerObj.CONTACT;
    clientNum1Ref.current.value = inputState.stickerObj.NUM1;
    clientNum2Ref.current.value = inputState.stickerObj.NUM2;
    clientDayLimitRef.current.value = inputState.stickerObj.DAYLIMIT;
    clientDistrictNameRef.current.setValue({
      value: inputState.stickerObj.DISTRICT,
      label: inputState.stickerObj.DISTRICT,
    });
    clientTradeGroupCodeRef.current.setValue({
      value: inputState.stickerObj.TRADINGGRP,
      label: inputState.stickerObj.TRADINGGRP,
    });
    setClient((prevState) => ({
      ...prevState,
      clientName: inputState.stickerObj.DEFINITION,
      clientAdress: inputState.stickerObj.ADRES,
      clientNum1: inputState.stickerObj.NUM1,
      clientNum2: inputState.stickerObj.NUM2,
      clientDistrictName: inputState.stickerObj.DISTRICT,
      clientTradeGroupCode: inputState.stickerObj.TRADINGGRP,
      clientTaxCode: inputState.stickerObj.TAX,
      clientTaxObjectCode: inputState.stickerObj.TAXOFFICE,
      clientPersonName: inputState.stickerObj.CONTACT,
      clientDayLimit: inputState.stickerObj.DAYLIMIT,
    }));
  }

  const notifySuccess = (title) => toast.success(title);
  const notifyError = (title) => toast.error(title);

  // ROOT METHODS

  const handleCode = async () => {
    try {
      if (
        inputState.codeRegionId !== null &&
        inputState.brandCode &&
        inputState.groupType &&
        inputState.stickerObj
      ) {
        setLoadingCode(true);
        setLoadingContent(true);
        const code = `211${inputState.codeRegionId}.${inputState.brandCode}.${inputState.groupType}.`;
        const brandCheck = await fetchBrandCheck({
          LOWLEVELCODES1: inputState.stickerObj.LOWLEVELCODES1,
          LOWLEVELCODES2: inputState.stickerObj.LOWLEVELCODES2,
          PARENTCLREF: inputState.stickerObj.PARENTCLREF,
          brandId: client.clientBrandId,
        });

        if (brandCheck === "true") {
          Swal.fire({
            title: "Kod yaradılsın?",
            text: "Bu brend seçilən stikerdə mövcuddur!",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Bəli",
            cancelButtonText: "Imtina",
          }).then((result) => {
            if (result.isConfirmed) {
              handleCreate(code);
              loadClientRoutes();
              loadClientDelivery();
              filterDistricts(client.clientRegionName);
            } else {
              setLoadingCode(false);
              setLoadingContent(false);
            }
          });
        } else {
          handleCreate(code);
          loadClientRoutes();
          loadClientDelivery();
          filterDistricts(client.clientRegionName);
        }
      } else {
        notifyError("Xanaları doldurun!");
      }
    } catch (error) {
      toast.error("Sistem xətası!");
      console.log(error);
    }
  };

  const handleCreate = async (code) => {
    setTimeout(async () => {
      // const res = await fetchLastClientCode(inputState.stickerObj, user.TOKEN); deactived
      setClient((prevState) => ({
        ...prevState,
        clientCode: code + inputState.stickerObj.label,
      }));
      setLoadingCode(false);
      setLoadingContent(false);
      fillClientInputs();
      setInputDisabled(false);
    }, 1000);
  };

  const submitClient = async (e) => {
    try {
      if (
        client.clientName &&
        client.clientAdress &&
        client.clientRegionName &&
        client.clientDistrictName &&
        client.clientRouteId &&
        client.clientBrandId &&
        client.clientTaxCode &&
        client.clientTradeGroupCode &&
        client.clientDeliveryCode &&
        client.clientDayLimit &&
        client.clientVisitDayValue &&
        client.clientContractDayLimit &&
        client.clientPrivateCode3 &&
        client.clientPrivateCode4 &&
        client.clientPrivateCode5 &&
        user
      ) {
        setLoadingContent(true);
        const res = await fetchNewClient(client, user.REF, user.TOKEN);
        if (res.status === 200 && res.statusText === "OK") {
          setTimeout(() => {
            setLoadingContent(false);
            notifySuccess("Müştəri uğurla əlavə edildi!");
            resetInputs();
            setInputDisabled(true);
          }, 1000);
        } else if (res.status === 515) {
          setLoadingContent(false);
          notifyError(await res.text());
        } else if (res.status === 500) {
          setLoadingContent(false);
          notifyError(`Sistem xətası!`);
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
        notifyError("* olan xanaları doldurun!");
      }
    } catch (error) {
      notifyError("Sistem xətası!");
      console.log(error);
    }
  };

  const resetInputs = () => {
    clientNameRef.current.value = "";
    clientAdressRef.current.value = "";
    clientNum1Ref.current.value = "";
    clientNum2Ref.current.value = "";
    clientDistrictNameRef.current.setValue("");
    clientRouteRef.current.setValue("");
    clientTaxCodeRef.current.value = "";
    clientTaxObjectCodeRef.current.value = "";
    clientPersonNameRef.current.value = "";
    clientTradeGroupCodeRef.current.setValue("");
    clientDeliveryCodeRef.current.setValue("");
    clientPrivateCode3Ref.current.setValue("");
    clientPrivateCode4Ref.current.setValue("");
    clientPrivateCode5Ref.current.setValue("");
    clientDiscountRef.current.setValue("");
    clientDayLimitRef.current.value = "";
    clientContractDayLimitRef.current.value = "";
    setClient((prevState) => ({
      ...prevState,
      clientName: null,
      clientAdress: null,
      clientNum1: "",
      clientNum2: "",
      clientDistrictName: null,
      clientRouteId: null,
      clientTaxCode: null,
      clientTaxObjectCode: null,
      clientTradeGroupCode: null,
      clientDeliveryCode: null,
      clientPersonName: "",
      clientPrivateCode3: null,
      clientPrivateCode4: null,
      clientPrivateCode5: null,
      clientDayLimit: null,
      clientDiscountCode: "",
      clientContractDayLimit: null,
    }));
  };

  useEffect(() => {
    getBrands();
    getGroupCodeTypes();
  }, []);

  useEffect(() => {
    if (loadingContent) {
      // getDeliveryMen();
      getPrivateCode(3, "privateCode3");
      getPrivateCode(4, "privateCode4");
      getPrivateCode(5, "privateCode5");
      getDiscounts();
      getVisitDays();
    }
  }, [loadingContent]);

  return (
    <>
      <div className="flex gap-5  items-center">
        <div className="flex flex-col">
          <label className="dark:text-white">Bölgə</label>
          <ReactSelect
            placeholder="Seç"
            options={regions}
            getOptionLabel={(option) => option.NAME}
            getOptionValue={(option) => option.ROOT_ID}
            className="w-56"
            onChange={(e) => handleRegion(e)}
            ref={administrativeRegionRef}
          />
        </div>

        <div className="flex flex-col">
          <label className="dark:text-white">Brend</label>
          <ReactSelect
            placeholder="Seç"
            options={inputData.brands}
            getOptionLabel={(option) => option.NAME}
            getOptionValue={(option) => option.NR}
            className="w-56"
            onChange={(e) => handleBrand(e)}
            ref={brandRef}
          />
        </div>
        <div className="flex flex-col">
          <label className="dark:text-white">Müştəri kateqoriyası</label>
          <ReactSelect
            placeholder="Seç"
            options={inputData.groupCodes}
            getOptionLabel={(option) => option.NAME}
            getOptionValue={(option) => option.ABBR}
            className="w-56"
            onChange={(e) => {
              setInputState((prevState) => ({
                ...prevState,
                groupType: e.ABBR,
              }));
              setInputDisabled(true);
            }}
            ref={groupCodeRef}
          />
        </div>
        <div className="flex flex-col">
          <label className="dark:text-white">Stiker kodu</label>
          <div className="flex relative">
            <input
              type="text"
              className=" required:focus:ring-red-600 required:focus:border-red-600 block w-56 p-2.5 text-gray-900 border focus:outline-none border-gray-300 rounded-sm bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              disabled
              ref={clientStickerCodeRef}
              required
            />
            <Button
              icon={<UnorderedListOutlined />}
              className="absolute right-0 h-full rounded-none bg-white disabled:bg-gray-100"
              onClick={() =>
                setIsOpen((prevState) => ({
                  ...prevState,
                  stickerIsOpen: true,
                }))
              }
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
      </div>
      <div className="p-3 my-8 border dark:text-slate-200 bg-white border-slate-200 dark:border-slate-600 dark:bg-gray-800 rounded-lg mx-auto w-[25rem] h-10 flex justify-center items-center">
        <Spin spinning={loadingCode}>
          <span className="font-bold">{client.clientCode}</span>
        </Spin>
      </div>
      <Spin size="large" spinning={loadingContent}>
        <div className="flex flex-col gap-4">
          <div className="flex gap-4">
            <div className="flex flex-col">
              <label className="dark:text-white">
                Müştəri adı <span className="text-red-800">*</span>
              </label>
              <input
                type="text"
                className=" required:focus:ring-red-600 required:focus:border-red-600 block w-56 p-2.5 text-gray-900 border focus:outline-none border-gray-300 rounded-md bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                disabled={inputDisabled}
                onChange={(e) =>
                  setClient((prevState) => ({
                    ...prevState,
                    clientName: e.target.value.trim(),
                  }))
                }
                ref={clientNameRef}
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
                className="required:focus:ring-red-600 required:focus:border-red-600 block w-56 p-2.5 text-gray-900 border focus:outline-none border-gray-300 rounded-md bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                disabled={inputDisabled}
                onChange={(e) =>
                  setClient((prevState) => ({
                    ...prevState,
                    clientAdress: e.target.value.trim(),
                  }))
                }
                ref={clientAdressRef}
                maxLength={201}
                required
              />
            </div>
            <div className="flex flex-col">
              <label className="dark:text-white">Telefon nömrəsi 1</label>
              <input
                type="text"
                className="block w-56 p-2.5 text-gray-900 border focus:outline-none border-gray-300 rounded-md bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                disabled={inputDisabled}
                onChange={(e) =>
                  setClient((prevState) => ({
                    ...prevState,
                    clientNum1: e.target.value.trim(),
                  }))
                }
                ref={clientNum1Ref}
                maxLength={51}
                required
              />
            </div>
            <div className="flex flex-col">
              <label className="dark:text-white">Telefon nömrəsi 2</label>
              <input
                type="text"
                className="block w-56 p-2.5 text-gray-900 border focus:outline-none border-gray-300 rounded-md bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                disabled={inputDisabled}
                onChange={(e) =>
                  setClient((prevState) => ({
                    ...prevState,
                    clientNum2: e.target.value.trim(),
                  }))
                }
                maxLength={51}
                ref={clientNum2Ref}
              />
            </div>
          </div>
          <div className="flex gap-4 ">
            <div className="flex flex-col">
              <label className="dark:text-white">
                VÖEN <span className="text-red-800">*</span>
              </label>
              <input
                type="text"
                className="required:focus:ring-red-600 required:focus:border-red-600 block w-56 p-2.5 text-gray-900 border focus:outline-none border-gray-300 rounded-md bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                disabled={inputDisabled}
                onChange={(e) =>
                  setClient((prevState) => ({
                    ...prevState,
                    clientTaxCode: e.target.value.trim(),
                  }))
                }
                ref={clientTaxCodeRef}
                maxLength={11}
                required
              />
            </div>
            <div className="flex flex-col">
              <label className="dark:text-white">
                Vergi obyekt kodu <span className="text-red-800"></span>
              </label>
              <input
                type="text"
                className="required:focus:ring-red-600 required:focus:border-red-600 block w-56 p-2.5 text-gray-900 border focus:outline-none border-gray-300 rounded-md bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                disabled={inputDisabled}
                onChange={(e) =>
                  setClient((prevState) => ({
                    ...prevState,
                    clientTaxObjectCode: e.target.value.trim(),
                  }))
                }
                ref={clientTaxObjectCodeRef}
                maxLength={10}
                required
              />
            </div>
            <div className="flex flex-col">
              <label className="dark:text-white">Əlaqədar şəxs</label>
              <input
                type="text"
                className="block w-56 p-2.5 text-gray-900 border focus:outline-none border-gray-300 rounded-md bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                disabled={inputDisabled}
                onChange={(e) =>
                  setClient((prevState) => ({
                    ...prevState,
                    clientPersonName: e.target.value.trim(),
                  }))
                }
                ref={clientPersonNameRef}
                maxLength={51}
              />
            </div>
          </div>
          <div className="flex gap-4 ">
            <div className="flex flex-col">
              <label className="dark:text-white">
                Gün limiti <span className="text-red-800">*</span>
              </label>
              <input
                type="number"
                className="required:focus:ring-red-600 required:focus:border-red-600 block w-56 p-2.5 text-gray-900 border focus:outline-none border-gray-300 rounded-md bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                disabled={inputDisabled}
                onChange={(e) =>
                  setClient((prevState) => ({
                    ...prevState,
                    clientDayLimit: e.target.value.trim(),
                  }))
                }
                ref={clientDayLimitRef}
                required
              />
            </div>
            <div className="flex flex-col">
              <label className="dark:text-white">
                Müqavilə üzrə gün limiti <span className="text-red-800">*</span>
              </label>
              <input
                type="number"
                className="required:focus:ring-red-600 required:focus:border-red-600 block w-56 p-2.5 text-gray-900 border focus:outline-none border-gray-300 rounded-md bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                disabled={inputDisabled}
                onChange={(e) =>
                  setClient((prevState) => ({
                    ...prevState,
                    clientContractDayLimit: e.target.value.trim(),
                  }))
                }
                ref={clientContractDayLimitRef}
                required
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
                    setClient((prevState) => ({
                      ...prevState,
                      clientTradeGroupCode: e.value,
                    }))
                  }
                  isDisabled={inputDisabled}
                  ref={clientTradeGroupCodeRef}
                  required
                />

                <Button
                  icon={<UnorderedListOutlined />}
                  className="absolute right-0 h-full rounded-none bg-white disabled:bg-gray-100"
                  disabled={inputDisabled}
                  onClick={() =>
                    setIsOpen((prevState) => ({
                      ...prevState,
                      tradeGroupIsOpen: true,
                    }))
                  }
                />
              </div>
            </div>
            <div className="flex flex-col">
              <label className="dark:text-white">
                Təslimatçı kodu <span className="text-red-800">*</span>
              </label>
              <div className="flex relative">
                <ReactSelect
                  placeholder="Seç"
                  options={inputData.delivery}
                  className="w-56"
                  onChange={(e) =>
                    setClient((prevState) => ({
                      ...prevState,
                      clientDeliveryCode: e.value,
                    }))
                  }
                  isDisabled={inputDisabled}
                  ref={clientDeliveryCodeRef}
                  required
                />

                <Button
                  icon={<UnorderedListOutlined />}
                  className="absolute right-0 h-full rounded-none bg-white disabled:bg-gray-100"
                  disabled={inputDisabled}
                  onClick={() =>
                    setIsOpen((prevState) => ({
                      ...prevState,
                      deliveryMenIsOpen: true,
                    }))
                  }
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
                  setClient((prevState) => ({
                    ...prevState,
                    clientDistrictName: e.value,
                  }))
                }
                isDisabled={inputDisabled}
                ref={clientDistrictNameRef}
                required
              />
            </div>
            <div className="flex flex-col">
              <label className="dark:text-white">
                Rut <span className="text-red-800">*</span>
              </label>
              <ReactSelect
                placeholder="Seç"
                options={inputData.routes}
                className="w-56"
                onChange={(e) =>
                  setClient((prevState) => ({
                    ...prevState,
                    clientRouteId: e.value,
                  }))
                }
                isDisabled={inputDisabled}
                ref={clientRouteRef}
                required
              />
            </div>
          </div>
          <div>
            <div className="flex flex-col gap-2">
              <label className="dark:text-white">
                Vizit günü <span className="text-red-800">*</span>
              </label>
              <Checkbox.Group
                options={inputData.visitDays}
                onChange={checkedChange}
                disabled={inputDisabled}
                required
              />
            </div>
          </div>
          <div className="flex gap-4">
            <div className="flex flex-col">
              <label className="dark:text-white">Endirim</label>
              <ReactSelect
                placeholder="Seç"
                options={inputData.discounts}
                className="w-56"
                onChange={(e) =>
                  setClient((prevState) => ({
                    ...prevState,
                    clientDiscountCode: e.value,
                  }))
                }
                isDisabled={inputDisabled}
                ref={clientDiscountRef}
                required
              />
            </div>
            <div className="flex flex-col">
              <label className="dark:text-white">
                Şəbəkə adı <small>(özəl kod 3)</small>
                <span className="text-red-800">*</span>
              </label>
              <div className="flex relative">
                <ReactSelect
                  placeholder="Seç"
                  options={inputData.privateCode3}
                  className="w-56"
                  onChange={(e) =>
                    setClient((prevState) => ({
                      ...prevState,
                      clientPrivateCode3: e.value,
                    }))
                  }
                  isDisabled={inputDisabled}
                  ref={clientPrivateCode3Ref}
                />
                <Button
                  icon={<UnorderedListOutlined />}
                  className="absolute right-0 h-full rounded-none bg-white disabled:bg-gray-100"
                  disabled={inputDisabled}
                  onClick={() =>
                    setIsOpen((prevState) => ({
                      ...prevState,
                      privateCode3IsOpen: true,
                    }))
                  }
                />
              </div>
            </div>
            <div className="flex flex-col">
              <label className="dark:text-white">
                Kateqoriya <small>(özəl kod 4)</small>
                <span className="text-red-800">*</span>
              </label>
              <div className="flex relative">
                <ReactSelect
                  placeholder="Seç"
                  options={inputData.privateCode4}
                  className="w-56"
                  onChange={(e) =>
                    setClient((prevState) => ({
                      ...prevState,
                      clientPrivateCode4: e.value,
                    }))
                  }
                  isDisabled={inputDisabled}
                  ref={clientPrivateCode4Ref}
                  required
                />
                <Button
                  icon={<UnorderedListOutlined />}
                  className="absolute right-0 h-full rounded-none bg-white disabled:bg-gray-100"
                  disabled={inputDisabled}
                  onClick={() =>
                    setIsOpen((prevState) => ({
                      ...prevState,
                      privateCode4IsOpen: true,
                    }))
                  }
                />
              </div>
            </div>
            <div className="flex flex-col">
              <label className="dark:text-white">
                Kateqoriya <small>(özəl kod 5)</small>
                <span className="text-red-800">*</span>
              </label>
              <div className="flex relative">
                <ReactSelect
                  placeholder="Seç"
                  options={inputData.privateCode5}
                  className="w-56"
                  onChange={(e) =>
                    setClient((prevState) => ({
                      ...prevState,
                      clientPrivateCode5: e.value,
                    }))
                  }
                  isDisabled={inputDisabled}
                  ref={clientPrivateCode5Ref}
                  required
                />
                <Button
                  icon={<UnorderedListOutlined />}
                  className="absolute right-0 h-full rounded-none bg-white disabled:bg-gray-100"
                  disabled={inputDisabled}
                  onClick={() =>
                    setIsOpen((prevState) => ({
                      ...prevState,
                      privateCode5IsOpen: true,
                    }))
                  }
                />
              </div>
            </div>
          </div>

          <div className="flex  gap-2">
            <button
              type="submit"
              className="text-white disabled:bg-gray-400  bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2 mt-6 w-full dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
              onClick={submitClient}
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
        title={"Stikerlər"}
        isOpen={isOpen.stickerIsOpen}
        setIsOpen={setIsOpen}
        data={stickers}
        searchCode={{ active: true, function: searchStickerCode }}
        selectItem={closeClientStickerModal}
        tax={true}
      />
      <MoreModal
        title={"Müştəri kanalı"}
        isOpen={isOpen.tradeGroupIsOpen}
        setIsOpen={setIsOpen}
        data={tradeGroup}
        searchCode={{ active: true, function: searchTradeGroup }}
        selectItem={closeTradeGroupModal}
      />
      <MoreModal
        title={"Təslimatçılar"}
        isOpen={isOpen.deliveryMenIsOpen}
        setIsOpen={setIsOpen}
        data={inputData.delivery}
        searchCode={{ active: true, function: searchDeliveryMan }}
        selectItem={closeDeliveryModal}
      />
      <MoreModal
        title={"Özəl kod 3"}
        isOpen={isOpen.privateCode3IsOpen}
        setIsOpen={setIsOpen}
        data={inputData.privateCode3}
        searchCode={{ active: false }}
        selectItem={closePrivateCode3Modal}
      />
      <MoreModal
        title={"Özəl kod 4"}
        isOpen={isOpen.privateCode4IsOpen}
        setIsOpen={setIsOpen}
        data={inputData.privateCode4}
        searchCode={{ active: false }}
        selectItem={closePrivateCode4Modal}
      />
      <MoreModal
        title={"Özəl kod 5"}
        isOpen={isOpen.privateCode5IsOpen}
        setIsOpen={setIsOpen}
        data={inputData.privateCode5}
        searchCode={{ active: false }}
        selectItem={closePrivateCode5Modal}
      />
    </>
  );
}

export default memo(ClientPage);
