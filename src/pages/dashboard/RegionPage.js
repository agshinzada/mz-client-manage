import { ReloadOutlined, SearchOutlined } from "@ant-design/icons";
import { Button, Input, Modal, Popconfirm, Table, Tooltip } from "antd";
import { useEffect, useRef, useState } from "react";
import {
  fetchChangeRegionStatus,
  fetchPutRegion,
  fetchRegionBySearch,
  fetchRegions,
} from "../../services/regionService";
import { toast } from "react-hot-toast";
import Swal from "sweetalert2";
import NewRegion from "../../components/dashboard/NewRegion";
import { useAdmin } from "../../context/AdminContext";
import { encryptStorage } from "../../utils/storage";
import { useNavigate } from "react-router-dom";

function RegionPage() {
  const { adminAuth } = useAdmin();
  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState(false);
  const [isOpenAdd, setIsOpenAdd] = useState(false);
  const [regions, setRegions] = useState([]);
  const [wait, setWait] = useState(true);
  const [selected, setSelected] = useState({});
  const [searchValue, setSearchValue] = useState({});

  const nameRef = useRef();
  const rootIdRef = useRef();
  const codeIdRef = useRef();

  const columns = [
    {
      title: "ID",
      dataIndex: "ID",
      key: "ID",
    },
    {
      title: "Name",
      dataIndex: "NAME",
      key: "NAME",
    },
    {
      title: "ROOT_ID",
      dataIndex: "ROOT_ID",
      key: "ROOT_ID",
    },
    {
      title: "CODE_ID",
      key: "CODE_ID",
      dataIndex: "CODE_ID",
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
        regions.length >= 1 ? (
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

  async function getRegions() {
    try {
      const data = await fetchRegions();
      setRegions(data);
      setWait(false);
    } catch (error) {
      toast.error("Sistem xətası!");
      console.log(error);
    }
  }

  async function handleEdit() {
    try {
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
            const res = await fetchPutRegion(selected, adminAuth.TOKEN);
            if (res.status === 200 && res.statusText === "OK") {
              toast.success("Uğurla yeniləndi!");
              setIsOpen(false);
              getRegions();
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

  function clearModalInputs() {
    try {
      nameRef.current.value = "";
      rootIdRef.current.value = "";
      codeIdRef.current.value = "";
    } catch (error) {
      toast.error("Sistem xətası!");
      console.log(error);
    }
  }

  async function handleSearch(e) {
    try {
      e.preventDefault();
      const data = await fetchRegionBySearch(searchValue);
      setRegions(data);
    } catch (error) {
      toast.error("Sistem xətası!");
      console.log(error);
    }
  }

  async function handleStatus(record) {
    try {
      const res = await fetchChangeRegionStatus(record, adminAuth.TOKEN);
      if (res.status === 200 && res.statusText === "OK") {
        toast.success("Uğurla yeniləndi!");
        getRegions();
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

  useEffect(() => {
    getRegions();
  }, []);

  useEffect(() => {
    if (!isOpen && nameRef.current) {
      clearModalInputs();
    }
  }, [isOpen]);

  return (
    <>
      <div className="flex mb-3 mt-5 justify-between items-end">
        <form className="flex gap-1" onSubmit={handleSearch}>
          <Input
            placeholder="Region adı"
            className="w-48 h-fit"
            onChange={(e) => setSearchValue(e.target.value)}
          />
          <Tooltip>
            <Button
              type="primary"
              htmlType={"submit"}
              icon={<SearchOutlined />}
            />
          </Tooltip>
        </form>

        <div className="flex justify-between">
          <button
            type="button"
            className="flex items-center gap-2 focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
            onClick={getRegions}
          >
            <ReloadOutlined />
            Yenilə
          </button>

          <button
            type="button"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
            onClick={() => setIsOpenAdd(true)}
          >
            Yeni region
          </button>
        </div>
      </div>

      <Table columns={columns} dataSource={regions} loading={wait} />
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
            <div>
              <label
                htmlFor="name"
                className="block mb-2 text-sm  text-gray-900 dark:text-white"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                onChange={(e) =>
                  setSelected((prevState) => ({
                    ...prevState,
                    NAME: e.target.value === "" ? null : e.target.value,
                  }))
                }
                ref={nameRef}
              />
            </div>
            <div className="flex gap-2">
              <div className="w-full">
                <label
                  htmlFor="root"
                  className="block mb-2 text-sm  text-gray-900 dark:text-white"
                >
                  ROOT_ID
                </label>
                <input
                  type="number"
                  id="root"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  onChange={(e) =>
                    setSelected((prevState) => ({
                      ...prevState,
                      ROOT_ID: e.target.value === "" ? null : e.target.value,
                    }))
                  }
                  ref={rootIdRef}
                />
              </div>
              <div className="w-full">
                <label
                  htmlFor="code"
                  className="block mb-2 text-sm  text-gray-900 dark:text-white"
                >
                  CODE_ID
                </label>
                <input
                  type="number"
                  id="code"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  onChange={(e) =>
                    setSelected((prevState) => ({
                      ...prevState,
                      CODE_ID: e.target.value === "" ? null : e.target.value,
                    }))
                  }
                  ref={codeIdRef}
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
      <NewRegion isOpen={isOpenAdd} setIsOpen={setIsOpenAdd} />
    </>
  );
}

export default RegionPage;
