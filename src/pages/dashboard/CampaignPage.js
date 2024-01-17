import { useEffect, useRef, useState } from "react";
import {
  fetchCampaignBySearch,
  fetchCampaigns,
  fetchChangeCampaignStatus,
  fetchPutCampaign,
} from "../../services/discountService";
import { ReloadOutlined, SearchOutlined } from "@ant-design/icons";
import { Button, Input, Modal, Popconfirm, Table, Tabs, Tooltip } from "antd";
import NewCampaign from "../../components/dashboard/NewCampaign";
import { toast } from "react-hot-toast";
import Swal from "sweetalert2";
import { useAdmin } from "../../context/AdminContext";
import { encryptStorage } from "../../utils/storage";
import { useNavigate } from "react-router-dom";

function CampaignPage() {
  const { adminAuth } = useAdmin();
  const navigate = useNavigate();

  const [campaign, setCampaign] = useState([]);
  const [wait, setWait] = useState(true);
  const [isOpenAdd, setIsOpenAdd] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const [tabKey, setTabKey] = useState(3);
  const [stateKey, setStateKey] = useState("privateCode3");

  const [searchValue, setSearchValue] = useState({});
  const [selected, setSelected] = useState({});

  const codeRef = useRef();
  const valueRef = useRef();
  const explRef = useRef();

  const columns = [
    {
      title: "ID",
      dataIndex: "ID",
      key: "ID",
    },
    {
      title: "Code",
      dataIndex: "label",
      key: "label",
    },
    {
      title: "Value",
      dataIndex: "value",
      key: "value",
    },
    {
      title: "Explanation",
      key: "EXPLANATION",
      dataIndex: "EXPLANATION",
    },
    {
      title: "Status",
      dataIndex: "STATUS",
      key: "STATUS",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) =>
        campaign ? (
          <div className="flex gap-2">
            <Popconfirm
              title="Düzəliş edilsin?"
              style={{}}
              onConfirm={() => {
                setSelected(record);
                setIsOpen(true);
              }}
            >
              <Button>Düzəliş</Button>
            </Popconfirm>
            <Popconfirm
              title="Statusu dəyişilsin?"
              onConfirm={() => handleStatus(record)}
            >
              <Button danger>
                {record.STATUS === 0 ? "Deaktiv" : "Aktiv"}
              </Button>
            </Popconfirm>
          </div>
        ) : null,
    },
  ];

  async function getCampaigns(param, state) {
    try {
      const data = await fetchCampaigns(param);
      setCampaign((prevState) => ({
        ...prevState,
        [state]: data,
      }));
      setWait(false);
    } catch (error) {}
  }

  function clearModalInputs() {
    try {
      codeRef.current.value = "";
      valueRef.current.value = "";
      explRef.current.value = "";
      setSelected({});
    } catch (error) {
      toast.error("Sistem xətası!");
      console.log(error);
    }
  }

  async function handleEdit() {
    try {
      console.log(selected);
      const allNull = Object.values(selected).some((value) => value === null);
      if (allNull) {
        toast.error("Xanaları doldurun!");
      } else {
        Swal.fire({
          title: "Dəyişiklik edilsin?",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Bəli",
          cancelButtonText: "İmtina",
        }).then(async (result) => {
          if (result.isConfirmed) {
            const res = await fetchPutCampaign(
              selected,
              tabKey,
              adminAuth.TOKEN
            );
            if (res.status === 200 && res.statusText === "OK") {
              toast.success("Uğurla yeniləndi!");
              setIsOpen(false);
              getCampaigns(tabKey, stateKey);
            } else if (res.status === 401) {
              toast.dismiss();
              toast.error("Token expired!");
              setTimeout(() => {
                encryptStorage.removeItem("adminAuth");
                navigate("/");
              }, 1000);
            }
          }
        });
      }
    } catch (error) {
      toast.error("Sistem xətası!");
      console.log(error);
    }
  }

  async function handleStatus(record) {
    try {
      const res = await fetchChangeCampaignStatus(
        tabKey,
        record,
        adminAuth.TOKEN
      );
      if (res.status === 200 && res.statusText === "OK") {
        toast.success("Uğurla yeniləndi!");
        getCampaigns(tabKey, stateKey);
      } else if (res.status === 401) {
        toast.dismiss();
        toast.error("Token expired!");
        setTimeout(() => {
          encryptStorage.removeItem("adminAuth");
          navigate("/");
        }, 1000);
      }
    } catch (error) {
      toast.error("Sistem xətası!");
      console.log(error);
    }
  }

  async function handleSearch(e) {
    try {
      e.preventDefault();
      const data = await fetchCampaignBySearch(searchValue, tabKey);
      setCampaign((prevState) => ({
        ...prevState,
        [stateKey]: data,
      }));
    } catch (error) {
      toast.error("Sistem xətası!");
      console.log(error);
    }
  }
  useEffect(() => {
    getCampaigns(3, "privateCode3");
    getCampaigns(4, "privateCode4");
    getCampaigns(5, "privateCode5");
  }, []);

  useEffect(() => {
    if (!isOpen && codeRef.current) {
      clearModalInputs();
    }
  }, [isOpen]);

  return (
    <>
      <Tabs
        defaultActiveKey="1"
        centered
        onChange={(e) => {
          setTabKey(e);
          setStateKey(`privateCode${e}`);
        }}
        items={new Array(3).fill(null).map((_, i) => {
          const id = String(i + 3);
          const data = "privateCode" + id;
          return {
            label: `Özəl kod ${id}`,
            key: id,
            children: (
              <div key={id}>
                <div className="flex justify-between">
                  <form className="flex gap-1 mb-3" onSubmit={handleSearch}>
                    <Input
                      placeholder="Code və ya value"
                      className="w-48 h-fit"
                      onChange={(e) => setSearchValue(e.target.value)}
                    />
                    <Tooltip>
                      <Button
                        type="primary"
                        htmlType="submit"
                        icon={<SearchOutlined />}
                      />
                    </Tooltip>
                  </form>
                  <div className="flex">
                    <button
                      type="button"
                      className="flex items-center gap-2 focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                      onClick={() => getCampaigns(tabKey, stateKey)}
                    >
                      <ReloadOutlined />
                      Yenilə
                    </button>

                    <button
                      type="button"
                      className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                      onClick={() => setIsOpenAdd(true)}
                    >
                      Yeni kampaniya
                    </button>
                  </div>
                </div>

                <Table
                  columns={columns}
                  key={id}
                  dataSource={campaign[data]}
                  loading={wait}
                />
              </div>
            ),
          };
        })}
      />
      <NewCampaign isOpen={isOpenAdd} setIsOpen={setIsOpenAdd} />
      <Modal
        open={isOpen}
        onCancel={() => {
          setIsOpen(false);
        }}
        centered
        maskClosable={false}
        footer={false}
        title={"Düzəliş"}
      >
        <div className="flex flex-col gap-2 mt-5">
          <div className="flex flex-col gap-3">
            <div className="flex gap-2">
              <div className="w-full">
                <label
                  htmlFor="code"
                  className="block mb-2 text-sm  text-gray-900 dark:text-white"
                >
                  Code
                </label>
                <input
                  type="text"
                  id="code"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  onChange={(e) =>
                    setSelected((prevState) => ({
                      ...prevState,
                      label:
                        e.target.value === ""
                          ? null
                          : e.target.value.toUpperCase(),
                    }))
                  }
                  ref={codeRef}
                />
              </div>
              <div className="w-full">
                <label
                  htmlFor="value"
                  className="block mb-2 text-sm  text-gray-900 dark:text-white"
                >
                  Value
                </label>
                <input
                  type="text"
                  id="value"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  onChange={(e) =>
                    setSelected((prevState) => ({
                      ...prevState,
                      value:
                        e.target.value === ""
                          ? null
                          : e.target.value.toUpperCase(),
                    }))
                  }
                  ref={valueRef}
                />
              </div>
              <div className="w-full">
                <label
                  htmlFor="explanation"
                  className="block mb-2 text-sm  text-gray-900 dark:text-white"
                >
                  Explanation
                </label>
                <input
                  type="text"
                  id="explanation"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  onChange={(e) =>
                    setSelected((prevState) => ({
                      ...prevState,
                      EXPLANATION:
                        e.target.value === ""
                          ? null
                          : e.target.value.toUpperCase(),
                    }))
                  }
                  ref={explRef}
                />
              </div>
            </div>
          </div>
          <div className="mt-5">
            <button
              type="button"
              className="w-full inline-flex justify-center rounded-md border border-transparent bg-blue-100 dark:bg-gray-500 dark:text-slate-300 dark:hover:bg-gray-700 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
              onClick={handleEdit}
            >
              Göndər
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
}

export default CampaignPage;
