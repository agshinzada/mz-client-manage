import { Checkbox, Modal } from "antd";
import Swal from "sweetalert2";
import { fetchChangeClientStatus } from "../../services/clientService";
import ReactSelect from "react-select";
import toast from "react-hot-toast";
import { useEffect, useRef, useState } from "react";
import { fetchVisitDays } from "../../services/visitService";
import { fetchCampaigns, fetchDiscounts } from "../../services/discountService";
import { fetchDelivery } from "../../services/deliveryService";
import { useAuth } from "../../context/AuthContext";

function UpdateClientModal({ isOpen, setIsOpen, client }) {
  const [inputData, setInputData] = useState({
    delivery: [],
    privateCode3: [],
    privateCode4: [],
    privateCode5: [],
    discounts: [],
    visitDays: [],
  });

  const [data, setData] = useState({
    logicalRef: null,
    taxCode: null,
    visitCode: null,
    discountCode: null,
    deliveryCode: null,
    privateCode3: null,
    privateCode4: null,
    privateCode5: null,
  });

  const taxRef = useRef();
  const discountRef = useRef();
  const deliveryRef = useRef();
  const privateCode3Ref = useRef();
  const privateCode4Ref = useRef();
  const privateCode5Ref = useRef();
  const { user } = useAuth();

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

  const loadClientDelivery = async () => {
    try {
      const data = await fetchDelivery();
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

  const checkedChange = (checkedValues) => {
    const sum = checkedValues.reduce((a, b) => a + b, 0);
    sum === 0
      ? setData((prevState) => ({
          ...prevState,
          visitCode: null,
        }))
      : setData((prevState) => ({
          ...prevState,
          visitCode: sum,
        }));
  };

  function closeModal() {
    taxRef.current.value = "";
    discountRef.current.setValue("");
    deliveryRef.current.setValue("");
    privateCode3Ref.current.setValue("");
    privateCode4Ref.current.setValue("");
    privateCode5Ref.current.setValue("");
    setData({
      taxCode: null,
      visitCode: null,
      discountCode: null,
      deliveryCode: null,
      privateCode3: null,
      privateCode4: null,
      privateCode5: null,
    });
    setIsOpen(false);
  }

  function handleUpdate(e) {
    e.preventDefault();
    console.log(data);
    if (
      data.taxCode &&
      data.visitCode &&
      data.discountCode &&
      data.deliveryCode &&
      data.privateCode3 &&
      data.privateCode4 &&
      data.privateCode5
    ) {
      Swal.fire({
        title: "Müştəri yenidən aktiv ediləcək",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Aktiv et",
        cancelButtonText: "İmtina",
      }).then(async (result) => {
        if (result.isConfirmed) {
          const res = await fetchChangeClientStatus(data, user.REF, user.TOKEN);
          if (res.status === 200 && res.statusText === "OK") {
            Swal.fire("Aktiv edildi!", "", "success");
            closeModal();
          } else {
            Swal.fire("Xəta", "Sistem xətası baş verdi!", "error");
          }
        }
      });
    } else {
      toast.error("Xanaları doldurun!");
    }
  }

  useEffect(() => {
    getPrivateCode(3, "privateCode3");
    getPrivateCode(4, "privateCode4");
    getPrivateCode(5, "privateCode5");
    getDiscounts();
    getVisitDays();
    loadClientDelivery();
    setData((prevState) => ({
      ...prevState,
      logicalRef: client?.LOGICALREF,
    }));
    console.log(client);
  }, [client]);

  return (
    <div>
      <Modal
        open={isOpen}
        onCancel={closeModal}
        centered
        maskClosable={false}
        footer={false}
        title={"Müştəri düzəlişi"}
      >
        <form onSubmit={handleUpdate} className="flex flex-col gap-4">
          <div className="flex flex-col gap-3">
            <div className="flex flex-col mb-3">
              <label className="dark:text-white">VÖEN</label>
              <input
                type="text"
                className="w-full p-2.5 text-gray-900 border focus:outline-none border-gray-300 rounded-md bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                name={"client-tax"}
                maxLength={16}
                onChange={(e) => {
                  setData((prevState) => ({
                    ...prevState,
                    taxCode: e.target.value,
                  }));
                }}
                ref={taxRef}
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="dark:text-white">Vizit günü</label>
              <Checkbox.Group
                options={inputData.visitDays}
                onChange={checkedChange}
                required
              />
            </div>
            <div className="flex gap-4">
              <div className="flex flex-col">
                <label className="dark:text-white">Endirim</label>
                <ReactSelect
                  placeholder="Seç"
                  options={inputData.discounts}
                  className="w-56"
                  onChange={(e) =>
                    setData((prevState) => ({
                      ...prevState,
                      discountCode: e.value,
                    }))
                  }
                  ref={discountRef}
                  required
                />
              </div>
              <div className="flex flex-col">
                <label className="dark:text-white">Təslimatçı</label>
                <ReactSelect
                  placeholder="Seç"
                  options={inputData.delivery}
                  className="w-56"
                  onChange={(e) =>
                    setData((prevState) => ({
                      ...prevState,
                      deliveryCode: e.value,
                    }))
                  }
                  ref={deliveryRef}
                  required
                />
              </div>
              <div className="flex flex-col">
                <label className="dark:text-white">Özəl kod 3</label>
                <ReactSelect
                  placeholder="Seç"
                  options={inputData.privateCode3}
                  className="w-56"
                  onChange={(e) =>
                    setData((prevState) => ({
                      ...prevState,
                      privateCode3: e.value,
                    }))
                  }
                  ref={privateCode3Ref}
                  required
                />
              </div>
              s
            </div>
            <div className="flex gap-4">
              <div className="flex flex-col">
                <label className="dark:text-white">Özəl kod 4</label>
                <ReactSelect
                  placeholder="Seç"
                  options={inputData.privateCode4}
                  className="w-56"
                  onChange={(e) =>
                    setData((prevState) => ({
                      ...prevState,
                      privateCode4: e.value,
                    }))
                  }
                  ref={privateCode4Ref}
                  required
                />
              </div>
              <div className="flex flex-col">
                <label className="dark:text-white">Özəl kod 5</label>
                <ReactSelect
                  placeholder="Seç"
                  options={inputData.privateCode5}
                  className="w-56"
                  onChange={(e) =>
                    setData((prevState) => ({
                      ...prevState,
                      privateCode5: e.value,
                    }))
                  }
                  ref={privateCode5Ref}
                  required
                />
              </div>
            </div>
          </div>
          <div>
            <button
              type="submit"
              className="w-full inline-flex justify-center rounded-md border border-transparent bg-blue-100 dark:bg-gray-500 dark:text-slate-300 dark:hover:bg-gray-700 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
            >
              Aktiv et
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}

export default UpdateClientModal;
