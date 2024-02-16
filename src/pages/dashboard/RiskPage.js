import { Button, Form, Spin, Switch, Table, notification } from "antd";
import TextArea from "antd/es/input/TextArea";
import { useState } from "react";
import {
  fetchCheckExistRefs,
  fetchClientRefs,
} from "../../services/toolService";
import {
  fetchInsertClientLimit,
  fetchUpdateClientDayLimit,
  fetchUpdateClientGeneralLimit,
  fetchUpdateClientMinLimit,
} from "../../services/clientService";
import { useAdmin } from "../../context/AdminContext";

function RiskPage() {
  const { adminAuth } = useAdmin();
  const [form] = Form.useForm();
  const [form2] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [tableData, setTableData] = useState(false);

  const [disabled, setDisabled] = useState(true);
  const [generalLimitdisabled, setGeneralLimitdisabled] = useState(true);
  const [minLimitDisabled, setMinlimitDisabled] = useState(true);
  const [dayLimitDisabled, setDayLimitDisabled] = useState(true);

  const submitCodes = async () => {
    setLoading(true);
    const codes = form2.getFieldValue("codes").trim().split("\n");
    const refs = await fetchClientRefs(codes);
    setTimeout(() => {
      setTableData(refs);
      setDisabled(false);
      setLoading(false);
    }, 700);
  };

  const submitRisk = async () => {
    try {
      setLoading(true);
      let arr = [],
        updateData = [],
        insertData = [],
        generalLimit,
        minLimit,
        dayLimit;

      if (!generalLimitdisabled && form.getFieldValue("generalLimit")) {
        generalLimit = form.getFieldValue("generalLimit").trim().split("\n");
      }
      if (!minLimitDisabled && form.getFieldValue("minLimit")) {
        minLimit = form.getFieldValue("minLimit").trim().split("\n");
      }
      if (!dayLimitDisabled && form.getFieldValue("dayLimit")) {
        dayLimit = form.getFieldValue("dayLimit").trim().split("\n");
      }

      for (let index = 0; index < tableData.length; index++) {
        arr.push({
          ref: tableData[index].LOGICALREF,
          generalLimit: !generalLimitdisabled ? generalLimit[index] : false,
          minLimit: !minLimitDisabled ? minLimit[index] : false,
          dayLimit: !dayLimitDisabled ? dayLimit[index] : false,
        });
      }
      const refs = arr.map((item) => item.ref);
      const existRefs = await fetchCheckExistRefs(refs);
      updateData = arr.filter((item) =>
        existRefs.some((ex) => ex.ref === item.ref)
      );
      insertData = arr.filter((item) =>
        existRefs.every((ex) => ex.ref !== item.ref)
      );

      console.group("Main");
      console.log(arr);
      console.groupEnd();

      console.group("Exist");
      console.log(existRefs);
      console.groupEnd();

      console.group("Update");
      console.log(updateData);
      console.groupEnd();

      console.group("Insert");
      console.log(insertData);
      console.groupEnd();

      let res;
      if (updateData.length > 0) {
        if (!generalLimitdisabled) {
          res = await fetchUpdateClientGeneralLimit(
            updateData,
            adminAuth.TOKEN
          );
        }
        if (!minLimitDisabled) {
          res = await fetchUpdateClientMinLimit(updateData, adminAuth.TOKEN);
        }
        if (!dayLimitDisabled) {
          res = await fetchUpdateClientDayLimit(updateData, adminAuth.TOKEN);
        }
      }
      if (insertData.length > 0) {
        res = await fetchInsertClientLimit(insertData, adminAuth.TOKEN);
      }

      if (res) {
        notification.success({
          message: "Bildiriş",
          description: "Sistemə uğurla əlavə edildi!",
          placement: "topRight",
        });
        form.resetFields();
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  return (
    <div>
      <div className="p-4 bg-white w-full flex flex-col gap-3">
        <div className="flex gap-5 w-full">
          <Form
            form={form2}
            layout="vertical"
            onFinish={submitCodes}
            className="w-full"
          >
            <Form.Item
              label="Müştəri kodları"
              className="w-full"
              name={"codes"}
              rules={[{ required: true, message: "Xananı doldurun" }]}
            >
              <TextArea
                rows={15}
                onChange={() => {
                  setDisabled(true);
                }}
              />
            </Form.Item>
            <Button type="primary" htmlType="submit" className="float-right">
              Göndər
            </Button>
          </Form>
          <Table
            dataSource={tableData}
            columns={[
              {
                title: "LOGICALREF",
                dataIndex: "LOGICALREF",
                key: "LOGICALREF",
              },
              {
                title: "CODE",
                dataIndex: "CODE",
                key: "CODE",
              },
              {
                title: "NAME",
                dataIndex: "DEFINITION_",
                key: "DEFINITION_",
              },
            ]}
            loading={loading}
            rowKey={(record) => record.LOGICALREF}
            className="w-full"
            pagination={{ pageSize: 6 }}
          />
        </div>

        <Form form={form} layout="vertical" onFinish={submitRisk}>
          <div className="flex gap-6">
            <div className="w-full">
              <Switch
                className="bg-slate-300 mb-2"
                disabled={disabled}
                onChange={(e) => {
                  if (!e) {
                    form.resetFields();
                  }
                  setGeneralLimitdisabled(!e);
                }}
              />
              <Form.Item
                label="Ümumi limit"
                className="w-full"
                name={"generalLimit"}
              >
                <Spin spinning={loading}>
                  <TextArea rows={15} disabled={generalLimitdisabled} />
                </Spin>
              </Form.Item>
            </div>
            <div className="w-full">
              <Switch
                className="bg-slate-300 mb-2"
                disabled={disabled}
                onChange={(e) => {
                  if (!e) {
                    form.resetFields(["minLimit"]);
                  }
                  setMinlimitDisabled(!e);
                }}
              />
              <Form.Item
                label="Minimum sənəd limiti"
                className="w-full"
                name={"minLimit"}
              >
                <Spin spinning={loading}>
                  <TextArea rows={15} disabled={minLimitDisabled} />
                </Spin>
              </Form.Item>
            </div>
            <div className="w-full">
              <Switch
                className="bg-slate-300 mb-2"
                disabled={disabled}
                onChange={(e) => {
                  if (e) {
                    form.resetFields(["dayLimit"]);
                  }
                  setDayLimitDisabled(!e);
                }}
              />
              <Form.Item
                label="Günlük limit"
                className="w-full"
                name={"dayLimit"}
              >
                <Spin spinning={loading}>
                  <TextArea rows={15} disabled={dayLimitDisabled} />
                </Spin>
              </Form.Item>
            </div>
          </div>

          <Button
            type="primary"
            htmlType="submit"
            className="mx-auto w-36"
            disabled={
              generalLimitdisabled && minLimitDisabled && dayLimitDisabled
            }
            loading={loading}
          >
            Yüklə
          </Button>
        </Form>
      </div>
    </div>
  );
}

export default RiskPage;
