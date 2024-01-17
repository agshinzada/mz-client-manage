import { ReloadOutlined, SearchOutlined } from "@ant-design/icons";
import { Button, Input, Table, Tooltip } from "antd";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { fetchLogBySearch, fetchLogs } from "../../services/log";

function LogPage() {
  const [wait, setWait] = useState(true);
  const [logs, setLogs] = useState([]);
  const [searchValue, setSearchValue] = useState({});

  const columns = [
    {
      title: "ID",
      dataIndex: "ID",
      key: "ID",
    },
    {
      title: "User",
      dataIndex: "USERNAME",
      key: "USERNAME",
    },
    {
      title: "Code",
      dataIndex: "CODE",
      key: "CODE",
    },
    {
      title: "Old definition",
      dataIndex: "OLD_DEFINITION_",
      key: "OLD_DEFINITION_",
    },
    {
      title: "New definition",
      key: "NEW_DEFINITION_",
      dataIndex: "NEW_DEFINITION_",
    },
    {
      title: "Old tax",
      dataIndex: "OLD_TAXNR",
      key: "OLD_TAXNR",
    },
    {
      title: "New tax",
      dataIndex: "NEW_TAXNR",
      key: "NEW_TAXNR",
    },
    // {
    //   title: "Old visit",
    //   dataIndex: "OLD_VISIT",
    //   key: "OLD_VISIT",
    // },
    // {
    //   title: "New visit",
    //   dataIndex: "NEW_VISIT",
    //   key: "NEW_VISIT",
    // },
    // {
    //   title: "Old discount",
    //   dataIndex: "OLD_DISCOUNT",
    //   key: "OLD_DISCOUNT",
    // },
    // {
    //   title: "New discount",
    //   dataIndex: "NEW_DISCOUNT",
    //   key: "NEW_DISCOUNT",
    // },
    // {
    //   title: "Old delivery",
    //   dataIndex: "OLD_DELIVEY",
    //   key: "OLD_DELIVEY",
    // },
    // {
    //   title: "New delivery",
    //   dataIndex: "NEW_DELIVERY",
    //   key: "NEW_DELIVERY",
    // },
    // {
    //   title: "Old specode3",
    //   dataIndex: "OLD_SPECODE3",
    //   key: "OLD_SPECODE3",
    // },
    // {
    //   title: "New specode3",
    //   dataIndex: "NEW_SPECODE3",
    //   key: "NEW_SPECODE3",
    // },
    // {
    //   title: "Old specode4",
    //   dataIndex: "OLD_SPECODE4",
    //   key: "OLD_SPECODE4",
    // },
    // {
    //   title: "New specode4",
    //   dataIndex: "NEW_SPECODE4",
    //   key: "NEW_SPECODE4",
    // },
    // {
    //   title: "Old specode5",
    //   dataIndex: "OLD_SPECODE5",
    //   key: "OLD_SPECODE5",
    // },
    // {
    //   title: "New specode5",
    //   dataIndex: "NEW_SPECODE5",
    //   key: "NEW_SPECODE5",
    // },
    {
      title: "Date",
      dataIndex: "DATE",
      key: "DATE",
    },
  ];

  async function getLogs() {
    try {
      const data = await fetchLogs();
      data.map(
        (item) => (item.DATE = new Date(item.DATE).toLocaleString("az"))
      );
      setLogs(data);
      setWait(false);
    } catch (error) {
      toast.error("Sistem xətası!");
      console.log(error);
    }
  }
  async function handleSearch(e) {
    try {
      e.preventDefault();
      const data = await fetchLogBySearch(searchValue);
      data.map(
        (item) => (item.DATE = new Date(item.DATE).toLocaleString("az"))
      );
      setLogs(data);
    } catch (error) {
      toast.error("Sistem xətası!");
      console.log(error);
    }
  }

  useEffect(() => {
    getLogs();
  }, []);

  return (
    <>
      <div className="flex mb-3 mt-5 justify-between items-end">
        <form className="flex gap-1" onSubmit={handleSearch}>
          <Input
            placeholder="Code və ya New definition"
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
            onClick={getLogs}
          >
            <ReloadOutlined />
            Yenilə
          </button>
        </div>
      </div>

      <Table columns={columns} dataSource={logs} loading={wait} />
    </>
  );
}

export default LogPage;
