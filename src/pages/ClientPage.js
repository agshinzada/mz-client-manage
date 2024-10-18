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
    <div className="flex gap-2 justify-center">
      <div className="w-1/4 border p-4 h-fit">
        <p className="font-bold text-center mb-5">KOD</p>
        <CreateClientCodeForm />
      </div>
      <div className="border p-4 w-full">
        <p className="font-bold text-center mb-[3.2rem]">MÜŞTƏRİ MƏLUMATLARI</p>

        <div className="p-3 mb-6 border dark:text-slate-200 bg-white border-slate-200 rounded-lg min-w-[10rem] w-fit h-7 flex justify-center items-center">
          <Spin spinning={loading}>
            <span className="font-bold">{createdCode}</span>
          </Spin>
        </div>
        <Spin size="default" spinning={loading}>
          <ClientForm />
        </Spin>
      </div>
    </div>
  );
}

export default memo(ClientPage);
