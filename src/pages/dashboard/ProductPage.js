import { Button, Select, Spin, Table, message } from "antd";
import TextArea from "antd/es/input/TextArea";
import { useEffect, useState } from "react";
import {
  fetchAddProducts,
  fetchDublicateProducts,
  fetchProductCategory,
  fetchProductMaxLineNo,
  fetchProducts,
  fetchRemoveProducts,
} from "../../services/productService";
import writeXlsxFile from "write-excel-file";
import { useAdmin } from "../../context/AdminContext";

function ProductPage() {
  const { adminAuth } = useAdmin();
  const [productCat, setProductCat] = useState([]);
  const [productCodes, setProductCodes] = useState([]);
  const [dublicateProducts, setDublicateProducts] = useState([]);
  const [dublicateTable, setDublicateTable] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [loading, setLoading] = useState(false);
  const [disabledInput, setDisabledInput] = useState(false);
  let disabled = !(productCodes.length > 0 && selectedCategory);

  const columns = [
    {
      title: "LOGICALREF",
      dataIndex: "LOGICALREF",
      key: "LOGICALREF",
    },
    {
      title: "ITEMCATEGORYREF",
      dataIndex: "ITEMCATEGORYREF",
      key: "ITEMCATEGORYREF",
    },
    {
      title: "ITEMREF",
      dataIndex: "ITEMREF",
      key: "ITEMREF",
    },
    {
      title: "CODE",
      dataIndex: "CODE",
      key: "CODE",
    },
    {
      title: "NAME",
      dataIndex: "NAME",
      key: "NAME",
    },
  ];

  const schema = [
    {
      column: "LOGICALREF",
      type: Number,
      value: (item) => item.LOGICALREF,
    },
    {
      column: "ITEMCATEGORYREF",
      type: Number,
      value: (item) => item.ITEMCATEGORYREF,
    },
    {
      column: "ITEMREF",
      type: Number,
      value: (item) => item.ITEMREF,
    },
    {
      column: "CODE",
      type: String,
      value: (item) => item.CODE,
    },
    {
      column: "NAME",
      type: String,
      value: (item) => item.NAME,
    },
  ];

  async function getItemCategory() {
    try {
      const data = await fetchProductCategory();
      setProductCat(data);
    } catch (error) {
      message.error("Sistem xətası!");
    }
  }

  async function handleRemove() {
    try {
      if (productCodes.length > 0 && selectedCategory) {
        setDisabledInput(true);
        setLoading(true);
        message.open({
          type: loading,
          content: "Məhsullar silinir...",
          duration: 2,
        });
        setTimeout(async () => {
          const productsRef = await getProducts(productCodes);
          if (productsRef.length > 0) {
            await fetchRemoveProducts({
              itemRef: productsRef,
              catRef: selectedCategory,
              token: adminAuth.TOKEN,
            });
          } else {
            message.warning("Məhsul kodları yanlışdır!");
          }

          setDisabledInput(false);
          setLoading(false);
        }, 2000);
      }
    } catch (error) {
      message.error("Sistem xətası!");
      console.log(error);
      setDisabledInput(false);
      setLoading(false);
    }
  }

  async function handleInsert() {
    try {
      if (productCodes.length > 0 && selectedCategory) {
        let productsRef, dublProductsRef;
        const { LINENO_: maxline } = await fetchProductMaxLineNo();

        setDisabledInput(true);
        setLoading(true);
        message.open({
          type: loading,
          content: "Məhsullar əlavə edilir...",
          duration: 2,
        });
        setTimeout(async () => {
          productsRef = await getProducts(productCodes);
          if (productsRef.length > 0) {
            dublProductsRef = await getDublProducts({
              ref: productsRef,
              catRef: selectedCategory,
            });

            const filteredProducts = productsRef.filter(
              (item) => !dublProductsRef.includes(item)
            );

            if (filteredProducts.length > 0) {
              await fetchAddProducts({
                itemRef: filteredProducts,
                catRef: selectedCategory,
                maxline: maxline + 1,
                token: adminAuth.TOKEN,
              });
            } else {
              message.warning("Məhsullar sistemdə mövcuddur!");
            }
          } else {
            message.warning("Məhsul kodları yanlışdır!");
          }

          setDisabledInput(false);
          setLoading(false);
        }, 2000);
      }
    } catch (error) {
      message.error("Sistem xətası!");
      console.log(error);
      setDisabledInput(false);
      setLoading(false);
    }
  }

  async function getProducts(data) {
    try {
      const products = await fetchProducts(data);
      let arr = [];
      products.map((item) => arr.push(item.LOGICALREF));
      return arr;
    } catch (error) {
      message.error("Sistem xətası!");
    }
  }
  async function getDublProducts(data) {
    try {
      const products = await fetchDublicateProducts(data);
      setDublicateTable(products);
      let arr = [];
      products.map((item) => arr.push(item.ITEMREF));
      return arr;
    } catch (error) {
      message.error("Sistem xətası!");
    }
  }

  const handleTextbox = (e) => {
    try {
      const uniqueArray = [...new Set(e.target.value.split("\n"))];
      const nonBlankLines = uniqueArray.filter((line) => line.trim() !== "");
      setProductCodes(nonBlankLines);
    } catch (error) {
      message.error(error);
    }
  };

  async function convertToExcel() {
    try {
      if (dublicateTable.length > 0) {
        await writeXlsxFile(dublicateTable, {
          schema,
          filePath: "/export/exportData.xlsx",
          fileName: "exportData.xlsx",
        });
      } else {
        message.error("Məlumat tapılmadı!");
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getItemCategory();
  }, []);

  return (
    <div>
      <div className="p-4 bg-white w-full flex flex-col gap-3">
        <div className="flex flex-col gap-2 relative">
          <Spin
            className="absolute left-0 right-0 z-10 top-[150px]"
            size="large"
            spinning={loading}
          />
          <div className=" flex flex-col gap-2">
            <label>Məhsul kodları</label>
            <TextArea
              rows={10}
              onChange={handleTextbox}
              disabled={disabledInput}
            />
          </div>
          <div className="flex flex-col w-full gap-1">
            <label>Məhsul kateqoriyası</label>
            <Select
              showSearch
              labelInValue
              placeholder="Seç"
              optionFilterProp="children"
              onChange={(e) => setSelectedCategory(e.value)}
              disabled={disabledInput}
            >
              {productCat.map((cat) => (
                <Select.Option key={cat.LOGICALREF} value={cat.LOGICALREF}>
                  {cat.NAME}
                </Select.Option>
              ))}
            </Select>
          </div>
        </div>

        <hr className="my-2" />
        <div className="flex gap-4 justify-end">
          <Button
            danger
            onClick={handleRemove}
            disabled={disabled}
            // loading={loading}
          >
            Məhsulları sil
          </Button>
          <Button
            disabled={disabled}
            // loading={loadingCreate}
            onClick={handleInsert}
          >
            Sistemə yüklə
          </Button>
        </div>
      </div>
      <div className="w-full min-h-screen bg-white mt-4 p-4">
        <div>
          <div className="flex justify-between">
            <label>Təkrarlanan məhsullar</label>
            <Button
              // loading={loadingCreate}
              onClick={convertToExcel}
            >
              Excel export
            </Button>
          </div>

          <Table
            columns={columns}
            dataSource={dublicateTable}
            loading={loading}
          />
        </div>
      </div>
    </div>
  );
}

export default ProductPage;
