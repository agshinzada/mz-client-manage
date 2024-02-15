import { useAdmin } from "../../context/AdminContext";
import { DownloadOutlined } from "@ant-design/icons";
import { Button, Modal, Select, Table, message } from "antd";
import { useEffect, useState } from "react";
import { fetchBrands } from "../../services/brandService";
import { Option } from "antd/es/mentions";
import {
  fetchCheckBulkClientCodes,
  fetchCreateClientCodesBulk,
  fetchPostBulkClients,
} from "../../services/clientService";
import writeXlsxFile from "write-excel-file";
import TextArea from "antd/es/input/TextArea";
import { fetchRoutes } from "../../services/rootService";
import ErrorModal from "../../components/modals/ErrorModal";

function BulkClient() {
  const { adminAuth } = useAdmin();

  const [stickers, setStickers] = useState([]);
  const [brands, setBrands] = useState([]);
  const [routes, setRoutes] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [checkedCodes, setCheckedCodes] = useState([]);

  const [brandCode, setBrandCode] = useState(null);
  const [brandName, setBrandName] = useState(null);
  const [brandId, setBrandId] = useState(null);
  const [routeCode, setRouteCode] = useState(null);

  const [createDisabled, setCreateDisabled] = useState(true);
  const [loadingCreate, setLoadingCreate] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const [checkModalIsOpen, setCheckModalIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  // ERROR MODAL
  const [errorIsOpen, setErrorIsOpen] = useState(false);
  const [errorData, setErrorData] = useState(null);

  const columns = [
    {
      title: "Route",
      dataIndex: "ROUTE",
      key: "ROUTE",
    },
    {
      title: "Sticker",
      dataIndex: "STICKER",
      key: "STICKER",
    },
    {
      title: "Kod",
      dataIndex: "CODE",
      key: "CODE",
    },
    {
      title: "Ad",
      dataIndex: "NAME",
      key: "NAME",
    },
  ];

  const schema = [
    {
      column: "Route",
      type: String,
      value: (item) => item.ROUTE,
    },
    {
      column: "Sticker",
      type: String,
      value: (item) => item.STICKER,
    },
    {
      column: "Kod",
      type: String,
      value: (item) => item.CODE,
    },
    {
      column: "Ad",
      type: String,
      value: (item) => item.NAME,
    },
  ];

  async function getBrands() {
    try {
      const data = await fetchBrands();
      setBrands(data);
    } catch (error) {
      message.error("Sistem xətası!");
    }
  }

  async function getRoutes() {
    try {
      const data = await fetchRoutes();
      setRoutes(data);
    } catch (error) {
      message.error("Sistem xətası!");
    }
  }

  async function convertToExcel() {
    try {
      if (tableData.length > 0) {
        await writeXlsxFile(tableData, {
          schema,
          filePath: "/export/exportData.xlsx",
          fileName: `${routeCode}-${brandName}.xlsx`,
        });
      } else {
        message.error("Məlumat tapılmadı!");
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function handleStickers(e) {
    try {
      const uniqueArray = [...new Set(e.target.value.split("\n"))];
      const nonBlankLines = uniqueArray.filter((line) => line.trim() !== "");
      setStickers(nonBlankLines);
    } catch (error) {
      console.log(error);
    }
  }

  async function convertToExcelChecked() {
    try {
      if (checkedCodes.length > 0) {
        await writeXlsxFile(checkedCodes, {
          schema,
          filePath: "/export/exportDataChecked.xlsx",
          fileName: `DUPL-${routeCode}-${brandName}.xlsx`,
        });
      } else {
        message.error("Məlumat tapılmadı!");
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function removeChecked() {
    try {
      if (checkedCodes.length > 0) {
        const filter = tableData.filter((item) => {
          return !checkedCodes.some(
            (secondItem) => secondItem.CODE === item.CODE
          );
        });
        setTableData(filter);
        setCheckModalIsOpen(false);
      } else {
        setCheckModalIsOpen(false);
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function createCodes() {
    try {
      setLoading(true);
      setCreateDisabled(true);
      const data = await fetchCreateClientCodesBulk({
        token: adminAuth.TOKEN,
        brandCode,
        brandId,
        routeCode,
        stickers,
      });
      setTableData(data);
      setLoading(false);
    } catch (error) {
      message.error("Sistem xətası!");
    }
  }

  async function checkClientCodes() {
    try {
      setLoading(true);
      const codes = [];
      for (const iterator of tableData) {
        codes.push(iterator.CODE);
      }
      const data = await fetchCheckBulkClientCodes({
        token: adminAuth.TOKEN,
        codes,
      });
      if (data.length === 0) {
        setCreateDisabled(false);
        setLoading(false);
        message.success("Təkrarlanan kod tapılmadı!");
      } else {
        setCreateDisabled(true);
        setCheckedCodes(data);
        setCheckModalIsOpen(true);
        setLoading(false);
      }
    } catch (error) {
      message.error("Sistem xətası!");
    }
  }

  async function postClients() {
    try {
      setLoadingCreate(true);
      const res = await fetchPostBulkClients({
        data: tableData,
        userRef: adminAuth.REF,
        token: adminAuth.TOKEN,
      });
      if (res) {
        setLoadingCreate(false);
        setCreateDisabled(true);
      }
    } catch (error) {
      setLoadingCreate(false);
      setCreateDisabled(true);
    }
  }

  useEffect(() => {
    getBrands();
    getRoutes();
  }, []);

  return (
    <div>
      <div className="p-4 bg-white w-full flex flex-col gap-3">
        <div className="flex flex-col gap-2">
          <div className=" flex flex-col gap-2">
            <label>Stiker kodları</label>
            <TextArea rows={10} onChange={handleStickers} />
          </div>
        </div>

        <hr className="my-2" />
        <div className="flex gap-4">
          <div className="flex flex-col w-full gap-1">
            <label>Brendlər</label>
            <Select
              showSearch
              labelInValue
              placeholder="Brendi seç"
              optionFilterProp="children"
              onChange={(e) => {
                setBrandId(brands.find((item) => item.NAME === e.label).NR);
                setBrandCode(e.value);
                setBrandName(e.label);
              }}
            >
              {brands.map((option) => (
                <Option key={option.ID} value={option.TYPE + option.CODE}>
                  {option.NAME}
                </Option>
              ))}
            </Select>
          </div>
          <div className="flex flex-col w-full gap-1">
            <label>Rutlar</label>
            <Select
              showSearch
              labelInValue
              placeholder="Rutu seç"
              optionFilterProp="children"
              onChange={(e) => setRouteCode(e.value)}
            >
              {routes.map((option) => (
                <Option key={option.value} value={option.value}>
                  {option.label}
                </Option>
              ))}
            </Select>
          </div>
        </div>

        <Button
          type="primary"
          disabled={
            routeCode && brandCode && stickers?.length > 0 ? false : true
          }
          onClick={createCodes}
          loading={loading}
        >
          Yarat
        </Button>
      </div>
      <div className="w-full min-h-screen bg-white mt-4 p-4">
        <div>
          <div className="flex justify-between">
            <label>Müştəri kodları</label>
            <Button
              type="primary"
              icon={<DownloadOutlined />}
              className="w-fit"
              onClick={convertToExcel}
            >
              Excel yüklə
            </Button>
          </div>
          <Table
            dataSource={tableData}
            columns={columns}
            loading={loading}
            rowKey={(record) => record.LOGICALREF}
          />
        </div>
        <div className="flex gap-2 justify-center mt-4">
          <Button
            danger
            onClick={checkClientCodes}
            disabled={tableData?.length > 0 ? false : true}
            loading={loading}
          >
            Kodları yoxla
          </Button>
          <Button
            disabled={createDisabled}
            loading={loadingCreate}
            onClick={postClients}
          >
            Sistemə yüklə
          </Button>
        </div>
      </div>
      <Modal
        title="Stiker siyahısı"
        centered
        open={modalIsOpen}
        onCancel={() => setModalIsOpen(false)}
        footer={[
          <Button
            key="submit"
            type="primary"
            className="w-full"
            onClick={() => setModalIsOpen(false)}
          >
            OK
          </Button>,
        ]}
      >
        <div className="grid grid-cols-5 gap-3 my-4">
          {stickers && stickers.map((item) => <p key={item}>{item}</p>)}
        </div>
      </Modal>
      <Modal
        title="Təkrarlanan kodlar"
        centered
        open={checkModalIsOpen}
        onCancel={() => setCheckModalIsOpen(false)}
        footer={[
          <Button
            key="submit"
            type="primary"
            className="w-full"
            onClick={() => removeChecked()}
          >
            Əsas siyahıdan sil
          </Button>,
        ]}
      >
        <div className="flex flex-col">
          <div className="grid grid-cols-2 gap-3 my-4">
            {checkedCodes &&
              checkedCodes.map((item) => (
                <p key={item.CODE}>
                  {item.CODE} - <strong>{item.STICKER}</strong>
                </p>
              ))}
          </div>
          <Button
            type="primary"
            icon={<DownloadOutlined />}
            className="w-fit self-end"
            onClick={convertToExcelChecked}
          >
            Excel yüklə
          </Button>
        </div>
      </Modal>
      <ErrorModal
        isOpen={errorIsOpen}
        setIsOpen={setErrorIsOpen}
        data={errorData}
      />
    </div>
  );
}

export default BulkClient;
