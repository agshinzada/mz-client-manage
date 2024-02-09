import { Spin } from "antd";
import { memo } from "react";

import CreateClientCodeForm from "../components/form/client/CreateClientCodeForm";
import ClientForm from "../components/form/client/ClientForm";
import { useGlobal } from "../context/GlobalContext";
import { useClient } from "../context/ClientContext";

function ClientPage() {
  const { loading } = useGlobal();
  const { createdCode } = useClient();

  return (
    <>
      <CreateClientCodeForm />
      <div className="p-3 mb-6 border dark:text-slate-200 bg-white border-slate-200 dark:border-slate-600 dark:bg-gray-800 rounded-lg mx-auto w-[25rem] h-10 flex justify-center items-center">
        <Spin spinning={loading}>
          <span className="font-bold">{createdCode}</span>
        </Spin>
      </div>
      <Spin size="large" spinning={loading}>
        <ClientForm />
      </Spin>
    </>
  );
}

export default memo(ClientPage);
