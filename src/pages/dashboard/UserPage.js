import { useEffect, useRef, useState } from "react";
import {
  fetchChangePass,
  fetchChangeUserStatus,
  fetchPutUser,
  fetchUserBySearch,
  fetchUsers,
} from "../../services/authService";
import { ReloadOutlined, SearchOutlined } from "@ant-design/icons";
import { Button, Input, Modal, Popconfirm, Select, Table, Tooltip } from "antd";
import { toast } from "react-hot-toast";
import Swal from "sweetalert2";
import { useAdmin } from "../../context/AdminContext";
import NewUser from "../../components/dashboard/NewUser";
import { encryptStorage } from "../../utils/storage";
import { useNavigate } from "react-router-dom";

function UserPage() {
  const { adminAuth } = useAdmin();
  const navigate = useNavigate();

  const [users, setUsers] = useState([]);
  const [wait, setWait] = useState(true);
  const [searchValue, setSearchValue] = useState({});
  const [selected, setSelected] = useState({});
  const [isOpenAdd, setIsOpenAdd] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  var hash = require("hash.js");

  const logoCodeRef = useRef();
  const usernameRef = useRef();
  const roleRef = useRef();

  const columns = [
    {
      title: "ID",
      dataIndex: "ID",
      key: "ID",
    },
    {
      title: "Logo Ref",
      dataIndex: "REF",
      key: "REF",
    },
    {
      title: "Username",
      dataIndex: "USERNAME",
      key: "USERNAME",
    },
    {
      title: "Role",
      key: "ROLE",
      dataIndex: "ROLE",
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
        users ? (
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
            <Popconfirm
              title="Şifrə sıfırlansın?"
              onConfirm={() => resetPassword(record)}
            >
              <Button>Şifrəni sıfırla</Button>
            </Popconfirm>
          </div>
        ) : null,
    },
  ];

  async function getUsers() {
    try {
      const data = await fetchUsers();
      setUsers(data);
      setWait(false);
    } catch (error) {}
  }

  function clearModalInputs() {
    try {
      logoCodeRef.current.value = "";
      usernameRef.current.value = "";
      roleRef.current.value = "";
    } catch (error) {
      toast.error("Sistem xətası!");
      console.log(error);
    }
  }

  async function resetPassword(record) {
    try {
      const chars =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
      let result = "";
      for (let i = 0; i < 7; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
      }
      const hashPass = hash.sha256().update(result).digest("hex");
      const res = await fetchChangePass(record.ID, hashPass, adminAuth.TOKEN);
      if (res.status === 200 && res.statusText === "OK") {
        toast.success("Şifrə sıfırlandı!");
      }
      Swal.fire({
        title: "Yeni şifrə",
        text: result,
      });
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
            const res = await fetchPutUser(selected, adminAuth.TOKEN);
            if (res.status === 200 && res.statusText === "OK") {
              toast.success("Uğurla yeniləndi!");
              setIsOpen(false);
              getUsers();
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
      const res = await fetchChangeUserStatus(record, adminAuth.TOKEN);
      if (res.status === 200 && res.statusText === "OK") {
        toast.success("Uğurla yeniləndi!");
        getUsers();
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
      const data = await fetchUserBySearch(searchValue);
      setUsers(data);
    } catch (error) {
      toast.error("Sistem xətası!");
      console.log(error);
    }
  }
  useEffect(() => {
    getUsers();
  }, []);

  useEffect(() => {
    if (!isOpen && logoCodeRef.current) {
      clearModalInputs();
    }
  }, [isOpen]);

  return (
    <>
      <div className="flex mb-3 mt-5 justify-between items-end">
        <form className="flex gap-1" onSubmit={handleSearch}>
          <Input
            placeholder="İstifadəçi adı"
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
            onClick={getUsers}
          >
            <ReloadOutlined />
            Yenilə
          </button>

          <button
            type="button"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
            onClick={() => setIsOpenAdd(true)}
          >
            Yeni istifadəçi
          </button>
        </div>
      </div>

      <Table
        columns={columns}
        dataSource={users}
        loading={wait}
        rowKey={(record) => record.ID}
      />
      <NewUser isOpen={isOpenAdd} setIsOpen={setIsOpenAdd} />
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
                  Logo REF
                </label>
                <input
                  type="number"
                  id="code"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  onChange={(e) =>
                    setSelected((prevState) => ({
                      ...prevState,
                      REF: e.target.value === "" ? null : e.target.value,
                    }))
                  }
                  ref={logoCodeRef}
                />
              </div>
              <div className="w-full">
                <label
                  htmlFor="name"
                  className="block mb-2 text-sm  text-gray-900 dark:text-white"
                >
                  Username
                </label>
                <input
                  type="text"
                  id="name"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  onChange={(e) =>
                    setSelected((prevState) => ({
                      ...prevState,
                      USERNAME: e.target.value === "" ? null : e.target.value,
                    }))
                  }
                  ref={usernameRef}
                />
              </div>
              <div className="w-full">
                <label
                  htmlFor="name"
                  className="block mb-2 text-sm  text-gray-900 dark:text-white"
                >
                  Role
                </label>
                <select
                  id="countries"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  defaultValue={"DEFAULT"}
                  ref={roleRef}
                  onChange={(e) =>
                    setSelected((prevState) => ({
                      ...prevState,
                      ROLE: e.target.value === "" ? null : e.target.value,
                    }))
                  }
                >
                  <option value={"DEFAULT"} disabled>
                    Seç
                  </option>
                  <option value="ADMIN">ADMIN</option>
                  <option value="USER">USER</option>
                  <option value="MODERATOR">MODERATOR</option>
                </select>
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

export default UserPage;
