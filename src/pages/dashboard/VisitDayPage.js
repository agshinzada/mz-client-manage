import { ReloadOutlined, SearchOutlined } from "@ant-design/icons";
import { Button, Input, Modal, Popconfirm, Table, Tooltip } from "antd";
import { useEffect, useRef, useState } from "react";
import {
  fetchChangeVisitStatus,
  fetchPutVisitDay,
  fetchVisitDayBySearch,
  fetchVisitDays,
} from "../../services/visitService";
import { toast } from "react-hot-toast";
import Swal from "sweetalert2";
import { useAdmin } from "../../context/AdminContext";
import { encryptStorage } from "../../utils/storage";
import { useNavigate } from "react-router-dom";

function VisitDayPage() {
  const { adminAuth } = useAdmin();
  const navigate = useNavigate();

  const [visits, setVisits] = useState([]);
  const [wait, setWait] = useState(true);
  const [searchValue, setSearchValue] = useState({});
  const [selected, setSelected] = useState({});
  const [isOpen, setIsOpen] = useState(false);

  const codeRef = useRef();
  const nameRef = useRef();

  const columns = [
    {
      title: "ID",
      dataIndex: "ID",
      key: "ID",
    },
    {
      title: "Code",
      dataIndex: "value",
      key: "value",
    },
    {
      title: "Name",
      dataIndex: "label",
      key: "label",
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
        visits ? (
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

  async function getVisits() {
    try {
      const data = await fetchVisitDays();
      setVisits(data);
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
            const res = await fetchPutVisitDay(selected, adminAuth.TOKEN);
            if (res.status === 200 && res.statusText === "OK") {
              toast.success("Uğurla yeniləndi!");
              setIsOpen(false);
              getVisits();
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
      codeRef.current.value = "";
      setSelected({});
    } catch (error) {
      toast.error("Sistem xətası!");
      console.log(error);
    }
  }

  async function handleStatus(record) {
    try {
      const res = await fetchChangeVisitStatus(record, adminAuth.TOKEN);
      if (res.status === 200 && res.statusText === "OK") {
        toast.success("Uğurla yeniləndi!");
        getVisits();
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
      const data = await fetchVisitDayBySearch(searchValue);
      setVisits(data);
    } catch (error) {
      toast.error("Sistem xətası!");
      console.log(error);
    }
  }
  useEffect(() => {
    getVisits();
  }, []);

  useEffect(() => {
    if (!isOpen && codeRef.current) {
      clearModalInputs();
    }
  }, [isOpen]);

  return (
    <>
      <div className="flex mb-3 mt-5 justify-between items-end">
        <form className="flex gap-1" onSubmit={handleSearch}>
          <Input
            placeholder="Vizit adı"
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

        <div className="flex justify-between">
          <button
            type="button"
            className="flex items-center gap-2 focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
            onClick={getVisits}
          >
            <ReloadOutlined />
            Yenilə
          </button>
        </div>
      </div>

      <Table columns={columns} dataSource={visits} loading={wait} />
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
                      value: e.target.value === "" ? null : e.target.value,
                    }))
                  }
                  ref={codeRef}
                />
              </div>
              <div className="w-full">
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
                      label: e.target.value === "" ? null : e.target.value,
                    }))
                  }
                  ref={nameRef}
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

export default VisitDayPage;
